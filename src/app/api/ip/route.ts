// Get IP Host
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'Unknown'

  return NextResponse.json({ ip })
}
