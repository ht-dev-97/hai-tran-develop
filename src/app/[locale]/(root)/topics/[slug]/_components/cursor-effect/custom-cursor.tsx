'use client'

import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.pageX}px`
        cursorRef.current.style.top = `${e.pageY}px`
      }
    }

    const isElementInCustomMenu = (element: Element | null): boolean => {
      if (!element) return false

      if (element.classList?.contains('custom-menu-area')) {
        return true
      }

      let parent = element.parentElement
      while (parent) {
        if (parent.classList?.contains('custom-menu-area')) {
          return true
        }
        parent = parent.parentElement
      }

      return false
    }

    const isCustomMenuItem = (element: Element | null): boolean => {
      if (!element) return false
      return element.matches?.('a.menu-item') || false
    }

    const handleMouseEnterMenu = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target && isElementInCustomMenu(target)) {
        setIsVisible(true)
      }
    }

    const handleMouseLeaveMenu = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as Element | null
      if (!relatedTarget || !isElementInCustomMenu(relatedTarget)) {
        setIsVisible(false)
        setIsHovering(false)
      }
    }

    const handleMouseOverLink = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target && isCustomMenuItem(target)) {
        setIsHovering(true)
      }
    }

    const handleMouseOutLink = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as Element | null
      if (!relatedTarget || !isCustomMenuItem(relatedTarget)) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnterMenu, true)
    document.addEventListener('mouseleave', handleMouseLeaveMenu, true)
    document.addEventListener('mouseover', handleMouseOverLink)
    document.addEventListener('mouseout', handleMouseOutLink)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnterMenu, true)
      document.removeEventListener('mouseleave', handleMouseLeaveMenu, true)
      document.removeEventListener('mouseover', handleMouseOverLink)
      document.removeEventListener('mouseout', handleMouseOutLink)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-5 h-5 bg-colorBrand-text-main rounded-full pointer-events-none mix-blend-difference transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
        !isVisible ? 'opacity-0' : 'opacity-100'
      } ${isHovering ? 'scale-[6]' : 'scale-100'}`}
    />
  )
}

export default CustomCursor
