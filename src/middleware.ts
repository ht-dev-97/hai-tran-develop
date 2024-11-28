import { clerkMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default clerkMiddleware((auth, req) => {
  // Create middleware for next-intl
  const intlMiddleware = createMiddleware(routing)

  // Call middleware of next-intl
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Combine matcher of both next-intl and Clerk
    '/',
    '/(en|vi)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*))',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
