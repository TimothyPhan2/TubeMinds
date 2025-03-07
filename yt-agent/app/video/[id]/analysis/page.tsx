"use client";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import TranscriptGeneration from "@/components/TranscriptGeneration";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, PenTool, BarChart, Image, PlayCircle } from "lucide-react";
import AiAgentChat from "@/components/AiAgentChat";
import { useUser } from "@clerk/nextjs";
import { Doc } from "@/convex/_generated/dataModel";
import { createOrGetVideo } from "@/actions/createOrGetVideo";
import { toast } from "sonner";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { createChat } from "@/actions/createChat";
import Sidebar from "@/components/Sidebar";

export default function VideoAnalysisPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );
  console.log(setIsLoadingChat, isLoading);

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      try {
        // Create or get the video in the database
        const response = await createOrGetVideo(params.id, user.id);

        if (!response.success) {
          toast.error("Error creating or getting video", {
            description: response.error,
            duration: 10000,
          });
        } else {
          setVideo(response.data);
        }

        // Create or get the chat for this video
        await createNewChat();

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing video analysis:", error);
        toast.error("Failed to load video analysis");
        setIsLoading(false);
      }
    };

    init();
  }, [user, params.id]);

  // Create a new chat or get existing one
  const createNewChat = async () => {
    if (!user) return;

    try {
      // Get video details to use as chat title
      const videoDetails = await getVideoDetails(params.id);
      const chatTitle = videoDetails?.title || `Chat about video ${params.id}`;

      // Create or get existing chat
      await createChat({
        userId: user.id,
        videoId: params.id,
        title: chatTitle,
      });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const VideoTranscriptionStatus =
    video === undefined ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-700">Loading...</span>
      </div>
    ) : !video ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <p className="text-sm text-amber-700">
          This is your first time analyzing this video. <br />
          <span className="font-semibold">
            (1 Analysis token is being used!)
          </span>
        </p>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-sm text-green-700">
          Analysis exists for this video - no additional tokens needed in future
          calls! <br />
        </p>
      </div>
    );

  return (
    <div className="relative min-h-screen">
      {/* Sidebar Component */}
      <Sidebar videoId={id} />

      {/* Main Content */}
      <div className="transition-all duration-300 pt-4 lg:pl-64">
        <div className="xl:container mx-auto px-4 md:px-6 py-4 relative">
          {/* Background for main content area */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-indigo-950/40 backdrop-blur-sm rounded-xl shadow-xl border border-indigo-500/10 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="order-2 lg:order-1 flex flex-col gap-6 lg:border-r lg:border-indigo-500/20 p-6">
              {/* Analysis */}
              <div className="flex flex-col gap-4 p-6 backdrop-blur-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg rounded-xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl -ml-6 -mb-6"></div>

                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
                    <BarChart className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    Video Analysis
                  </h3>
                </div>

                {/* Usage component with custom wrapper */}
                <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                  <Usage
                    featureFlag={FeatureFlag.VIDEO_ANALYSIS}
                    title="Analyze Video"
                  />
                </div>

                {/* Status indicator */}
                <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                  {VideoTranscriptionStatus}
                </div>
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
                      <h3 className="text-lg font-medium text-white">
                        Video Details
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <YoutubeVideoDetails videoId={id} />
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
                      <h3 className="text-lg font-medium text-white">
                        Thumbnail Generation
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <ThumbnailGeneration videoId={id} />
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
                      <h3 className="text-lg font-medium text-white">
                        Title Generation
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <TitleGeneration videoId={id} />
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
                      <h3 className="text-lg font-medium text-white">
                        Transcript Generation
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 bg-white/5 p-4 rounded-lg border border-indigo-500/20">
                      <TranscriptGeneration videoId={id} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
              {/* AI Agent chat */}
              <AiAgentChat videoId={id as string} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
