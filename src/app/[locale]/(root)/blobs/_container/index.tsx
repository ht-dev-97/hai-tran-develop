'use client'

import { useEffect, useState } from 'react'

interface BlobImage {
  url: string
  pathname: string
  uploadedAt: string
  size: number
}

export function BlobsContainer() {
  const [images, setImages] = useState<BlobImage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blobs/get-blobs?folders=banner')
      const data = await response.json()
      setImages(data.blobs)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {images.map((image) => (
        <div key={image.url} className="flex items-center gap-4">
          <img
            src={image.url}
            alt={`Banner ${image.pathname}`}
            className="w-80 h-40 object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{image.pathname}</p>
            <p className="text-sm text-muted-foreground">
              Uploaded on {image.uploadedAt}
            </p>
            <p className="text-sm text-muted-foreground">
              Size: {image.size} bytes
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
