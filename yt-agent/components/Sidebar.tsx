"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  X,
  MessageSquare,
  PlayCircle,
  Image,
  FileText,
  PenTool,
  BarChart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RecentChats from "@/components/RecentChats";

interface SidebarProps {
  videoId?: string;
}

export default function Sidebar({ videoId }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
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
          <TooltipContent
            side="right"
            className="bg-indigo-900 text-indigo-200 border border-indigo-500/30"
            hideArrow
          >
            <p>{sidebarOpen ? "Close sidebar" : "Open sidebar"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Left Sidebar */}
      <div
        className={`fixed top-16 bottom-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 
        bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-md border-r border-indigo-500/20 
        transition-transform duration-300 ease-in-out z-40 overflow-y-auto shadow-lg`}
      >
        {/* Sidebar Header with Brand Element */}
        <div className="pt-4 pb-2 px-4 border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-pink-400" />
            <h2 className="text-base font-medium bg-gradient-to-r from-pink-400 to-violet-300 text-transparent bg-clip-text">
              AI Assistant
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
              <TooltipContent
                side="right"
                className="bg-indigo-900 text-indigo-200 border border-indigo-500/30"
                hideArrow
              >
                <p>Close sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Menu Group */}
        <div className="px-3 py-4">
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-indigo-300/80 uppercase tracking-wider">
              Platform
            </h3>

            {/* Menu Items */}
            <div className="space-y-1 mt-2">
              {/* Dashboard */}
              <Link
                href={`/dashboard`}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-800/50 transition-colors duration-200 group"
                tabIndex={0}
                aria-label="Dashboard"
              >
                <BarChart className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="px-3 pb-2 border-t border-indigo-500/20 pt-4">
          <h3 className="px-3 text-xs font-semibold text-indigo-300/80 uppercase tracking-wider mb-2">
            Chat History
          </h3>
          <div className="h-[calc(100vh-18rem)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent hover:scrollbar-thumb-indigo-500/50">
            <RecentChats videoId={videoId} />
          </div>
        </div>

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
            <TooltipContent
              side="right"
              className="bg-indigo-900 text-indigo-200 border border-indigo-500/30"
              hideArrow
            >
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-indigo-950/60 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
