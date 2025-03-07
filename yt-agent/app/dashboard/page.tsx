"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, 
  PlayCircle, 
  Clock, 
  TrendingUp,
  Settings,
  PlusCircle
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";

export default function Dashboard() {
  const { user } = useUser();
  const [recentVideos, setRecentVideos] = useState([
    { id: "dQw4w9WgXcQ", title: "Sample Video 1", date: "2 days ago" },
    { id: "jNQXAC9IVRw", title: "Sample Video 2", date: "1 week ago" },
    { id: "y6120QOlsfU", title: "Sample Video 3", date: "2 weeks ago" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 py-4">
      {/* Welcome Section */}
      <div className="lg:col-span-3 backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.firstName || "User"}
          </h1>
          <p className="text-indigo-200/90">
            Your AI-powered video analysis dashboard
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <BarChart className="h-5 w-5 text-pink-400" />
          </div>
          <h3 className="text-lg font-medium text-white">Analytics</h3>
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="bg-white/5 p-4 rounded-lg border border-indigo-500/20">
            <div className="flex justify-between items-center">
              <span className="text-indigo-200">Videos Analyzed</span>
              <span className="text-white font-medium">3</span>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-indigo-500/20">
            <div className="flex justify-between items-center">
              <span className="text-indigo-200">Tokens Used</span>
              <span className="text-white font-medium">1,250</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <Clock className="h-5 w-5 text-pink-400" />
          </div>
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
        </div>
        
        <div className="space-y-3 relative z-10">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-lg border border-indigo-500/20 animate-pulse">
                <div className="h-5 bg-indigo-400/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-indigo-400/20 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            recentVideos.map(video => (
              <Link 
                href={`/video/${video.id}/analysis`}
                key={video.id} 
                className="bg-white/5 p-4 rounded-lg border border-indigo-500/20 block hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-indigo-100 font-medium">{video.title}</p>
                    <p className="text-indigo-300 text-sm">{video.date}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <Settings className="h-5 w-5 text-pink-400" />
          </div>
          <h3 className="text-lg font-medium text-white">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3 relative z-10">
          <button 
            onClick={handleOpenDialog}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            <PlusCircle className="h-5 w-5" />
            Analyze New Video
          </button>
          
          <Link 
            href="/settings" 
            className="bg-white/10 text-white p-4 rounded-lg flex items-center justify-center gap-2 border border-indigo-500/20 hover:bg-white/15 transition-all"
          >
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </Link>
        </div>
      </div>

      {/* Dialog for YouTube Video Form */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/30 shadow-lg text-white max-w-md mx-auto rounded-xl">
          <div className="relative overflow-hidden">
          
            
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-indigo-300 text-transparent bg-clip-text">
              Analyze a YouTube Video
            </DialogTitle>
            
            <div className="mt-4 mb-3 text-indigo-200/80 text-sm">
              Enter your YouTube video URL below to get AI-powered analysis and suggestions
            </div>
            
            <div className="mt-6">
              <YoutubeVideoForm />
            </div>
            
            <div className="mt-6 flex justify-end">
              <DialogClose asChild>
                <button className="px-4 py-2 rounded-lg bg-indigo-800/50 hover:bg-indigo-700/50 border border-indigo-500/30 text-indigo-200 transition-colors">
                  Cancel
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
