'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 px-4">
      <div className="w-full max-w-md">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="w-full space-y-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-purple-500/5"
          >
            <header className="text-center">
              <div className="relative mx-auto w-16 h-16">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="relative z-10 size-16"
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
                  <path
                    d="M15.5 12L9.5 8V16L15.5 12Z"
                    fill="white"
                  />
                  
                  <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Sign in to TubeMinds
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Your AI-powered YouTube content assistant
              </p>
            </header>
            
            <Clerk.GlobalError className="block text-sm text-red-400" />
            
            <Clerk.Field name="identifier">
              <Clerk.Label className="block text-sm font-medium text-white/80 mb-1">Email</Clerk.Label>
              <Clerk.Input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all data-[invalid]:border-red-400 data-[invalid]:text-red-400"
              />
              <Clerk.FieldError className="mt-1 block text-xs text-red-400" />
            </Clerk.Field>
            
            <SignIn.Action
              submit
              className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 py-2.5 px-4 text-sm font-medium text-white shadow-md shadow-purple-500/20 hover:opacity-90 active:opacity-80 transition-all outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-1"
            >
              Sign In
            </SignIn.Action>
            
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <p className="mb-4 text-center text-sm text-white/60">
                Or continue with
              </p>
              <div className="space-y-2">
                <Clerk.Connection
                  name="google"
                  className="flex w-full items-center justify-center gap-x-3 rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 active:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="size-4"
                  >
                    <g clipPath="url(#a)">
                      <path
                        fill="currentColor"
                        d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h16v16H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  Google
                </Clerk.Connection>
              </div>
            </div>
            
            <p className="text-center text-sm text-white/60">
              Don&apos;t have an account?{' '}
              <Clerk.Link
                navigate="sign-up"
                className="text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
              >
                Sign up
              </Clerk.Link>
            </p>
            
            <div className="pt-4 text-center">
              <Link 
                href="/"
                className="inline-flex items-center text-xs text-white/50 hover:text-white/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Home
              </Link>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  )
}