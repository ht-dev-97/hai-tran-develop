import { getRouteDirections } from '@/services/mapbox'
import { Location, RouteData, ViewState } from '@/types/map'
import { create } from 'zustand'

interface MapState {
  viewState: ViewState
  currentLocation: Location | null
  destinationLocation: Location | null
  routeData: RouteData | null
  searchQuery: string
  isLoading: boolean
  setViewState: (viewState: ViewState) => void
  setCurrentLocation: (location: Location | null) => void
  setDestinationLocation: (location: Location | null) => void
  setSearchQuery: (query: string) => void
  searchDestination: () => Promise<void>
  centerOnLocation: (location: Location) => void
  getCurrentLocation: () => void
}

const DEFAULT_VIEW_STATE: ViewState = {
  longitude: -73.935242,
  latitude: 40.73061,
  zoom: 12
}

export const useMapStore = create<MapState>((set, get) => ({
  viewState: DEFAULT_VIEW_STATE,
  currentLocation: null,
  destinationLocation: null,
  routeData: null,
  searchQuery: '',
  isLoading: false,

  setViewState: (viewState) => set({ viewState }),

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setDestinationLocation: (location) =>
    set({
      destinationLocation: location,
      searchQuery: location?.name || ''
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  searchDestination: async () => {
    const { currentLocation, destinationLocation } = get()
    if (!currentLocation || !destinationLocation) return

    set({ isLoading: true })
    try {
      const route = await getRouteDirections(
        currentLocation,
        destinationLocation
      )
      set({ routeData: route })
    } finally {
      set({ isLoading: false })
    }
  },

  centerOnLocation: (location) => {
    set({
      viewState: {
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: 14
      }
    })
  },

  getCurrentLocation: () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        const location = {
          longitude,
          latitude,
          name: 'Current location'
        }
        set({
          currentLocation: location,
          viewState: {
            ...get().viewState,
            longitude,
            latitude
          }
        })
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }
}))
