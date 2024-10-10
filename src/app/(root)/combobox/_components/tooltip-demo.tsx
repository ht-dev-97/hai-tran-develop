"use client"

import React, { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const TooltipDemo = () => {
  const [open, setOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn("cursor-pointer")}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)}
            onKeyDown={(e) => {
              e.preventDefault()
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              e.key === "Enter" && setOpen(!open)
            }}
          >
            Hover
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipDemo
