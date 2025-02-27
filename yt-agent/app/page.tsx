import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import {Brain,ScrollText, Bot, Pencil,Images, MessageCircle, Video } from "lucide-react"

export default function Home() {
  const steps = [
    {
      title: "1. Upload your Content",
      description: "Upload your youtube video URL for your agent to analyze",
      icon: Video
    },
    {
      title: "2. AI Agent Analysis",
      description: "Your agent analyzes your content and generates insights",
      icon: Brain
    },
    {
      title: "3. Receive Intelligence",
      description: "Get actionable insights and strategic recommendations",
      icon: MessageCircle
    }
  ]
  const features = [
    {
      title: "AI Analysis",
      description: "Get insights into your content with AI analysis",
      icon: Brain,
      iconBg: "bg-blue-100",
      iconColor:"text-blue-500"
    },
    {
      title: "Smart Transcription",
      description: "Transcribe your videos in minutes with AI-powered transcription",
      icon: MessageCircle,
      iconBg:"bg-green-100",
      iconColor:"text-green-500"
    },
    {
      title: "Thumbnail Generation",
      description: "Generate thumbnails for your videos in seconds",
      icon: Images,
      iconBg:"bg-yellow-100",
      iconColor:"text-yellow-500"
    },
    {
      title: "Title Generation",
      description: "Generate titles for your videos in seconds",
      icon: Pencil,
      iconBg:"bg-pink-100",
      iconColor:"text-pink-500"
    },
    {
      title: "Script Generation",
      description: "Get detailed, step-by-step scripts to recreate viral videos",
      icon: ScrollText,
      iconBg:"bg-purple-100",
      iconColor:"text-purple-500"
    },
    {
      title: "Agent Conversation",
      description: "Interact with the AI agent to brainstorm new content ideas",
      icon: Bot,
      iconBg:"bg-blue-100",
      iconColor:"text-blue-500"
    },
    
  ]
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-violet-500">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-col items-center justify-center gap-10 text-center mb-12">
            <h1 className="text-4xl font-bold md:text-6xl">
              Meet Your Personal{" "}
              <span className="text-pink-500">AI Content Agent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unleash the power of AI to generate content that matches your
              style and generates high-quality content quickly and efficiently.
            </p>

           
            <YoutubeVideoForm />
          </div>
        </div>
      </section>
      {/* Features section */}
      <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Features</h2>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">

        {features.map((feature, index) => {
          const Icon = feature.icon
          return(
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300">
              <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${feature.iconBg}`}>

              <Icon className={`w-6 h-6 ${feature.iconColor}`}/>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          )
        })}
        </div>
      </div>
      <div>
        {}
      </div>
      </section>
      {/* How it works section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Meet Your AI Content Agent in 3 simple steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return(
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white"/>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
          </div>
        </div>
      </section>
      {/* Footer section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-violet-500">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to take control of your content?
          </h2>
          <p className="text-xl text-blue-50">
            Join creators leveraging AI to unlock content insights
          </p>
        </div>
      </section>
    </div>
  );
}
