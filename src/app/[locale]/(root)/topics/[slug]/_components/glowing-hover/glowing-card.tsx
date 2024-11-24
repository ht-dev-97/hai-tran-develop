'use client'

import React, { useState } from 'react'

interface GlowingCardProps {
  glowColor: string
  title?: string
}

const GlowingCard = ({ glowColor, title }: GlowingCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div
      className="relative w-[320px] h-[400px] rounded-[20px] overflow-hidden bg-[rgba(45,45,45,1)] group"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute w-[700px] h-[700px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 30%, transparent 100%)`,
          top: mousePosition.y,
          left: mousePosition.x,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div className="absolute inset-[3px] rounded-[18px] bg-[rgba(45,45,45,0.85)] z-10">
        {title && (
          <h3
            style={{ color: glowColor }}
            className="text-xl font-semibold p-4"
          >
            {title}
          </h3>
        )}
      </div>
    </div>
  )
}

export default GlowingCard
