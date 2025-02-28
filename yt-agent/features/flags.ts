export enum FeatureFlag {
    TRANSCRIPTION = "transcriptions",
    IMAGE_GENERATION = "image-generations",
    TITLE_GENERATIONS = "title-generations",
    VIDEO_ANALYSIS = "video-analyze",
    SCRIPT_GENERATION = "script-generation"

}

export const featureFlagsEvents: Record<FeatureFlag, {event:string}> = {
    [FeatureFlag.TRANSCRIPTION]: { event: "transcribe" },
    [FeatureFlag.IMAGE_GENERATION]: { event: "generate-image" },
    [FeatureFlag.TITLE_GENERATIONS]: { event: "generate-title" },
    [FeatureFlag.VIDEO_ANALYSIS]: { event: "video-analyze" },
    [FeatureFlag.SCRIPT_GENERATION]: { event: "" }
}