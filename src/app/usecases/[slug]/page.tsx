import { notFound } from 'next/navigation'
import { UseCasePageTemplate } from '@/components/usecase-page-template'
import { getBlogPostBySlug, getAllBlogSlugs, generateSamplePage } from '@/lib/blog-data'
import { sampleUseCases } from '@/types/seo-data'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const fallback = sampleUseCases.find(u => `${u.audience}-${u.usecase}` === slug)
  const sample = fallback ? generateSamplePage(fallback) : null
  
  const page = post || sample

  if (!page) {
    return { title: 'Post Not Found', description: 'The requested blog post could not be found.' }
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords?.join(', '),
    alternates: {
      canonical: `/usecases/${slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/usecases/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const fallback = sampleUseCases.find(u => `${u.audience}-${u.usecase}` === slug)
  const sample = fallback ? generateSamplePage(fallback) : null
  const page = post || sample

  if (!page) {
    notFound()
  }

  return <UseCasePageTemplate data={page} />
}
