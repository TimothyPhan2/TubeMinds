"use client";

import {  Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { getVideoDetails } from "@/actions/getVideoDetails";
import { Doc } from "@/convex/_generated/dataModel";

// Helper function to format relative time
const formatRelativeTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Convert to appropriate time unit
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}mo`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years}y`;
  }
};

interface RecentChatsProps {
  videoId?: string;
}

export default function RecentChats({ videoId }: RecentChatsProps) {
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  
  const recentChats = useQuery(api.chats.getRecentChats, {
    userId: user?.id ?? "",
    limit: 10
  });
  
  const filteredChats = recentChats?.filter(chat => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Search in chat title
    if (chat.title && chat.title.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in video title
    const videoTitle = videoTitles[chat.videoId];
    if (videoTitle && videoTitle.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in video ID
    return chat.videoId.toLowerCase().includes(query);
  }) || [];

  const handleSelectChat = (chatVideoId: string) => {
    // If we're already on this video's page, don't navigate (prevents duplicate chats)
    if (videoId === chatVideoId) {
      // Just refresh the page to reset the chat state
      window.location.reload();
    } else {
      router.push(`/video/${chatVideoId}/analysis`);
    }
  };
  
  // Function to fetch video titles
  const fetchVideoTitles = async (chats: Doc<"chats">[]) => {
    if (!chats || chats.length === 0 || isLoadingTitles) return;
    
    setIsLoadingTitles(true);
    
    const uniqueVideoIds = [...new Set(chats.map(chat => chat.videoId))];
    const titles: Record<string, string> = { ...videoTitles };
    
    for (const id of uniqueVideoIds) {
      if (!titles[id]) {
        try {
          const details = await getVideoDetails(id);
          if (details && details.title) {
            titles[id] = details.title;
          }
        } catch (error) {
          console.error(`Error fetching title for video ${id}:`, error);
        }
      }
    }
    
    setVideoTitles(titles);
    setIsLoadingTitles(false);
  };
  
  // Fetch video titles when chats change
  useEffect(() => {
    if (recentChats) {
      fetchVideoTitles(recentChats);
    }
  }, [recentChats]);

  if (!recentChats) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex flex-col h-full p-4 backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Chats</h2>
          {isLoadingTitles && (
            <span className="text-xs text-gray-500 flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-1"></div>
              Fetching titles...
            </span>
          )}
        </div>
        
        {/* Search input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Clear search</span>
              &times;
            </button>
          )}
        </div>
        
        <div className="overflow-y-auto flex-grow pr-1">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No chats found</p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-blue-500 hover:text-blue-600 mt-2"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => handleSelectChat(chat.videoId)}
                  tabIndex={0}
                  className="p-3 bg-white/80 hover:bg-white border border-gray-100 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
                  aria-label={`Chat: ${chat.title || "Untitled chat"}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate max-w-[90%]">
                      {videoTitles[chat.videoId] || (
                        <span className="text-gray-500">
                          Loading title...
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatRelativeTime(chat.updatedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
