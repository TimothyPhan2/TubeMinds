"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 left-0 right-0 px-4 md:px-0 backdrop-filter backdrop-blur-sm bg-opacity-0 border-b border-white/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center justify-between h-16">
            <Link href={"/"} className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="relative z-10 size-9"
                  fill="none"
                >
                  {/* Hexagon background */}
                  <path
                    d="M12 2L3 7.5V16.5L12 22L21 16.5V7.5L12 2Z"
                    stroke="url(#logo-gradient)"
                    strokeWidth="1.5"
                    fill="rgba(255,255,255,0.05)"
                  />

                  {/* Play button triangle */}
                  <path d="M15.5 12L9.5 8V16L15.5 12Z" fill="white" />

                  <defs>
                    <linearGradient
                      id="logo-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text group-hover:scale-105 transition-transform">
                TubeMinds
              </h1>
            </Link>
          </div>

          {/* right */}
          <div className="flex items-center gap-6 ">
            <SignedIn>
              <Link href={"/manage-plan"}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                  Manage Plan
                </Button>
              </Link>
              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button
                  className="relative inline-flex items-center justify-center px-8 py-3.5 font-medium text-white transition-all rounded-lg text-base overflow-hidden
          bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600
          shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40
          transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
