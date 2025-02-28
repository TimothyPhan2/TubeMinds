"use client";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import TranscriptGeneration from "@/components/TranscriptGeneration";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
// import RecentChats from "@/components/RecentChats";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";
import { useState,} from "react";
import { ChatHistory } from "@/types/types";
import { getChatById } from "@/actions/getChatHistory";
import { ArrowLeft, ChevronLeft, X, MessageSquare, PlayCircle, Image, FileText, PenTool, BarChart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function VideoAnalysisPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [selectedChat, setSelectedChat] = useState<ChatHistory | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // const handleSelectChat = async (chat: ChatHistory) => {
  //   setIsLoadingChat(true);
  //   try {
  //     // In a real implementation, this would fetch the complete chat data
  //     const fullChatData = await getChatById(chat.id);
  //     if (fullChatData) {
  //       setSelectedChat(fullChatData);
  //       // Close sidebar on mobile after selection
  //       if (window.innerWidth < 1024) {
  //         setSidebarOpen(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching chat details:", error);
  //   } finally {
  //     setIsLoadingChat(false);
  //   }
  // };

  const handleBackToCurrentVideo = () => {
    setSelectedChat(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Sidebar Toggle Button - Mobile Only */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden fixed top-20 left-4 z-50 p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <MessageSquare size={20} />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-indigo-900 text-indigo-200 border border-indigo-500/30" hideArrow>
            <p>{sidebarOpen ? "Close sidebar" : "Open sidebar"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Left Sidebar - Recent Chats */}
      <div 
        className={`fixed top-16 bottom-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 
        bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-md border-r border-indigo-500/20 
        transition-transform duration-300 ease-in-out z-40 overflow-y-auto shadow-lg`}
      >
        {/* Sidebar Header with Brand Element */}
        <div className="pt-4 pb-2 px-4 border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-pink-400" />
            <h2 className="text-base font-medium bg-gradient-to-r from-pink-400 to-violet-300 text-transparent bg-clip-text">
              Chat History
            </h2>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleSidebar}
                  className="hidden lg:flex items-center justify-center p-1.5 rounded-full 
                  text-pink-400 transition-colors"
                  aria-label="Close sidebar"
                >
                  <ChevronLeft size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-indigo-900 text-indigo-200 border border-indigo-500/30" hideArrow>
                <p>Close sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Sidebar Content
        <div className="h-[calc(100%-3.5rem)] pt-2 pb-6 px-3">
          <RecentChats videoId={id} onSelectChat={handleSelectChat} />
        </div> */}
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-indigo-900/80 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Sidebar toggle button for desktop - visible when sidebar is closed */}
      {!sidebarOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex fixed top-20 left-4 z-50 items-center justify-center p-2.5 
                bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md 
                hover:shadow-lg transition-all duration-200 hover:scale-105"
                aria-label="Open sidebar"
              >
                <MessageSquare size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-indigo-900 text-indigo-200 border border-indigo-500/30" hideArrow>
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Main Content */}
      <div className={`transition-all duration-300 pt-4 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        <div className="xl:container mx-auto px-4 md:px-6 py-4 relative">
          {/* Background for main content area */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-indigo-950/40 backdrop-blur-sm rounded-xl shadow-xl border border-indigo-500/10 -z-10"></div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10'>
            <div className="order-2 lg:order-1 flex flex-col gap-6 lg:border-r lg:border-indigo-500/20 p-6">
              {/* Selected chat indicator */}
              {selectedChat && selectedChat.videoId !== id && (
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-200 rounded-lg border border-indigo-500/20">
                  <button 
                    onClick={handleBackToCurrentVideo}
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
                    aria-label="Return to current video"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Return to current video</span>
                  </button>
                  <span className="text-sm text-indigo-300">Viewing chat from a different video</span>
                </div>
              )}
              
              {/* Analysis */}
              <div className="flex flex-col gap-4 p-6 backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                    <BarChart className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Video Analysis</h3>
                </div>
                
                {/* Usage component with custom wrapper */}
                <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                  
                    <Usage featureFlag={FeatureFlag.VIDEO_ANALYSIS} title="Analyze Video" />
                 
                </div>
                
                {/* Status indicator */}
               
              </div>
              
              {/* Loading indicator for chat data */}
              {isLoadingChat ? (
                <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 flex items-center justify-center h-40 overflow-hidden relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 relative z-10"></div>
                </div>
              ) : (
                <>
                  {/* Youtube Video Details */}
                  <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                    
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                        <PlayCircle className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Video Details</h3>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <YoutubeVideoDetails videoId={selectedChat?.videoId || id} />
                    </div>
                  </div>

                  {/* Thumbnail Generation */}
                  <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                    
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                        <Image className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Thumbnail Generation</h3>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <ThumbnailGeneration videoId={selectedChat?.videoId || id} />
                    </div>
                  </div>
                  
                  {/* Title Generation */}
                  <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                    
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                        <PenTool className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Title Generation</h3>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <TitleGeneration videoId={selectedChat?.videoId || id} />
                    </div>
                  </div>
                  
                  {/* Transcript Generation */}
                  <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                    
                    {/* Header with icon */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                        <FileText className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Transcript Generation</h3>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <TranscriptGeneration videoId={selectedChat?.videoId || id} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
              {/* AI Agent chat */}
              <div className="h-full flex flex-col gap-4 p-6 backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
                
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                    <MessageSquare className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">AI Agent Chat</h3>
                </div>
                
                <div className="flex-grow flex items-center justify-center bg-white/5 p-4 rounded-lg border border-indigo-500/20 relative z-10">
                  <p className="text-indigo-200">AI Agent chat interface will be implemented here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-indigo-950/60 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  )
}
