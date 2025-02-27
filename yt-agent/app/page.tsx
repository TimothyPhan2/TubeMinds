import CTABtn from "@/components/getStartedBtn";
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
      description: "Uncover content insights with advanced AI that identifies audience patterns and viral potential others miss.",
      icon: Brain,
      iconBg: "bg-blue-100",
      iconColor:"text-blue-500"
    },
    {
      title: "Smart Transcription",
      description: "Convert speech to polished text with precision—automatically formatted for captions, blogs, or social media.",
      icon: MessageCircle,
      iconBg:"bg-green-100",
      iconColor:"text-green-500"
    },
    {
      title: "Thumbnail Generation",
      description: "Create high-impact thumbnails that boost click rates—our AI designs custom, attention-grabbing visuals instantly.",
      icon: Images,
      iconBg:"bg-yellow-100",
      iconColor:"text-yellow-500"
    },
    {
      title: "Title Generation",
      description: "Develop SEO-optimized titles that rank higher and drive more views—based on trending patterns and engagement data.",
      icon: Pencil,
      iconBg:"bg-pink-100",
      iconColor:"text-pink-500"
    },
    {
      title: "Script Generation",
      description: "Convert concepts into compelling scripts with hooks, pacing cues, and emotional beats that keep viewers engaged.",
      icon: ScrollText,
      iconBg:"bg-purple-100",
      iconColor:"text-purple-500"
    },
    {
      title: "Agent Conversation",
      description: "Partner with an AI content strategist that understands your niche and audience to develop standout content ideas.",
      icon: Bot,
      iconBg:"bg-blue-100",
      iconColor:"text-blue-500"
    },
    
  ]

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center justify-center gap-10 text-center mb-12 relative z-10">
            <h1 className="text-4xl font-bold md:text-6xl text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">TubeMinds</span> - AI-Powered <br />
              YouTube Content Creation
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Unleash the power of AI to generate content that matches your
              style and generates high-quality content quickly and efficiently.
            </p>

           
            <YoutubeVideoForm />
          </div>
        </div>
      </section>
      {/* Features section */}
      <section className="py-20 section-depth relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Features</h2>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">

        {features.map((feature, index) => {
          const Icon = feature.icon
          return(
            <div key={index} className="card-dark p-6">
              <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${feature.iconBg}`}>

              <Icon className={`w-6 h-6 ${feature.iconColor}`}/>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
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
      <section className="py-20 section-depth relative shadow-section bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="shadow-overlay"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            How TubeMinds Works in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return(
              <div key={index} className="card-dark p-6 flex flex-col items-center text-center hover:border-purple-500/40">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-6 h-6 text-white"/>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            )
          })}
          </div>
        </div>
      </section>
      
      {/* Footer section */}
      <footer className="pt-20 pb-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          {/* CTA content */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">
            Elevate Your YouTube Presence with AI-Powered Intelligence
            </h2>
            <p className="text-xl text-white/80">
            From aspiring creator to content powerhouse — in just one click
            </p>
            <CTABtn />
          </div>
          
          {/* Bottom footer with copyright and links */}
          <div className="border-t border-white/10 my-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} TubeMinds. All rights reserved.
            </p>
          
          </div>
        </div>
      </footer>
    </div>
  );
}
