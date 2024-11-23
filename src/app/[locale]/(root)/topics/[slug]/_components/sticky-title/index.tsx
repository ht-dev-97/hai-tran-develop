'use client'

import { useEffect, useRef, useState } from 'react'

const StickyTitle = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    if (!container || !title) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const titleRect = title.getBoundingClientRect()

      if (containerRect.top <= 0 && containerRect.bottom > titleRect.height) {
        setIsSticky(true)
        title.style.cssText = `
          position: fixed;
          top: 0;
          left: ${containerRect.left}px;
          width: ${containerRect.width}px;
        `
      } else {
        setIsSticky(false)
        title.style.cssText = `
          position: static;
          top: auto;
          left: auto;
          width: auto;
        `
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <div className="mb-4">Scroll down to see the sticky effect</div>
      <div ref={containerRef} className="bg-gray-100 rounded-lg">
        <div
          ref={titleRef}
          className={`bg-white p-4 ${
            isSticky ? 'shadow-md' : ''
          } transition-shadow duration-300 ease-in-out`}
        >
          <h2 className="text-2xl font-bold">Sticky Title</h2>
        </div>
        <div className="h-[500px] w-full bg-black rounded-lg"></div>
      </div>
      <div className="h-[500px] w-full bg-green-500 rounded-lg"></div>
      <div className="h-[500px] w-full bg-orange-500 rounded-lg"></div>
    </div>
  )
}

export default StickyTitle
