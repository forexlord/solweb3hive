import React from "react"

export default function Loading() {
  return (
    <div className="bg-[#0F0F10] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[450px] px-4 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#DCF331] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-white text-2xl font-bold mb-2">Loading...</h2>
        <p className="text-[#DCF331] text-center">Please wait while we prepare your experience</p>
      </div>
    </div>
  )
} 