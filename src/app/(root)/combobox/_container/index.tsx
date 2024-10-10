import React from "react"
import { ComboboxDemo } from "../_components/combobox-demo"
import TooltipDemo from "../_components/tooltip-demo"

const ComboboxContainer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <ComboboxDemo />
      <TooltipDemo />
    </div>
  )
}

export default ComboboxContainer
