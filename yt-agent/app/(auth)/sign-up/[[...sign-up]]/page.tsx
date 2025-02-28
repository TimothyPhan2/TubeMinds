"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 px-4">
      <div className="w-full max-w-md">
        <SignUp.Root>
          <SignUp.Step
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
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Create your TubeMinds account
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Supercharge your content creation with AI
              </p>
            </header>

            <Clerk.GlobalError className="block text-sm text-red-400" />

            <Clerk.Field name="emailAddress">
              <Clerk.Label className="block text-sm font-medium text-white/80 mb-1">
                Email
              </Clerk.Label>
              <Clerk.Input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all data-[invalid]:border-red-400 data-[invalid]:text-red-400"
              />
              <Clerk.FieldError className="mt-1 block text-xs text-red-400" />
            </Clerk.Field>

            <Clerk.Field name="password">
              <Clerk.Label className="block text-sm font-medium text-white/80 mb-1">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                placeholder="Create a password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all data-[invalid]:border-red-400 data-[invalid]:text-red-400"
              />
              <Clerk.FieldError className="mt-1 block text-xs text-red-400" />
            </Clerk.Field>

            <SignUp.Action
              submit
              className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 py-2.5 px-4 text-sm font-medium text-white shadow-md shadow-purple-500/20 hover:opacity-90 active:opacity-80 transition-all outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-1"
            >
              Sign Up
            </SignUp.Action>
            

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
              Already have an account?{" "}
              <Clerk.Link
                navigate="sign-in"
                className="text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
              >
                Sign in
              </Clerk.Link>
            </p>

            <div className="pt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-xs text-white/50 hover:text-white/70 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Home
              </Link>
            </div>
          </SignUp.Step>
          <SignUp.Step
            name="verifications"
            className="w-full space-y-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-purple-500/5"
          >
            <SignUp.Strategy name="email_code">
              <header className="text-center">
                <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#verify-gradient)"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                    <defs>
                      <linearGradient
                        id="verify-gradient"
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
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
                  Verify your email
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  Enter the code sent to your email
                </p>
              </header>
              <Clerk.GlobalError className="block text-sm text-red-400" />
              <Clerk.Field name="code">
                <Clerk.Label className="block text-sm font-medium text-white/80 mb-1">
                  Verification Code
                </Clerk.Label>
                <Clerk.Input
                  type="otp"
                  className="flex justify-center has-[:disabled]:opacity-50"
                  autoSubmit
                  render={({ value, status }) => {
                    return (
                      <div
                        data-status={status}
                        className={cn(
                          "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                          {
                            "z-10 ring-2 ring-ring ring-offset-background":
                              status === "cursor" || status === "selected",
                          }
                        )}
                      >
                        {value}
                        {status === "cursor" && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                <Clerk.FieldError className="mt-1 block text-xs text-red-400" />
              </Clerk.Field>
              <SignUp.Action
                submit
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 py-2.5 px-4 text-sm font-medium text-white shadow-md shadow-purple-500/20 hover:opacity-90 active:opacity-80 transition-all outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-1"
              >
                Verify & Continue
              </SignUp.Action>
              <div className="mt-4 text-center">
                <SignUp.Action
                  asChild
                  resend
                  fallback={({ resendableAfter }) => (
                    <Button 
                      variant="link" 
                      size="sm" 
                      disabled
                      className="text-white/40"
                    >
                      Didn&apos;t receive a code? Resend (
                      <span className="tabular-nums">{resendableAfter}</span>s)
                    </Button>
                  )}
                >
                  <Button 
                    variant="link" 
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Didn&apos;t receive a code? Resend
                  </Button>
                </SignUp.Action>
              </div>

              <div className="pt-4 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-xs text-white/50 hover:text-white/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  );
}
