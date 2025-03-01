"use server"
import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagsEvents } from "@/features/flags";
import { client } from "@/lib/schematic";
import { TranscriptEntry } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const youtube = await Innertube.create({
  lang: "en",
  location: "US",
  retrieve_player: false,
});

function formatTimestamp(timestamp: number): string {
  const minutes = Math.floor(timestamp / 60000);
  const seconds = (timestamp % 60000) / 1000;
  return `${minutes}:${seconds.toFixed().padStart(2, "0")}`;
}
async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();

    const transcript: TranscriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments.map(
        (segment) => ({
          text: segment.snippet.text ?? "",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];
    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw new Error("Failed to fetch transcript");
  }
}
export async function getYoutubeTranscript(videoId: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  // Check if transcript is cached in database

  const existingTranscript = await convex.query(
    api.transcripts.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  if (existingTranscript){
    console.log(" transcript found in database")
    return {
        cache: "This video has already been transcribed - Accessing cached transcript instead of using a token",
        transcript: existingTranscript.transcript
    }
  }

  try {
    console.log("Fetching transcript for video:", videoId)
    const transcript = await fetchTranscript(videoId);
    console.log("Transcript fetched, storing it in database")
    //store transcript in database
    
    await convex.mutation(api.transcripts.storeTranscript, {
        videoId,
        userId: user.id,
        transcript
    })

    console.log("Transcript stored in database, tracking event")
    await client.track({
        event: featureFlagsEvents[FeatureFlag.TRANSCRIPTION].event,
        company: {
            id: user.id
        },
        user: {
            id: user.id
        }
    })

    console.log("Tracking event successful")
    return {
        transcript,
        cache: "This video was transcribed using a token, and now saved in the database"
    }
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return{
        transcript: [],
        cache: "Failed to fetch transcript, please try again later"
    }
  }



  
}
