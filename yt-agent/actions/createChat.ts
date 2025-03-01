'use server'

import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function createChat({
  userId,
  videoId,
  title
}: {
  userId: string;
  videoId: string;
  title?: string;
}) {
  try {
    // Call the Convex mutation to create a chat
    const chatId = await convex.mutation(api.chats.createChat, {
      userId,
      videoId,
      title
    });
    
    return chatId;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}
