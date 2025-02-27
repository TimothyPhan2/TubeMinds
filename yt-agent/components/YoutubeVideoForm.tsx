import Form from "next/form"
import AnalyzeButton from "./AnalyzeButton"
import AnalyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo"

export default function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
        <Form 
        action={AnalyzeYoutubeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/10"
        >
             <input 
               name="url" 
               type="text" 
               placeholder="Enter your YouTube video URL" 
               className="flex-1 w-full px-4 py-3 text-white bg-black/20 border border-white/10 rounded-md focus:border-pink-500 focus:ring-pink-500 placeholder:text-white/50"
             />
             <AnalyzeButton />
        </Form>
    </div>
  )
}
