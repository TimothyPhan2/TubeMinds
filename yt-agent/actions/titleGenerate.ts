"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagsEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();

export async function titleGenerate(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    console.log("📝 Video summary:", videoSummary);
    console.log("🎬 Generating title for video for videoId:", videoId);
    console.log("🧠 Considerations:", considerations);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Youtube video creator assistant that creates high quality SEO friendly concise video titles.",
        },
        {
          role: "user",
          content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const title =
      response.choices[0].message.content || "Unable to generate title";
    console.log("📝 Generated title:", title);

    if (!title) {
      return {
        error: "Failed to generate title (system error)",
      };
    }

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    await client.track({
      event: featureFlagsEvents[FeatureFlag.TITLE_GENERATIONS].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    console.log("📝 Title generated:", title);

    return title;
  } catch (error) {
    console.error("❌ Error generating title:", error);
    throw new Error("Failed to generate title");
  }
}
