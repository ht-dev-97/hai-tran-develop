import { MAPBOX_CONFIG } from '@/configs/mapbox/mapbox.config'
import type {
  Location,
  MapboxRouteResponse,
  MapboxSearchResponse,
  RouteData
} from '@/types'
import { serverFetch } from '@/utils/http'
import {
  buildMapboxUrl,
  transformFeatureToLocation,
  validateMapboxToken
} from '@/utils/mapbox'

export const searchPlaces = async (query: string): Promise<Location[]> => {
  if (!query.trim()) return []

  try {
    validateMapboxToken()

    const url = buildMapboxUrl(
      `${MAPBOX_CONFIG.ENDPOINTS.GEOCODING}/${encodeURIComponent(query)}.json`,
      { limit: MAPBOX_CONFIG.DEFAULTS.SEARCH_LIMIT.toString() }
    )

    const data = await serverFetch.get<MapboxSearchResponse>(url, {}, false)

    if (!data) return []

    return data.features?.map(transformFeatureToLocation) || []
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
    validateMapboxToken()

    const coordinates = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`
    const url = buildMapboxUrl(
      `${MAPBOX_CONFIG.ENDPOINTS.DIRECTIONS}/${coordinates}`,
      { geometries: 'geojson' }
    )

    const data = await serverFetch.get<MapboxRouteResponse>(url, {}, false)

    if (!data) return null

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
