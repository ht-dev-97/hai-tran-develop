import React from "react"
import AutoScrollDemo from "./auto-scroll-demo"
import AutoScrollText from "./auto-scroll-text"
import AutoScrollImage from "./auto-scroll-image"

const AutoScroll = () => {
  return (
    <div className="flex flex-col gap-16">
      <AutoScrollDemo />
      <AutoScrollText />
      <AutoScrollImage />
    </div>
  )
}

export default AutoScroll
