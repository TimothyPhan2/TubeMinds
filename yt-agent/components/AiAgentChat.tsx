"use client";

import { useChat } from "@ai-sdk/react";
import {  MessageSquare, FileText, Image, Heading } from "lucide-react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { ChatMessage, ToolPart } from "@/types/types";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/features/flags";
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown tool";
  
  // Get a friendly name for the tool
  const toolName = part.toolInvocation.toolName;
  let icon = "🔧";
  
  if (toolName.toLowerCase().includes("script")) {
    icon = "📝";
  } else if (toolName.toLowerCase().includes("image")) {
    icon = "🖼️";
  } else if (toolName.toLowerCase().includes("title")) {
    icon = "✏️";
  } else if (toolName.toLowerCase().includes("video")) {
    icon = "🎬";
  } else if (toolName.toLowerCase().includes("search")) {
    icon = "🔍";
  }
  
  return `${icon} ${part.toolInvocation.toolName}`;
};

export default function AiAgentChat({ videoId }: { videoId: string }) {
  // Bottom scrolling logic
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, append, status } =
    useChat({
      maxSteps: 5,
      body: {
        videoId,
      },
    });

  const isScriptGenerationEnabled = useSchematicFlag(
    FeatureFlag.SCRIPT_GENERATION
  );
  const isImageGenerationEnabled = useSchematicFlag(
    FeatureFlag.IMAGE_GENERATION
  );
  const isTitleGenerationEnabled = useSchematicFlag(
    FeatureFlag.TITLE_GENERATIONS
  );
  const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.VIDEO_ANALYSIS);

  useEffect(() => {
    if (bottomRef.current && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: ChatMessage = {
      id: `generate-script-${randomId}`,
      role: "user",
      content:
        "Generate a step-by-step shooting script for this video that I can use on my own channel to produce a video that is similar to this one, dont do any other steps such as generating a image, just generate the script only",
    };

    append(userMessage);
  };

  const generateImage = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: ChatMessage = {
      id: `generate-image-${randomId}`,
      role: "user",
      content: "Generate a thumbnail for this video",
    };

    append(userMessage);
  };

  const generateTitle = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: ChatMessage = {
      id: `generate-title-${randomId}`,
      role: "user",
      content: "Generate a title for this video",
    };

    append(userMessage);
  };

  return (
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

      <div className="flex-1 overflow-y-auto bg-black/10 p-4 rounded-lg border border-indigo-500/20 relative z-10 " ref={messageContainerRef}>
        <div className="flex flex-col space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                  <MessageSquare className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium text-white">
                  Welcome to the AI Agent Chat
                </h3>
                <p className="text-sm text-gray-400">
                  Ask any question about your video!
                </p>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500/30"
                      : "bg-black/30 text-white shadow-md border border-indigo-500/20"
                  }`}
                >
                  {message.role === "assistant" && message.parts ? (
                    <div className="space-y-3">
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <div
                            className="prose prose-invert prose-sm max-w-none text-gray-200"
                            key={index}
                          >
                            <ReactMarkdown>{part.text}</ReactMarkdown>
                          </div>
                        ) : part.type === "tool-invocation" ? (
                          <div
                            key={index}
                            className="bg-indigo-950/30 backdrop-blur-sm rounded-lg p-3 space-y-2 text-white border border-indigo-500/20 shadow-inner"
                          >
                            <div className="font-medium text-xs flex items-center gap-2 text-pink-300">
                              {formatToolInvocation(part as ToolPart)}
                            </div>
                            {(part as ToolPart).toolInvocation.result && (
                              <div className="text-xs bg-black/20 p-3 rounded-md overflow-auto max-h-40 border border-indigo-500/10">
                                <pre className="font-mono text-gray-300 whitespace-pre-wrap">
                                  {JSON.stringify(
                                    (part as ToolPart).toolInvocation.result,
                                    null,
                                    2
                                  )}
                                </pre>
                              </div>
                            )}
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : (
                    // User message
                    <div className="prose prose-invert prose-sm max-w-none text-white">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input form - Fixed at the bottom */}
      <div className="relative z-10">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              name="prompt"
              type="text"
              placeholder={
                !isVideoAnalysisEnabled
                  ? "Upgrade to ask anything about your video..."
                  : "Ask anything about your video..."
              }
              className="flex-1 w-full h-10 px-4 py-3 text-white bg-black/20 border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 placeholder:text-white/40 transition-all duration-200"
              value={input}
              onChange={handleInputChange}
              aria-label="Chat message input"
            />
            <Button
              type="submit"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isVideoAnalysisEnabled
              }
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg border border-blue-500/30 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {status === "streaming"
                ? "AI is replying..."
                : status === "submitted"
                  ? "AI is thinking..."
                  : "Send"}
            </Button>
          </form>
          <div className="flex gap-2">
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-white border border-indigo-500/30 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              onClick={generateScript}
              type="button"
              disabled={!isScriptGenerationEnabled}
            >
              <FileText className="w-4 h-4" />
              {isScriptGenerationEnabled ? (
                <span>Generate Script</span>
              ) : (
                <span>Upgrade for Script</span>
              )}
            </button>
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-pink-600/20 hover:bg-pink-600/30 text-white border border-pink-500/30 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              onClick={generateImage}
              type="button"
              disabled={!isImageGenerationEnabled}
            >
              <Image className="w-4 h-4" />
              {isImageGenerationEnabled ? (
                <span>Generate Image</span>
              ) : (
                <span>Upgrade for Image</span>
              )}
            </button>
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-500/30 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              onClick={generateTitle}
              type="button"
              disabled={!isTitleGenerationEnabled}
            >
              <Heading className="w-4 h-4" />
              {isTitleGenerationEnabled ? (
                <span>Generate Title</span>
              ) : (
                <span>Upgrade for Title</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
