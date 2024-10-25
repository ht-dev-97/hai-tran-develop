"use client"

import React from "react"

const AutoScrollDemo = () => {
  return (
    <div className="bg-gray-200 w-2/3 overflow-hidden flex items-center px-5 mx-auto">
      <div className="flex items-center gap-4 w-[calc(160px*10)] animate-auto-scroll">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-40 h-40 bg-black flex items-center justify-center"
          >
            <span className="text-white text-2xl font-bold">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoScrollDemo
