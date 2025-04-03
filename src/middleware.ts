import { clerkMiddleware } from '@clerk/nextjs/server'
import { geolocation } from '@vercel/functions'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

import { routing } from './i18n/routing'

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return
  }

  const url = req.nextUrl

  const { country = '' } = geolocation(req)

  // Create middleware for next-intl
  const intlMiddleware = createMiddleware(routing)

  // Call middleware of next-intl
  const intlResponse = intlMiddleware(req)

  // Add x-user-country header
  intlResponse.headers.set('x-user-country', country)

  const queryParams = url.searchParams
  const hasQueryParams = queryParams.toString() !== ''

  const amplitudeDeviceId = queryParams.get('amplitude_device_id')

  if (amplitudeDeviceId) {
    // Save amplitude_device_id to cookie
    intlResponse.cookies.set('amplitude_device_id', amplitudeDeviceId)
  }

  if (hasQueryParams) {
    const cleanUrl = new URL(req.url)
    cleanUrl.search = ''
    const redirectResponse = NextResponse.redirect(cleanUrl)

    redirectResponse.cookies.getAll().map(({ name, value, ...options }) => {
      redirectResponse.cookies.set(name, value, options)
    })
  }

  return intlResponse
})

export const config = {
  matcher: [
    '/',
    '/(en|vi)/:path*',
    '/((?!_next|api|.*\\.).*)' // Exclude static files and API routes
  ]
}
