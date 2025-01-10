'use client'

import { clientFetch } from '@/utils/http'
import { useEffect, useState } from 'react'

interface GeoResponse {
  country: string
}

const UserCountry = () => {
  const [country, setCountry] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await clientFetch.get<GeoResponse>('/api/geo')
        if (!data) return

        setCountry(data.country)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch Country')
        setLoading(false)
        console.error('Error fetching country:', err)
      }
    }

    fetchCountry()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Your Country: {country}</h1>
    </div>
  )
}

export default UserCountry
