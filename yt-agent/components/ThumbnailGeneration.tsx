"use client";

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ThumbnailGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();

  const images = useQuery(api.images.getImages, {
    userId: user?.id ?? "",
    videoId,
  }); // TODO: pull from convex db
  return (
    <div className="rounded-xl flex flex-col p-4">
      <div className="min-w-52">
        <Usage
          featureFlag={FeatureFlag.IMAGE_GENERATION}
          title="Thumbnail Generation"
        />
      </div>

      {/* Horizontal scrollable images */}
      <div className={`flex overflow-x-auto gap-4 ${images?.length && "mt-4"}`}>
        {images?.map(
          (image, index) =>
            image.url && (
              <div
                key={image._id}
                className="flex-none w-[200px] h-[110px] rounded-lg overflow-x-auto border border-indigo-500/20 shadow-md"
              >
                <Image
                  loading="lazy"
                  src={image.url}
                  alt="Generated Image"
                  width={200}
                  height={200}
                  className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            )
        )}
      </div>

      {!images?.length && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-indigo-500/30">
          <p className="text-indigo-200">No images generated yet</p>
          <p className="text-indigo-300 text-sm mt-1">
            Generate images to see them here
          </p>
        </div>
      )}
    </div>
  );
}
