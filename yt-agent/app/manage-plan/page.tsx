
import React from 'react';

export default function CustomerPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Manage Your Plan</h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"></div>
        </div>

        {/* Current Plan Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-10 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            Current Plan
            {/* Skeleton loader for plan name */}
            <div className="ml-4 h-8 w-32 bg-white/10 animate-pulse rounded-md"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Plan Details Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-24 bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-8 w-32 bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-6 w-full bg-white/10 animate-pulse rounded-md"></div>
            </div>
            
            {/* Usage Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-36 bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-8 w-full bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-6 w-3/4 bg-white/10 animate-pulse rounded-md"></div>
            </div>
            
            {/* Next Billing Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-40 bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-8 w-32 bg-white/10 animate-pulse rounded-md"></div>
              <div className="h-6 w-4/5 bg-white/10 animate-pulse rounded-md"></div>
            </div>
          </div>
          
          {/* Skeleton for action button */}
          <div className="mt-6 flex justify-end">
            <div className="h-10 w-36 bg-white/10 animate-pulse rounded-lg"></div>
          </div>
        </div>
        
       
        
    
      </div>
    </div>
  );
}
