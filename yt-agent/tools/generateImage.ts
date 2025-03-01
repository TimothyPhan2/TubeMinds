import { tool } from "ai";
import { client } from "@/lib/schematic";
import { FeatureFlag } from "@/features/flags";
import { z } from "zod";
import { generateImg } from "@/actions/generateImg";

export const generateImage = (videoId: string, userId: string) =>
  tool({
    description: "Generate an image",
    parameters: z.object({
      prompt: z.string().describe("The prompt to generate an image for"),
      videoId: z.string().describe("The YouTube video ID"),
    }),
    execute: async ({ prompt }) => {
      console.log(
        `generateImage tool called with prompt: ${prompt} and videoId: ${videoId}`
      );
        const schematicCtx = {
          company: { id: userId },
          user: { id: userId },
        };

      const isImageGenerationEnabled = await client.checkFlag(
        schematicCtx,
        FeatureFlag.IMAGE_GENERATION
      );

      console.log(
        `isImageGenerationEnabled = ${isImageGenerationEnabled}, userId = ${userId}`
      );

      if (!isImageGenerationEnabled) {
        return {
          error: "Image generation is not enabled, the user must upgrade",
        };
      }

      const image = await generateImg(prompt, videoId);
      console.log(`image generated: ${JSON.stringify(image)}`);
      return { image };
    },
  });
