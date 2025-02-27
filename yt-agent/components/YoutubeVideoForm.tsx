import Form from "next/form"
import AnalyzeButton from "./AnalyzeButton"
import AnalyzeYoutubeVideo from "@/actions/analyzeYoutubeVideo"

export default function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
        <Form 
        action={AnalyzeYoutubeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center"
        >
             <input name="url" type="text" placeholder="Enter your YouTube video URL" className="flex-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"/>
             <AnalyzeButton />
        </Form>
    </div>
  )
}
