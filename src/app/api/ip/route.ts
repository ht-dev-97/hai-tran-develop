import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const headersList = headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0] ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    headersList.get('x-client-ip') ||
    'Unknown IP'

  return NextResponse.json({ ip })
}
