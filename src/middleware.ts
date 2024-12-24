import { clerkMiddleware } from '@clerk/nextjs/server'
import { geolocation } from '@vercel/functions'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return
  }

  const { country = '' } = geolocation(req)

  // Create middleware for next-intl
  const intlMiddleware = createMiddleware(routing)

  // Call middleware of next-intl
  const intlResponse = intlMiddleware(req)

  // Add x-user-country header
  intlResponse.headers.set('x-user-country', country)

  return intlResponse
})

export const config = {
  matcher: [
    '/',
    '/(en|vi)/:path*',
    '/((?!_next|api|.*\\.).*)' // Exclude static files and API routes
  ]
}
