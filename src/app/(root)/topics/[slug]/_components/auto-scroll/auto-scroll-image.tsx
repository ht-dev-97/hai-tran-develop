import Image from "next/image"
import React from "react"

const AutoScrollImage = () => {
  return (
    <div className="flex items-center gap-4 overflow-hidden group">
      <div className="animate-loop-scroll flex items-center gap-4 group-hover:paused">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="w-[200px] h-[130px]" key={index}>
            <Image
              src="/assets/images/nike-logo.jpg"
              alt="Nike"
              width={200}
              height={130}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
      <div
        className="animate-loop-scroll flex items-center gap-4 group-hover:paused"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="w-[200px] h-[130px]" key={index}>
            <Image
              src="/assets/images/nike-logo.jpg"
              alt="Nike"
              width={200}
              height={130}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoScrollImage
