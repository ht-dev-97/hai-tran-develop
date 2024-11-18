import { getEnv } from '@/utils/common'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const host = headers().get('host') || ''
  const environment = getEnv(host)
  return NextResponse.json({ environment })
}
