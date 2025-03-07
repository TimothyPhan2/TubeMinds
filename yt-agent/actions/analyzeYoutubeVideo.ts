"use server"

import {redirect} from "next/navigation"
import { getVideoIDFromUrl } from "@/lib/getVideoIDFromUrl"
export default async function AnalyzeYoutubeVideo(formData: FormData) {

    const url = formData.get("url")?.toString()
    if (!url) return

    const videoId = getVideoIDFromUrl(url)
    console.log("videoId= ", videoId)
    if(!videoId) return


    redirect(`/video/${videoId}/analysis`) 
}