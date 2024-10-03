"use client"

import React, { useState } from "react"
import { ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const list = [
  {
    id: "1",
    earning: "500,121.250",
    unit: "USDT",
  },
  {
    id: "2",
    earning: "500,121.250",
    unit: "Points",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("1")

  const currentItem = list.find((item) => item.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-fit justify-between px-2 py-1.5 "
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-end gap-2">
              <h2 className="text-xl">{currentItem?.earning}</h2>
              <span>{currentItem?.unit}</span>
            </div>
            <p>Estimated earnings</p>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  className={cn(value === item.id ? "bg-red-500" : "")}
                >
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-end gap-2">
                      <h2 className="text-xl">{item.earning}</h2>
                      <span>{item.unit}</span>
                    </div>
                    <p>Estimated earnings</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
