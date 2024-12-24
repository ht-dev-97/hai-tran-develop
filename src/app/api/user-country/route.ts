import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const country = req.headers.get('x-user-country') || '' // Fallback to 'US'
  return NextResponse.json({ country })
}
