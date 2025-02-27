"use client"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
export default function AnalyzeButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="px-6 py-2 text-white bg-blue-500"
    
    >
      {pending ? "Analyzing" : "Analyze"}
    </Button>
  )
}
