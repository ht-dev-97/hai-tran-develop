import { Location, RouteData } from '@/types/map'

import { clientFetch } from '../utils/client-fetch'

const MAPBOX_TOKEN =
  process.env.MAPBOX_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  ''

export const searchPlaces = async (query: string): Promise<Location[]> => {
  if (!query.trim()) return []

  try {
    const response = await clientFetch.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_TOKEN}&limit=5`
    )

    if (response && response.data) {
      const data = JSON.parse(response.data)

      if (!data.features?.length) return []

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.features.map((feature: any) => ({
        longitude: feature.center[0],
        latitude: feature.center[1],
        name: feature.place_name
      }))
    }

    return []
  } catch (error) {
    console.error('Error searching locations:', error)
    return []
  }
}

export const getRouteDirections = async (
  start: Location,
  end: Location
): Promise<RouteData | null> => {
  try {
    const response = await clientFetch.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
    )

    if (response && response.data) {
      const data = response.data

      if (!data.routes?.length) return null

      return {
        type: 'Feature',
        properties: {},
        geometry: data.routes[0].geometry
      }
    }

    return null
  } catch (error) {
    console.error('Error getting route:', error)
    return null
  }
}
