'use client'

import { useState } from 'react'

import PositionClickPoint from './position-click-point'
import PositionShowPoint from './position-show-point'

const PositionPoint = () => {
  const [point, setPoint] = useState<{ x: number; y: number } | undefined>()

  const handlePointSelect = (newPoint: { x: number; y: number }) => {
    setPoint(newPoint)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Point Selector</h1>
      <div className="flex items-center gap-10">
        <div>
          <h2 className="text-xl mb-2">Small Image</h2>
          <PositionShowPoint
            src="/assets/images/open-graph-thumbnail.jpg"
            alt="Example Image"
            width={300}
            height={200}
            point={point}
          />
        </div>
        <div>
          <h2 className="text-xl mb-2">Large Image in Dialog</h2>
          <PositionClickPoint
            src="/assets/images/open-graph-thumbnail.jpg"
            alt="Example Image"
            point={point || { x: 0, y: 0 }}
            onPointSelect={handlePointSelect}
          />
        </div>
      </div>
      {point && (
        <p className="mt-4">
          Selected point: x: {point.x.toFixed(2)}%, y: {point.y.toFixed(2)}%
        </p>
      )}
    </div>
  )
}

export default PositionPoint
