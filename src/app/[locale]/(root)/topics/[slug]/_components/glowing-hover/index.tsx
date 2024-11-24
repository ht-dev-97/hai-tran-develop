'use client'

import React from 'react'

import { GLOWING_CARDS } from '../../_constant'
import GlowingCard from './glowing-card'

const GlowingHover = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        {GLOWING_CARDS.map((card) => (
          <GlowingCard
            key={card.id}
            glowColor={card.glowColor}
            title={card.title}
          />
        ))}
      </div>
    </div>
  )
}

export default GlowingHover
