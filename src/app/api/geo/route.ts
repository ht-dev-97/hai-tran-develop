import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const country = req.headers.get('x-user-country') || ''
  return NextResponse.json({ country })
}
