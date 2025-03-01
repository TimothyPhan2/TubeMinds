import { time } from "console";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  videos: defineTable({
    videoId: v.string(),
    userId: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

  transcripts: defineTable({
    videoId: v.string(),
    userId: v.string(),
    transcript: v.array(
      v.object({
        text: v.string(),
        timestamp: v.string(),
      })
    ),
  })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

  images: defineTable({
    storageId: v.id("_storage"),
    videoId: v.string(),
    userId: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

  titles: defineTable({
    videoId: v.string(),
    userId: v.string(),
    title: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),
    
  chats: defineTable({
    userId: v.string(),
    videoId: v.string(),
    title: v.optional(v.string()), // Optional chat title
    createdAt: v.number(), // Timestamp
    updatedAt: v.number(), // Timestamp
  })
    .index("by_user", ["userId"])
    .index("by_user_and_video", ["userId", "videoId"])
    .index("by_recent", ["userId", "updatedAt"]),
  
  chatMessages: defineTable({
    chatId: v.id("chats"),
    role: v.string(), // "user" or "assistant"
    content: v.string(),
    timestamp: v.number(),
    // For tool calls/results
    toolName: v.optional(v.string()),
    toolInput: v.optional(v.any()),
    toolOutput: v.optional(v.any()),
  })
    .index("by_chat", ["chatId"])
    .index("by_chat_and_timestamp", ["chatId", "timestamp"]),
});
