import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTranscriptByVideoId = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler(ctx, args) {
    return ctx.db
      .query("transcripts")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();
  },
});

export const storeTranscript = mutation({
    args:{
        videoId: v.string(),
        userId: v.string(),
        transcript: v.array(v.object({
            text: v.string(),
            timestamp: v.string(),
        }))
    },
    handler: async (ctx, args) =>{
        // Check existing transcripts for user and video
        const existingTranscript = await ctx.db.query("transcripts").withIndex("by_user_and_video", (q) => q.eq("userId", args.userId).eq("videoId", args.videoId)).unique();

        if(existingTranscript){
         return existingTranscript;   
        }


        // Create new transcript
        return await ctx.db.insert("transcripts", {
            videoId: args.videoId,
            userId: args.userId,
            transcript: args.transcript
        })
    }
})

export const getTranscriptByUserId = query({
    args: {
        userId: v.string(),
    },
    handler(ctx, args) {
        return ctx.db
          .query("transcripts")
          .withIndex("by_user_id")
          .filter((q) => q.eq("userId", args.userId))
          .collect();
      },
})

export const deleteTranscriptByUserId = mutation({
    args: {
        userId: v.string(),
        id: v.id("transcripts")
    },
    handler: async (ctx, args) => {
       const transcript = await ctx.db.get(args.id);
       if(!transcript){
        throw new Error("Transcript not found");
       }
       if (transcript.userId !== args.userId){
        throw new Error("You cannot delete this transcript");
       }
       await ctx.db.delete(transcript._id);
       return true
      },
})

