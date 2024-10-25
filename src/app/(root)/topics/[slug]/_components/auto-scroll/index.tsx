import React from 'react'
import AutoScrollDemo from './auto-scroll-demo'
import AutoScrollText from './auto-scroll-text'

const AutoScroll = () => {
  return (
    <div className='flex flex-col gap-10'>
      <AutoScrollDemo />
      <AutoScrollText />
    </div>
  )
}

export default AutoScroll
