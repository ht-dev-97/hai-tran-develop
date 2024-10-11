"use client"

import { useState, useEffect } from "react"
import { clientFetch } from "@/utils/client-fetch"

const IPComponent = () => {
  const [ip, setIp] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await clientFetch.get("/api/ip")
        if (response) {
          const data = await response.json()
          setIp(data.ip)
          setLoading(false)
        }
      } catch (err) {
        setError("Failed to fetch IP")
        setLoading(false)
        console.error("Error fetching IP:", err)
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

export default IPComponent
