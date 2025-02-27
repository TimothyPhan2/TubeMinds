"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">

        {/* left */}
        <div className="flex items-center justify-between h-16">
          <Link href={"/"}>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              AgentTube
            </h1>
          </Link>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href={"/manage-plan"}>
              <Button>Manage Plan</Button>
            </Link>
            <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
                <Button variant={"ghost"} className="">
                    Sign in
                </Button>
            </SignInButton>
          </SignedOut>
        </div>
        </div>
      </div>
    </header>
  );
}
