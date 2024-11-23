import { MAP_CONSTANTS } from '@/constants'
import { getRouteDirections, searchPlaces } from '@/services/mapbox.service'
import type { Location, RouteData, ViewState } from '@/types/map'
import { create } from 'zustand'

interface MapState {
  viewState: ViewState
  currentLocation: Location | null
  destinationLocation: Location | null
  routeData: RouteData | null
  searchQuery: string
  searchResults: Location[]
  isLoading: boolean
  error: Error | null
}

interface MapActions {
  setViewState: (viewState: ViewState) => void
  setCurrentLocation: (location: Location | null) => void
  setDestinationLocation: (location: Location | null) => void
  setSearchQuery: (query: string) => void
  searchLocations: (query: string) => Promise<void>
  searchDestination: () => Promise<void>
  centerOnLocation: (location: Location) => void
  getCurrentLocation: () => void
  resetError: () => void
  reset: () => void
}

type MapStore = MapState & MapActions

const initialState: MapState = {
  viewState: MAP_CONSTANTS.DEFAULT_VIEW_STATE,
  currentLocation: null,
  destinationLocation: null,
  routeData: null,
  searchQuery: '',
  searchResults: [],
  isLoading: false,
  error: null
}

export const useMapStore = create<MapStore>((set, get) => ({
  ...initialState,

  setViewState: (viewState) => set({ viewState }),

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setDestinationLocation: (location) =>
    set({
      destinationLocation: location,
      searchQuery: location?.name || '',
      searchResults: []
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  searchLocations: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], error: null })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const locations = await searchPlaces(query)
      set({ searchResults: locations })
    } catch (err) {
      set({
        error:
          err instanceof Error ? err : new Error('Failed to search locations'),
        searchResults: []
      })
    } finally {
      set({ isLoading: false })
    }
  },

  searchDestination: async () => {
    const { currentLocation, destinationLocation } = get()

    if (!currentLocation || !destinationLocation) {
      set({
        error: new Error('Both current and destination locations are required')
      })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const route = await getRouteDirections(
        currentLocation,
        destinationLocation
      )
      set({
        routeData: route,
        error: route ? null : new Error('No route found')
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error('Failed to get route'),
        routeData: null
      })
    } finally {
      set({ isLoading: false })
    }
  },

  centerOnLocation: (location) => {
    set({
      viewState: {
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: MAP_CONSTANTS.DEFAULT_ZOOM.LOCATION
      }
    })
  },

  getCurrentLocation: () => {
    if (!navigator.geolocation) {
      set({ error: new Error('Geolocation is not supported by your browser') })
      return
    }

    set({ isLoading: true, error: null })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        const location: Location = {
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
          },
          isLoading: false
        })
      },
      (error) => {
        set({
          error: new Error(`Failed to get current location: ${error.message}`),
          isLoading: false
        })
      }
    )
  },

  resetError: () => set({ error: null }),

  reset: () => set(initialState)
}))
