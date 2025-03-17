import { getRouteDirections, searchPlaces } from '@/services/mapbox.service'
import { Location } from '@/types'
import { useCallback, useState } from 'react'

export const useMapbox = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const searchLocations = useCallback(async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const locations = await searchPlaces(query)
      return locations
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getRoute = useCallback(async (start: Location, end: Location) => {
    setIsLoading(true)
    setError(null)
    try {
      const route = await getRouteDirections(start, end)
      return route
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    searchLocations,
    getRoute
  }
}
