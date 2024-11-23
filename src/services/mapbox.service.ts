import { MAPBOX_CONFIG } from '@/configs/mapbox/mapbox.config'

import type {
  Location,
  MapboxRouteResponse,
  MapboxSearchResponse,
  RouteData
} from '../types/map'
import { clientFetch } from '../utils/client-fetch'
import {
  buildMapboxUrl,
  transformFeatureToLocation,
  validateMapboxToken
} from '../utils/mapbox.utils'

export const searchPlaces = async (query: string): Promise<Location[]> => {
  if (!query.trim()) return []

  try {
    validateMapboxToken()

    const url = buildMapboxUrl(
      `${MAPBOX_CONFIG.ENDPOINTS.GEOCODING}/${encodeURIComponent(query)}.json`,
      { limit: MAPBOX_CONFIG.DEFAULTS.SEARCH_LIMIT.toString() }
    )

    const response = await clientFetch.get(url)

    if (!response?.data) return []

    const data: MapboxSearchResponse =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data

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

    const response = await clientFetch.get(url)

    if (!response?.data) return null

    const data: MapboxRouteResponse = response.data

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
