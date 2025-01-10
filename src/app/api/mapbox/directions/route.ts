import { getRouteDirections } from '@/services/mapbox.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  if (!start || !end) {
    return NextResponse.json(
      { error: 'Start and end parameters are required' },
      { status: 400 }
    )
  }

  const startLocation = JSON.parse(start)
  const endLocation = JSON.parse(end)

  const route = await getRouteDirections(startLocation, endLocation)
  return NextResponse.json(route)
}
