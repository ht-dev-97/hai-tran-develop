'use client'

import { LocateFixed, MapPin } from 'lucide-react'

interface LocationMarkerProps {
  type: 'current' | 'destination'
}

export function LocationMarker({ type }: LocationMarkerProps) {
  const bgColor = type === 'current' ? 'bg-green-500' : 'bg-red-500'
  const Icon = type === 'current' ? LocateFixed : MapPin

  return (
    <div className="relative">
      <div
        className={`w-6 h-6 ${bgColor} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}
      >
        <Icon className="h-4 w-4 text-white" />
      </div>
    </div>
  )
}
