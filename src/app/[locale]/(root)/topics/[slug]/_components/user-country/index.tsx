'use client'

import { clientFetch } from '@/utils/client-fetch'
import { useEffect, useState } from 'react'

const UserCountry = () => {
  const [country, setCountry] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await clientFetch.get('/api/user-country')
        if (response && response.data) {
          setCountry(response.data.country)
          setLoading(false)
        }
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
