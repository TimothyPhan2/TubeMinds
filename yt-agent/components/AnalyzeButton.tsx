"use client"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function AnalyzeButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity px-6 py-3 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:translate-y-[-2px] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        "Analyze"
      )}
    </Button>
  )
}
