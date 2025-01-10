'use client'

import { clientFetch } from '@/utils/http'
import { useEffect, useState } from 'react'

interface IpResponse {
  ip: string
}

const HostIP = () => {
  const [ip, setIp] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const data = await clientFetch.get<IpResponse>('/api/ip')
        if (!data) return

        setIp(data.ip)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch IP')
        setLoading(false)
        console.error('Error fetching IP:', err)
      }
    }

    fetchIP()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Your IP Address</h2>
      <p>{ip}</p>
    </div>
  )
}

export default HostIP
