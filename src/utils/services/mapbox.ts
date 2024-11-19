import { Location, RouteData } from '@/types'

const MAPBOX_TOKEN =
  process.env.MAPBOX_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  ''

export async function searchPlaces(query: string): Promise<Location[]> {
  if (!query.trim()) return []

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_TOKEN}&limit=5`
    )
    const data = await response.json()

    if (!data.features?.length) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.features.map((feature: any) => ({
      longitude: feature.center[0],
      latitude: feature.center[1],
      name: feature.place_name
    }))
  } catch (error) {
    console.error('Error searching locations:', error)
    return []
  }
}

export async function getRouteDirections(
  start: Location,
  end: Location
): Promise<RouteData | null> {
  try {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
    )
    const data = await response.json()

    if (!data.routes?.length) return null

    return {
      type: 'Feature',
      properties: {},
      geometry: data.routes[0].geometry
    }
  } catch (error) {
    console.error('Error getting route:', error)
    return null
  }
}
