import React, { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { useLocationStore } from "@/stores"

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const { fromLocation, toLocation } = useLocationStore()

  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    })

    // Get user's location and add a marker
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (map.current) {
          const { latitude, longitude } = position.coords

          // Add marker for current location
          const currentLocationMarker = new mapboxgl.Marker({
            color: "#4CAF50",
          })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
            .addTo(map.current)

          markersRef.current.push(currentLocationMarker)

          // Fly to user's location
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            essential: true,
          })
        }
      },
      (error) => {
        console.error("Error getting location:", error)
      }
    )

    return () => {
      markersRef.current.forEach((marker) => marker.remove())
      if (map.current) map.current.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current || !fromLocation || !toLocation) return

    // Remove existing route layer and source
    if (map.current.getLayer("route")) {
      map.current.removeLayer("route")
      map.current.removeSource("route")
    }

    // Add the route
    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [fromLocation, toLocation],
        },
      },
    })

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#888",
        "line-width": 8,
      },
    })

    // Add markers for selected locations
    const fromMarker = new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat(fromLocation)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>From</h3>"))
      .addTo(map.current)

    const toMarker = new mapboxgl.Marker({ color: "#0000FF" })
      .setLngLat(toLocation)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>To</h3>"))
      .addTo(map.current)

    markersRef.current.push(fromMarker, toMarker)

    // Fit bounds to show both points
    const bounds = new mapboxgl.LngLatBounds()
      .extend(fromLocation)
      .extend(toLocation)

    map.current.fitBounds(bounds, {
      padding: 50,
    })

    return () => {
      fromMarker.remove()
      toMarker.remove()
    }
  }, [fromLocation, toLocation])

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg overflow-hidden"
    />
  )
}
