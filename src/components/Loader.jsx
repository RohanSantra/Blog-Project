import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-24 h-24 border-4 border-t-transparent border-white rounded-full animate-spin" />
        
        {/* Loading Text */}
        <p className="text-white text-xl font-semibold tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
