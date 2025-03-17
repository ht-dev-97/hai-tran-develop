'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useMapStore } from '@/stores'
import { Location } from '@/types'
import { Check, MapPin, Navigation } from 'lucide-react'
import { useCallback, useState } from 'react'

interface LocationSearchProps {
  label: string
  value: string
  onChange?: (value: string) => void
  onCenter?: () => void
  onSelect?: (location: Location) => void
  isReadOnly?: boolean
  placeholder?: string
}

export function LocationSearch({
  label,
  value,
  onChange,
  onCenter,
  onSelect,
  isReadOnly,
  placeholder
}: LocationSearchProps) {
  const [open, setOpen] = useState(false)
  const {
    searchLocations,
    searchResults,
    isLoading: isSearching
  } = useMapStore()

  const handleSearch = useCallback(
    async (search: string) => {
      if (isReadOnly) return

      onChange?.(search)

      if (!search.trim()) return

      await searchLocations(search)
    },
    [isReadOnly, onChange, searchLocations]
  )

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open && !isReadOnly} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {value || placeholder || 'Search location...'}
            </span>
            {isReadOnly ? (
              <Button
                size="icon"
                variant="ghost"
                className="ml-2 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onCenter?.()
                }}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            ) : (
              <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        {!isReadOnly && (
          <PopoverContent className="w-[300px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                value={value}
                onValueChange={handleSearch}
                placeholder="Search location..."
              />
              {isSearching && <div className="text-center">Loading...</div>}
              <CommandList className="bg-colorBrand-bg-box">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {searchResults.map((location) => (
                    <CommandItem
                      key={`${location.latitude}-${location.longitude}`}
                      value={location.name}
                      onSelect={() => {
                        handleSearch(location.name)
                        onSelect?.(location)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === location.name ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {location.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}
