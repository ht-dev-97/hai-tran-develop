'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMapStore } from '@/stores'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import Map, { Layer, LayerProps, Marker, Source } from 'react-map-gl'

import { LocationMarker } from './location-marker'
import { LocationSearch } from './location-search'

const MAPBOX_TOKEN =
  process.env.MAPBOX_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  ''

const routeLayer: LayerProps = {
  id: 'route',
  type: 'line',
  paint: {
    'line-color': '#F09319',
    'line-width': 5,
    'line-opacity': 0.75
  }
}

export default function MapComponent() {
  const {
    viewState,
    currentLocation,
    destinationLocation,
    routeData,
    searchQuery,
    setViewState,
    setSearchQuery,
    setDestinationLocation,
    searchDestination,
    centerOnLocation,
    getCurrentLocation
  } = useMapStore()

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  console.log('MAPBOX_TOKEN', MAPBOX_TOKEN)

  return (
    <div className="flex gap-4 min-h-[400px]">
      <Card className="w-1/3 space-y-4 p-4 rounded-lg shadow">
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <LocationSearch
              label="Current Location"
              value={currentLocation?.name || 'Detecting location...'}
              isReadOnly
              onCenter={() =>
                currentLocation && centerOnLocation(currentLocation)
              }
            />
            <LocationSearch
              label="Destination"
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={(location) => {
                setDestinationLocation(location)
                searchDestination()
              }}
              placeholder="Search destination..."
            />
          </div>
        </CardContent>
      </Card>
      <div className="w-2/3 bg-white rounded-lg shadow">
        <Map
          {...viewState}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onMove={(evt: any) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {currentLocation && (
            <Marker
              longitude={currentLocation.longitude}
              latitude={currentLocation.latitude}
              anchor="bottom"
            >
              <LocationMarker type="current" />
            </Marker>
          )}

          {destinationLocation && (
            <Marker
              longitude={destinationLocation.longitude}
              latitude={destinationLocation.latitude}
              anchor="bottom"
            >
              <LocationMarker type="destination" />
            </Marker>
          )}

          {routeData && (
            <Source type="geojson" data={routeData}>
              <Layer {...routeLayer} />
            </Source>
          )}
        </Map>
      </div>
    </div>
  )
}
