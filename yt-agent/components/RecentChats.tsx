"use client";

import { getChatHistory } from "@/actions/getChatHistory";
import { ChatHistory } from "@/types/types";
import { Clock, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface RecentChatsProps {
  videoId: string;
  onSelectChat: (chat: ChatHistory) => void;
}

// Helper function to format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
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

export default function RecentChats({ videoId, onSelectChat }: RecentChatsProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chat history from the API
  useEffect(() => {
    const fetchChatHistory = async () => {
      setIsLoading(true);
      try {
        const history = await getChatHistory();
        setChatHistory(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChatHistory();
  }, [videoId]);

  // Filter chats based on search query
  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleChatSelect = (chat: ChatHistory) => {
    onSelectChat(chat);
  };

  const handleKeyDown = (e: React.KeyboardEvent, chat: ChatHistory) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelectChat(chat);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col gap-4 p-4 backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold text-gray-800">Recent Chats</h2>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse flex flex-col space-y-3 w-full">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 bg-gray-200 rounded-lg w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-3 p-4 backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-xl overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-800">Recent Chats</h2>
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <Search className="h-3 w-3 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-7 w-full py-1.5 text-sm bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          aria-label="Search recent chats"
        />
      </div>
      
      {/* Chat list */}
      <div className="flex-grow overflow-y-auto pr-1.5 -mr-1.5">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
            <p>No chats found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                onKeyDown={(e) => handleKeyDown(e, chat)}
                tabIndex={0}
                className="p-2.5 bg-white/60 hover:bg-white/90 border border-gray-100 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label={`Chat: ${chat.title}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{chat.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 whitespace-nowrap ml-1">
                    <Clock className="h-2.5 w-2.5 mr-0.5" />
                    {formatRelativeTime(chat.timestamp)}
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{chat.preview}</p>
                {chat.videoId !== videoId && (
                  <div className="mt-1.5">
                    <span className="inline-block px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Different video
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
