"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABtn() {
  return (
    <Link href={"/sign-up"} className="inline-block mt-6 group">
      <button 
        className="relative inline-flex items-center justify-center px-8 py-3.5 font-medium text-white transition-all rounded-lg text-base overflow-hidden
          bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600
          shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40
          transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Get Started
        <ArrowRight className="ml-2 size-5 transform group-hover:translate-x-1 transition-transform"/>
        <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
      </button>
    </Link>
  );
}
