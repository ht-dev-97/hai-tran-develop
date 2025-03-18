'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MAPBOX_CONFIG } from '@/configs/mapbox/mapbox.config'
import { MAP_CONSTANTS } from '@/constants'
import { useCustomToast } from '@/hooks'
import { useMapStore } from '@/stores'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import Map, { Layer, Marker, Source } from 'react-map-gl'

import { LocationMarker } from './location-marker'
import { LocationSearch } from './location-search'

const MapComponent = () => {
  const {
    viewState,
    currentLocation,
    destinationLocation,
    routeData,
    searchQuery,
    error,
    setViewState,
    setSearchQuery,
    setDestinationLocation,
    searchDestination,
    centerOnLocation,
    getCurrentLocation
  } = useMapStore()

  const toast = useCustomToast()

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  useEffect(() => {
    if (error) {
      toast.custom.success({
        title: 'Success!',
        description: 'Successfully detected location.'
      })
    }
  }, [error])

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
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_CONFIG.ACCESS_TOKEN}
        >
          {currentLocation && (
            <Marker
              longitude={currentLocation.longitude}
              latitude={currentLocation.latitude}
              anchor="bottom"
            >
              <LocationMarker
                type="current"
                size="md"
                className="cursor-pointer"
              />
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
              <Layer {...MAP_CONSTANTS.ROUTE_LAYER} />
            </Source>
          )}
        </Map>
      </div>
    </div>
  )
}

export default MapComponent
