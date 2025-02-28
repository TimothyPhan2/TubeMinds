'use server'

import { VideoDetails } from '@/types/types'
import { google } from 'googleapis'

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
})

export async function getVideoDetails(videoId: string) {
    console.log("Fetching video details for:", videoId)

    try {
        const videoResponse = await youtube.videos.list({
            part: ["statistics", "snippet"],
            id: [videoId]
        })
        const videoDetails = videoResponse.data.items?.[0];
        if(!videoDetails) throw new Error("Failed to fetch video details")
        console.log("videoDetails= ", videoDetails)
        
        const channelResponse = await youtube.channels.list({
            part: ["statistics", "snippet"],
            id: [videoDetails.snippet?.channelId || ""],
            key: process.env.YOUTUBE_API_KEY,
        })
        const channelDetails = channelResponse.data.items?.[0];
        if(!channelDetails) throw new Error("Failed to fetch channel details")
        console.log("channelDetails= ", channelDetails)
        

        const video: VideoDetails = {
            // Video Info
            title: videoDetails.snippet?.title || "Unknown Title",
            thumbnail: videoDetails.snippet?.thumbnails?.maxres?.url || videoDetails.snippet?.thumbnails?.high?.url || videoDetails.snippet?.thumbnails?.default?.url || "",
            publishedAt: videoDetails.snippet?.publishedAt || new Date().toISOString(),

            // Video Stats
            views: videoDetails.statistics?.viewCount || "0",
            likes: videoDetails.statistics?.likeCount || "Not Available",
            comments: videoDetails.statistics?.commentCount || "Not Available",

            // Channel Info
            channel: {
                title: channelDetails.snippet?.title || "Unknown Channel",
                subscribers: channelDetails.statistics?.subscriberCount || "0",
                thumbnail: channelDetails.snippet?.thumbnails?.default?.url || "",
            }
        }
        return video
    } catch (error) {
        console.log("Error fetching video details:", error)
        return null
    }
}