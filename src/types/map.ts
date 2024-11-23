export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
}

export interface Location {
  longitude: number
  latitude: number
  name: string
}

export interface RouteData {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    coordinates: [number, number][]
    type: string
  }
}

export interface MapboxFeature {
  center: [number, number]
  place_name: string
}

export interface MapboxSearchResponse {
  features: MapboxFeature[]
}

export interface MapboxRouteResponse {
  routes: {
    geometry: {
      coordinates: [number, number][]
      type: string
    }
  }[]
}
