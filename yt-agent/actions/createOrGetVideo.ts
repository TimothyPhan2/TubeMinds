"use server";

import { Doc } from "@/convex/_generated/dataModel";
import { currentUser } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { FeatureFlag, featureFlagsEvents } from "@/features/flags";
import { api } from "@/convex/_generated/api";
import { client } from "@/lib/schematic";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

export const createOrGetVideo = async (
  videoId: string,
  userId: string
): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const featureCheck = await checkFeatureUsageLimit(
    user.id,
    featureFlagsEvents[FeatureFlag.VIDEO_ANALYSIS].event
  );

  if (!featureCheck.success) {
    return {
      success: false,
      error: featureCheck.error,
    };
  }

  try {
    const video = await convex.query(api.videos.getVideoByUserId, {
      videoId,
      userId,
    });

    if (!video) {
      console.log("video not found, using token to analyze video");

      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId,
      });

      const newVideo = await convex.query(api.videos.getVideoByUserId, {
        videoId: newVideoId,
        userId,
      });

      console.log("tracking analyze video");

      await client.track({
        event: featureFlagsEvents[FeatureFlag.VIDEO_ANALYSIS].event,
        company: {
          id: userId,
        },
        user: {
          id: userId,
        },
      });
      return {
        success: true,
        data: newVideo!,
      };
    } else {
      console.log("video found, not using token to analyze video");
      return { success: true, data: video };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get video" };
  }
};
