
import SchematicComponent from '@/components/schematic/SchematicComponent';
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

        <SchematicComponent componentId="cmpn_5BvX76heg6q" />
       
        
    
      </div>
    </div>
  );
}
