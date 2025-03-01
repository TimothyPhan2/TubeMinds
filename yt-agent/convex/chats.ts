import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createChat = mutation({
  args: {
    userId: v.string(),
    videoId: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if a chat already exists for this user and video
    const existingChats = await ctx.db
      .query("chats")
      .withIndex("by_user_and_video", (q) => 
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .collect();
    
    // If a chat already exists, return its ID instead of creating a new one
    if (existingChats.length > 0) {
      return existingChats[0]._id;
    }
    
    // Otherwise, create a new chat
    const timestamp = Date.now();
    return await ctx.db.insert("chats", {
      userId: args.userId,
      videoId: args.videoId,
      title: args.title,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const saveMessage = mutation({
  args: {
    chatId: v.id("chats"),
    role: v.string(),
    content: v.string(),
    toolName: v.optional(v.string()),
    toolInput: v.optional(v.any()),
    toolOutput: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Update the chat's updatedAt timestamp
    await ctx.db.patch(args.chatId, {
      updatedAt: Date.now(),
    });
    
    // Save the message
    return await ctx.db.insert("chatMessages", {
      chatId: args.chatId,
      role: args.role,
      content: args.content,
      timestamp: Date.now(),
      toolName: args.toolName,
      toolInput: args.toolInput,
      toolOutput: args.toolOutput,
    });
  },
});

export const getRecentChats = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    return await ctx.db
      .query("chats")
      .withIndex("by_recent", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});

export const getChatMessages = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatMessages")
      .withIndex("by_chat_and_timestamp", (q) => q.eq("chatId", args.chatId))
      .order("asc")
      .collect();
  },
});

export const getChatById = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});

export const getChatByVideoId = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .withIndex("by_user_and_video", (q) => 
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .order("desc")
      .take(1);
    
    return chats[0] || null;
  },
});

export const cleanupDuplicateChats = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get all chats for this user
    const allChats = await ctx.db
      .query("chats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Group chats by videoId
    const chatsByVideoId = new Map();
    for (const chat of allChats) {
      if (!chatsByVideoId.has(chat.videoId)) {
        chatsByVideoId.set(chat.videoId, []);
      }
      chatsByVideoId.get(chat.videoId).push(chat);
    }
    
    // For each videoId with multiple chats, keep only the most recent one
    let deletedCount = 0;
    for (const [videoId, chats] of chatsByVideoId.entries()) {
      if (chats.length > 1) {
        // Sort by updatedAt (most recent first)
        chats.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
        
        // Keep the first one, delete the rest
        for (let i = 1; i < chats.length; i++) {
          // Delete all messages for this chat
          const messages = await ctx.db
            .query("chatMessages")
            .withIndex("by_chat", (q) => q.eq("chatId", chats[i]._id))
            .collect();
          
          for (const message of messages) {
            await ctx.db.delete(message._id);
          }
          
          // Delete the chat
          await ctx.db.delete(chats[i]._id);
          deletedCount++;
        }
      }
    }
    
    return { deletedCount };
  },
});
