import React from 'react'

import { LocationSearchType } from '../../_types'
import { LocationSearch } from './location-search'
import { Map } from './map'

const LOCATIONS_SEARCH: LocationSearchType[] = [
  {
    type: 'from',
    label: 'From'
  },
  {
    type: 'to',
    label: 'To'
  }
]

const MapBox = () => {
  return (
    <div className="flex min-h-[400px] gap-4">
      <div className="w-1/3 space-y-4 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Location</h1>
        {LOCATIONS_SEARCH.map((location) => (
          <LocationSearch
            key={location.type}
            type={location.type}
            label={location.label}
          />
        ))}
      </div>
      <div className="w-2/3 bg-white rounded-lg shadow">
        <Map />
      </div>
    </div>
  )
}

export default MapBox
