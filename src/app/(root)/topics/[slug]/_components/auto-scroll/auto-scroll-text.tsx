import React from 'react'

const AutoScrollText = () => {
  return (
    <div className='overflow-hidden relative h-16 border-t border-b'>
      <div className='text-3xl tracking-[0.1em] uppercase text-black whitespace-nowrap absolute top-1/2 -translate-y-1/2 pl-[150px] animate-auto-scroll-text opacity-0'>
        We bring you the best products
      </div>
      <div className='text-3xl tracking-[0.1em] uppercase text-black whitespace-nowrap absolute top-1/2 -translate-y-1/2 pl-[150px] animate-auto-scroll-text2 opacity-0'>
        We bring you the best products
      </div>
    </div>
  )
}

export default AutoScrollText
