export const MAPBOX_CONFIG = {
  BASE_URL: 'https://api.mapbox.com',
  ACCESS_TOKEN:
    process.env.MAPBOX_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    '',
  ENDPOINTS: {
    GEOCODING: '/geocoding/v5/mapbox.places',
    DIRECTIONS: '/directions/v5/mapbox/driving'
  },
  DEFAULTS: {
    SEARCH_LIMIT: 5
  }
} as const
