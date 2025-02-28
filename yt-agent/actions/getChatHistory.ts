"use server";

import { ChatHistory } from "@/types/types";

// In a real implementation, this would fetch data from your database
export async function getChatHistory(videoId?: string): Promise<ChatHistory[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - replace with actual database query in production
  const mockChatHistory: ChatHistory[] = [
    {
      id: "chat1",
      videoId: "video-123",
      title: "Title optimization",
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
      preview: "Analysis of title performance and SEO recommendations"
    },
    {
      id: "chat2",
      videoId: "video-123",
      title: "Thumbnail analysis",
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      preview: "Evaluation of thumbnail effectiveness and suggestions"
    },
    {
      id: "chat3",
      videoId: "video-123",
      title: "Content strategy",
      timestamp: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
      preview: "Analysis of video content and audience engagement"
    },
    {
      id: "chat4",
      videoId: "video-456",
      title: "Competitor analysis",
      timestamp: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
      preview: "Comparison with similar content creators"
    },
    {
      id: "chat5",
      videoId: "video-789",
      title: "Audience retention",
      timestamp: new Date(Date.now() - 3600000 * 168).toISOString(), // 7 days ago
      preview: "Analysis of viewer retention and engagement metrics"
    }
  ];
  
  // If videoId is provided, filter chats for that video
  if (videoId) {
    return mockChatHistory.filter(chat => chat.videoId === videoId);
  }
  
  // Otherwise return all chats
  return mockChatHistory;
}

// Get a specific chat by ID
export async function getChatById(chatId: string): Promise<ChatHistory | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allChats = await getChatHistory();
  return allChats.find(chat => chat.id === chatId) || null;
}
