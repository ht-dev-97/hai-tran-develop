'use client'

import Image from 'next/image'
import type React from 'react'
import { useState } from 'react'

interface ImageWithPointProps {
  src: string
  alt: string
  width: number
  height: number
  point?: { x: number; y: number }
  onPointSelect?: (point: { x: number; y: number }) => void
  isSelectable?: boolean
}

const PositionShowPoint = ({
  src,
  alt,
  width,
  height,
  point,
  onPointSelect,
  isSelectable = false
}: ImageWithPointProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectable || !onPointSelect) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    onPointSelect({ x, y })
  }

  return (
    <div
      className="relative"
      style={{ width, height }}
      onClick={handleImageClick}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        onLoadingComplete={() => setImageLoaded(true)}
      />
      {imageLoaded && point && (
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        />
      )}
    </div>
  )
}

export default PositionShowPoint
