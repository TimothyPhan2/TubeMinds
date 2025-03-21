import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// protected routes

// const isProtectedRoute = createRouteMatcher(["/video(.*)"]);


const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/'
])
export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    // if (!isPublicRoute(req)) {
    //   await auth.protect()
    // }

    if (!userId && !isPublicRoute(req)) {
        return redirectToSignIn( {returnBackUrl: req.url});
    }

    if (userId && !isPublicRoute(req)) {
      return NextResponse.next()
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};