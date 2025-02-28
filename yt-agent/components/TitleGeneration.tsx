"use client";

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export default function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles: { title: string; _id: string }[] = []; // TODO: pull from convex db

  console.log(user, videoId, titles)
  const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
    FeatureFlag.TITLE_GENERATIONS
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-xl p-4">
      <div className="min-w-52">
        <Usage featureFlag={FeatureFlag.TITLE_GENERATIONS} title="Titles" />
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group relative p-4 rounded-lg border border-indigo-500/20 hover:border-indigo-400/50 hover:bg-indigo-50/10 transition-all duration-200 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-indigo-200 leading-relaxed">
                {title.title}
              </p>
              <Button onClick={() => copyToClipboard(title.title)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-indigo-900/50 rounded-md" title="Copy to clipboard">
                <Copy className="w-4 h-4 text-indigo-400" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* No titles generated yet */}
      {!titles?.length && !!isTitleGenerationEnabled && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-indigo-500/30">
          <p className="text-indigo-200">No titles generated yet</p>
          <p className="text-indigo-300 text-sm mt-1">
            Generate titles to see them here
          </p>
        </div>
      )}
    </div>
  );
}
