'use client'

import { cn } from '@/lib/utils'
import { LocateFixed, MapPin } from 'lucide-react'

interface LocationMarkerProps {
  type: 'current' | 'destination'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MARKER_VARIANTS = {
  current: {
    icon: LocateFixed,
    className: 'bg-emerald-500 hover:bg-emerald-600'
  },
  destination: {
    icon: MapPin,
    className: 'bg-red-500 hover:bg-red-600'
  }
} as const

const MARKER_SIZES = {
  sm: {
    wrapper: 'w-5 h-5',
    icon: 'h-3 w-3'
  },
  md: {
    wrapper: 'w-6 h-6',
    icon: 'h-4 w-4'
  },
  lg: {
    wrapper: 'w-8 h-8',
    icon: 'h-5 w-5'
  }
} as const

export function LocationMarker({
  type,
  size = 'md',
  className
}: LocationMarkerProps) {
  const { icon: Icon, className: variantClass } = MARKER_VARIANTS[type]
  const { wrapper: wrapperSize, icon: iconSize } = MARKER_SIZES[size]

  return (
    <div className="relative group">
      <div
        className={cn(
          wrapperSize,
          variantClass,
          'rounded-full border-2 border-white shadow-lg',
          'flex items-center justify-center transition-all duration-200',
          'transform hover:scale-110',
          className
        )}
      >
        <Icon className={cn(iconSize, 'text-white')} />
      </div>
      <div
        className={cn(
          'absolute -bottom-1 left-1/2 w-1 h-4',
          'transform -translate-x-1/2 translate-y-full',
          variantClass,
          'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        )}
      />
    </div>
  )
}
