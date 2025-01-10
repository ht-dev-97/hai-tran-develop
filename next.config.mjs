import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com'
      }
    ],
    formats: ['image/avif', 'image/webp']
  }
}

export default withNextIntl(nextConfig)
