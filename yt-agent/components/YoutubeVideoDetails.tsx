"use client";

import { getVideoDetails } from "@/actions/getVideoDetails";
import { VideoDetails } from "@/types/types";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Users2 } from "lucide-react";

export default function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      // Reset loading progress when fetching new video
      setLoadingProgress(0);
      
      // Simulate progress while waiting for API response
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          // Gradually increase up to 90% (save the last 10% for actual data arrival)
          if (prev < 90) {
            return prev + Math.random() * 10;
          }
          return prev;
        });
      }, 300);
      
      try {
        const video = await getVideoDetails(videoId);
        // Complete the progress bar when data arrives
        setLoadingProgress(100);
        setTimeout(() => {
          setVideoDetails(video);
        }, 500); // Small delay to show the completed progress bar
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoadingProgress(100);
      } finally {
        clearInterval(progressInterval);
      }
    };
    
    fetchVideoDetails();
  }, [videoId]);

  if (!videoDetails) return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium text-indigo-200">Loading video details...</p>
      <div className="w-full max-w-md">
        <Progress value={loadingProgress} className="h-2 rounded-full bg-indigo-600/30 [&>*]:bg-pink-500" />
      </div>
    </div>
  );
  return (
    <div className="@container">
      <div className="flex flex-col gap-8 p-6">
        {/* Thumbnail with simple hover effect */}
        <div className="flex-shrink-0 relative group overflow-hidden rounded-xl">
          <Image
            src={videoDetails.thumbnail}
            alt={videoDetails.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md transition-all duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Video Details */}
        <div className="flex-grow space-y-6">
          <h1 className="text-2xl @lg:text-3xl font-bold text-indigo-200 leading-tight line-clamp-2 relative">
            {videoDetails.title}
            <span className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"></span>
          </h1>

          {/* Channel Info with enhanced styling */}
          <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-indigo-500/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative flex-shrink-0">
              <Image
                src={videoDetails.channel.thumbnail}
                alt={videoDetails.channel.title}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 @md:w-14 @md:h-14 rounded-full border-2 border-indigo-500/30 shadow-md"
              />
            </div>

            <div className="flex-grow min-w-0">
              <p className="text-sm sm:text-base @md:text-lg font-semibold text-indigo-200 flex items-center flex-wrap gap-2">
                <span className="truncate">{videoDetails.channel.title}</span>
                <span className="text-xs bg-indigo-900/50 text-indigo-200 px-2 py-0.5 rounded-full flex-shrink-0">Creator</span>
              </p>
              <p className="text-xs sm:text-sm @md:text-base text-indigo-300 flex items-center">
                <Users2 className="w-3 h-3 mr-1 text-indigo-400 flex-shrink-0" />
                <span className="truncate">{videoDetails.channel.subscribers} subscribers</span>
              </p>
            </div>
          </div>
          
          {/* Video Stats with enhanced cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 @lg:grid-cols-4 gap-4 pt-2">
            <div className="rounded-lg p-3 transition-all duration-300 hover:bg-indigo-50/10 border border-indigo-500/20 shadow-sm hover:shadow-md hover:-translate-y-1 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-indigo-300 truncate">Published</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-indigo-200 truncate">
                {new Date(videoDetails.publishedAt).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'})}
              </p>
            </div>
            <div className="rounded-lg p-3 transition-all duration-300 hover:bg-indigo-50/10 border border-indigo-500/20 shadow-sm hover:shadow-md hover:-translate-y-1 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300 flex-shrink-0">
                  <Eye className="w-3.5 h-3.5 text-green-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-indigo-300 truncate">Views</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-indigo-200 truncate">{videoDetails.views}</p>
            </div>
            <div className="rounded-lg p-3 transition-all duration-300 hover:bg-indigo-50/10 border border-indigo-500/20 shadow-sm hover:shadow-md hover:-translate-y-1 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors duration-300 flex-shrink-0">
                  <ThumbsUp className="w-3.5 h-3.5 text-red-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-indigo-300 truncate">Likes</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-indigo-200 truncate">{videoDetails.likes}</p>
            </div>
            <div className="rounded-lg p-3 transition-all duration-300 hover:bg-indigo-50/10 border border-indigo-500/20 shadow-sm hover:shadow-md hover:-translate-y-1 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300 flex-shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-indigo-300">Comments</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-indigo-200">
                {videoDetails.comments}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
