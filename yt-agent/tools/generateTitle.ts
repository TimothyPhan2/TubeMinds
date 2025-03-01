import { titleGenerate } from "@/actions/titleGenerate";
import { FeatureFlag } from "@/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";

export const  generateTitle = ( userId: string) => tool({
  description: "Generate a title for a YouTube video",
  parameters: z.object({
    videoId: z.string().describe("The video ID to generate a title for"),
    videoSummary: z
      .string()
      .describe("The summary of the video to generate a title from"),
    considerations: z
      .string()
      .describe("Any additional considerations for the title"),
  }),
  execute: async ({ videoId, videoSummary, considerations }) => {
    // Implementation would go here
    const schematicCtx = {
        company: { id: userId },
        user: { id: userId },
      };

    const isTitleGenerationEnabled = await client.checkFlag(
      schematicCtx,
      FeatureFlag.TITLE_GENERATIONS
    );

    console.log(
      `isTitleGenerationEnabled = ${isTitleGenerationEnabled}, userId = ${userId}`
    );

    if (!isTitleGenerationEnabled) {
      return {
        error: "Title generation is not enabled, the user must upgrade",
      };
    }
    const title = await titleGenerate(videoId, videoSummary, considerations);
    return { title };
  },
});


