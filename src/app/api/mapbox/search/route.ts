import { searchPlaces } from '@/services/mapbox.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  const locations = await searchPlaces(query)
  return NextResponse.json(locations)
}
