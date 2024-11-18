import mapboxgl, { Map as MapboxMap } from 'mapbox-gl'
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'

// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-geocoder.css"

const Mapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapboxMap | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || ''

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
      })

      // mapRef.current.addControl(
      //   new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     mapboxgl: mapboxgl,
      //   })
      // )
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  return (
    <div ref={mapContainerRef} style={{ height: '500px', width: '500px' }} />
  )
}

export default Mapbox
