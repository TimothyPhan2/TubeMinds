"use client";

import { FeatureFlag } from "@/features/flags";
import { TranscriptEntry } from "@/types/types";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";
import Usage from "./Usage";


export default function TranscriptGeneration({ videoId }: { videoId: string }) {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  console.log(setTranscript, videoId)
  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );
  return (
    <div className="rounded-xl p-4 pb-0 gap-4 flex flex-col">
      <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

      {!featureUsageExceeded ? (
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4 border border-indigo-500/20">
          {transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2 hover:bg-indigo-50/10 p-2 rounded-md transition-colors duration-200">
                <span className="text-sm text-indigo-400 min-w-[50px] font-medium">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-indigo-200">{entry.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-indigo-500/30">
              <p className="text-indigo-200">No transcription available</p>
              <p className="text-indigo-300 text-sm mt-1">
                Generate a transcript to see it here
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
