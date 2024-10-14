import React from "react"
import AutoScrollDemo from "../_components/auto-scroll-demo"
import AutoScrollText from "../_components/auto-scroll-text"

const AutoScrollContainer = () => {
  return (
    <div className="flex flex-col gap-10">
      <AutoScrollDemo />
      <AutoScrollText />
    </div>
  )
}

export default AutoScrollContainer
