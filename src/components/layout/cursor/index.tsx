'use client'

import React, { useEffect, useRef } from 'react'

interface ExtendedHTMLDivElement extends HTMLDivElement {
  x: number
  y: number
}

const CursorEffect = () => {
  const cursorRefs = useRef<ExtendedHTMLDivElement[]>([])

  useEffect(() => {
    const coords = { x: 0, y: 0 }
    const circles = cursorRefs.current

    const colors = [
      '#ffb56b',
      '#fdaf69',
      '#f89d63',
      '#f59761',
      '#ef865e',
      '#ec805d',
      '#e36e5c',
      '#df685c',
      '#d5585c',
      '#d1525c',
      '#c5415d',
      '#c03b5d',
      '#b22c5e',
      '#ac265e',
      '#9c155f',
      '#950f5f',
      '#830060',
      '#7c0060',
      '#680060',
      '#60005f',
      '#48005f',
      '#3d005e'
    ]

    circles.forEach((circle, index) => {
      circle.style.backgroundColor = colors[index % colors.length]
      circle.x = 0
      circle.y = 0
    })

    const handleMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX
      coords.y = e.clientY
    }

    const animateCircles = () => {
      let x = coords.x
      let y = coords.y

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`
        circle.style.top = `${y - 12}px`

        circle.style.transform = `scale(${
          (circles.length - index) / circles.length
        })`

        circle.x = x
        circle.y = y

        const nextCircle = circles[index + 1] || circles[0]
        x += (nextCircle.x - x) * 0.3
        y += (nextCircle.y - y) * 0.3
      })

      requestAnimationFrame(animateCircles)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateCircles()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          ref={(el) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            el && (cursorRefs.current[index] = el as any)
          }
          className="fixed top-0 left-0 h-6 w-6 pointer-events-none rounded-full z-[99999]"
        />
      ))}
    </>
  )
}

export default CursorEffect
