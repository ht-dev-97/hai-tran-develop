'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 500)
    }

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-dot pointer-events-none fixed z-[999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform duration-200
          ${isClicked ? 'animate-expand border-primary' : 'animate-cursor border-orange-500'}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className="cursor-dot-outline pointer-events-none fixed z-[999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-primary/50 animate-cursor-outer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  )
}
