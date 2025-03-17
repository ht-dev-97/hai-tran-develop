import { MAPBOX_CONFIG } from '@/configs/mapbox/mapbox.config'
import { Location, MapboxFeature } from '@/types'

export const validateMapboxToken = (): void => {
  if (!MAPBOX_CONFIG.ACCESS_TOKEN) {
    throw new Error('Mapbox access token is not configured')
  }
}

export const buildMapboxUrl = (
  endpoint: string,
  params: Record<string, string>
): string => {
  const searchParams = new URLSearchParams({
    ...params,
    access_token: MAPBOX_CONFIG.ACCESS_TOKEN
  })
  return `${MAPBOX_CONFIG.BASE_URL}${endpoint}?${searchParams.toString()}`
}

export const transformFeatureToLocation = (
  feature: MapboxFeature
): Location => ({
  longitude: feature.center[0],
  latitude: feature.center[1],
  name: feature.place_name
})
