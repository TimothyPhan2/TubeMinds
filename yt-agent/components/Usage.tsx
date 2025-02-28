"use client";

import { FeatureFlag } from "@/features/flags";
import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { Progress } from "./ui/progress";

export default function Usage({
  featureFlag,
  title,
}: {
  featureFlag: FeatureFlag;
  title: string;
}) {
  const isPending = useSchematicIsPending();
  const {
    featureAllocation,
    featureUsage,
    value: isFeatureEnabled,
  } = useSchematicEntitlement(featureFlag);

  const hasUsedAllTokens =
    featureUsage && featureAllocation && featureUsage >= featureAllocation;

  if (isPending) {
    return <div className="text-indigo-300 text-center py-4">Loading...</div>;
  }

  if (hasUsedAllTokens) {
    return (
      <div className="rounded-2xl border border-red-500/30 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-200">{title}</h2>
          <div className="px-4 py-2 bg-red-900/50 rounded-lg">
            <span className="font-medium text-red-300">{featureUsage}</span>
            <span className="text-red-500 mx-2">/</span>
            <span className="font-medium text-red-300">
              {featureAllocation}
            </span>
          </div>
        </div>

        <div className="relative">
          <Progress
            value={100}
            className="h-3 rounded-full bg-indigo-900/30 [&>*]:bg-red-600"
          />
          <p className="text-sm text-red-400 mt-2">
            You have used all of your tokens. Please upgrade your plan to
            continue using the service.
          </p>
        </div>
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="rounded-2xl border border-indigo-500/20 p-6 opacity-50">
        <div className="flext justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-200">{title}</h2>
          <div className="px-4 py-2 bg-indigo-900/50 rounded-lg">
            <span className="text-indigo-300">Feature Disabled</span>
          </div>
        </div>
        <div className="relative">
          <Progress value={0} className="h-3 rounded-full bg-indigo-900/30" />
          <p className="text-sm text-indigo-300 mt-2">
            Upgrade your plan to enable this feature.
          </p>
        </div>
      </div>
    );
  }

  const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return "[&>*]:bg-red-600";
    if (percent >= 50) return "[&>*]:bg-yellow-500";
    return "[&>*]:bg-green-500";
  };
  const progressColor = getProgressColor(progress);
  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-indigo-200">{title}</h2>
        <div className="px-4 py-2 bg-indigo-900/50 rounded-lg">
          <span className="text-indigo-200 font-medium">{featureUsage}</span>
          <span className="text-indigo-400 mx-2">/</span>
          <span className="text-indigo-200 font-medium">{featureAllocation}</span>
        </div>
      </div>
      <div className="relative">
        <Progress
          value={progress}
          className={`h-3 rounded-full bg-indigo-600/30 ${progressColor}`}
        />
        {progress >= 100 ? (
          <p className="text-sm text-red-400 mt-2">
            Your have reached your usage limit
          </p>
        ) : progress >= 80 ? (
          <p className="text-sm text-red-400 mt-2">
            Warning: You are close to your usage limit
          </p>
        ) : null}
      </div>
    </div>
  );
}
