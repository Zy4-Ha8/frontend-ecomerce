import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-linear-to-br from-[#f8faf6] to-[#e8f0e0]">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#3a5b2220]"></div>
        
        {/* Inner spinning ring with gradient */}
        <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-[#3a5b22] border-r-[#3a5b22]"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#3a5b22] rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-6 flex justify-center items-center gap-1">
        <span className="text-[#3a5b22] font-semibold text-lg">Loading</span>
        <span className="flex mt-[7px]  gap-1">
          <span className="w-1 h-1 bg-[#3a5b22] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-1 h-1 bg-[#3a5b22] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-1 h-1 bg-[#3a5b22] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </span>
      </div>
    </div>
  );
}

export default LoadingSpinner;