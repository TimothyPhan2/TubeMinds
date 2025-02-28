export interface ChannelDetails { 
    title: string;
    subscribers: string;
    thumbnail: string;
}
export interface VideoDetails{
    title: string;
    views: string;
    likes: string
    comments: string;
    thumbnail: string;
    channel: ChannelDetails;
    publishedAt: string;
}

export interface TranscriptEntry {
    text:string;
    timestamp: string;
}

export interface ChatHistory {
    id: string;
    videoId: string;
    title: string;
    timestamp: string;
    preview: string;
    videoDetails?: VideoDetails;
}