import type { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/blog-data'
import { getEnvUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getEnvUrl().replace(/\/$/, '')
  const now = new Date()

  // Public, indexable routes only (exclude auth/account/protected pages)
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/usecases`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/story`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const slugs = getAllBlogSlugs()
  const usecasePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/usecases/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...usecasePages]
}
