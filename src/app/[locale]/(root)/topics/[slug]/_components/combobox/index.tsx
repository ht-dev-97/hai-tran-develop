import React from 'react'

import { ComboboxDemo } from './combobox-demo'
import TooltipDemo from './tooltip-demo'

const Combobox = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <ComboboxDemo />
      <TooltipDemo />
    </div>
  )
}

export default Combobox
