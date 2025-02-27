"use server"

import {redirect} from "next/navigation"

export default async function AnalyzeYoutubeVideo(formData: FormData) {
    const url = formData.get("url")
    if (!url) return

    const videoId = "abc" // TODO: implement video analysis
    if(!videoId) return
    redirect(`/video/${videoId}/analysis`)
}