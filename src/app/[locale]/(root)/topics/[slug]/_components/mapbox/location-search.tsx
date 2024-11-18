import React from "react"
import { Input } from "@/components/ui/input"

import {
  AddressAutofill,
  AddressAutofillRetrieveResponse,
} from "@mapbox/search-js-react"
import { useLocationStore } from "@/stores"

interface LocationSearchProps {
  type: "from" | "to"
  label: string
}

export function LocationSearch({ type, label }: LocationSearchProps) {
  const { setFromLocation, setToLocation } = useLocationStore()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (response: any) => {
    if (response.features && response.features.length > 0) {
      const feature = response.features[0]
      if (feature.geometry && Array.isArray(feature.geometry.coordinates)) {
        const coords: [number, number] = [
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
        ]

        if (type === "from") {
          setFromLocation(coords)
        } else {
          setToLocation(coords)
        }
      }
    }
  }

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <AddressAutofill
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        onRetrieve={handleSelect}
        options={{
          country: "VN",
          language: "vi",
        }}
      >
        <Input
          placeholder="Enter location"
          className="w-full"
          autoComplete="street-address"
        />
      </AddressAutofill>
    </div>
  )
}
