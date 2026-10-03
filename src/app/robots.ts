import type { MetadataRoute } from 'next'
import { getEnvUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const base = getEnvUrl().replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/explore',
          '/explore/',
          '/explore/*',
          '/sign-in',
          '/api/*',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}

