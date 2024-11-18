import React from 'react'

const AutoScrollText = () => {
  return (
    <div className="overflow-hidden relative h-16 border-t border-b">
      <div className="absolute top-0 bottom-0 flex items-center pl-[100px] animate-auto-scroll-text opacity-0">
        <span className="text-3xl tracking-[0.1em] uppercase text-black whitespace-nowrap">
          We bring you the best products
        </span>
      </div>
      <div className="absolute top-0 bottom-0 flex items-center pl-[100px] animate-auto-scroll-text2 opacity-0">
        <span className="text-3xl tracking-[0.1em] uppercase text-black whitespace-nowrap">
          We bring you the best products
        </span>
      </div>
    </div>
  )
}

export default AutoScrollText
