export interface Location {
  longitude: number
  latitude: number
  name: string
}

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
}

export interface RouteData {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
}
