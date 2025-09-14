import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import * as Papa from 'papaparse'
import type { SEOPageData } from '@/types/seo-data'
import { sampleUseCases } from '@/types/seo-data'

// Normalize a candidate slug into a safe, lowercase, hyphenated form
const normalizeSlug = (s: string): string => {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function loadBlogData(): SEOPageData[] {
  try {
    const dataDir = join(process.cwd(), 'src', 'data')
    const programmaticPath = join(dataDir, 'programmatic-seo-content.csv')
    const enrichedPath = join(dataDir, 'seo-pages-super-matrix-icons-seo.enriched.csv')
    const fallbackPath = join(dataDir, 'seo-pages-super-matrix-icons-seo.csv')
    const csvPath = existsSync(programmaticPath)
      ? programmaticPath
      : existsSync(enrichedPath)
        ? enrichedPath
        : fallbackPath
    const csvText = readFileSync(csvPath, 'utf-8')
    const csvPages = parseCSVToSEOData(csvText)
    // If CSV has data, use it; otherwise fallback to sample use cases
    if (csvPages.length > 0) {
      // Validate and enrich related slugs to ensure links resolve
      return enrichRelatedSlugs(csvPages)
    } else {
      return sampleUseCases.map(generateSamplePage)
    }
  } catch (error) {
    console.error('Failed to load CSV data:', error)
    // Fallback to sample use cases if CSV fails to load
    return sampleUseCases.map(generateSamplePage)
  }
}

export function parseCSVToSEOData(csvText: string): SEOPageData[] {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  if (result.errors && result.errors.length > 0) {
    // Allow field count mismatches so older rows without new icon columns still parse.
    const nonCritical = result.errors.filter((e) => !(e.code === 'TooFewFields' && e.type === 'FieldMismatch'))
    if (nonCritical.length > 0) {
      console.error('CSV parsing errors:', nonCritical)
      return []
    }
  }

  return result.data.map((row: Record<string, string>) => {
    const safeUsecase = (row.usecase || 'content-creation').trim()
    const safeAudience = (row.audience || 'creators').trim()
    const explicitSlug = row['slug'] ? String(row['slug']).trim() : undefined
    const computedSlug = `${safeAudience}-${safeUsecase}`
    const slug = normalizeSlug(explicitSlug || computedSlug)

    // Parse optional, richer fields
    const splitList = (value?: string): string[] | undefined => {
      if (!value) return undefined
      // Support | ; • , as separators
      const parts = value
        .split(/\s*[|;•,]\s*/)
        .map((s) => s.trim())
        .filter(Boolean)
      return parts.length ? parts : undefined
    }

    const heroPoints = splitList(row.hero_points)
    const images: { url: string; alt?: string }[] = []
    ;([1, 2, 3] as const).forEach((i) => {
      const url = row[`image${i}_url`]
      const alt = row[`image${i}_alt`]
      if (url) images.push({ url, alt })
    })

    const trustLogos = splitList(row.trust_logos)?.map((t) => ({ name: t }))
    const relatedSlugs = splitList(row.related_slugs)

    // Helpers to enrich short text with step-specific SEO-friendly detail
    const cap = (txt: string, max = 420) => (txt.length > max ? txt.slice(0, max).replace(/\s+\S*$/, '') + '…' : txt)
    const enrichGeneral = (text: string | undefined, fallback: string): string => {
      const base = (text && text.trim()) || fallback
      if (base.length >= 180) return base
      const extra = ` Outline your goal, audience, and message; then pick styles that match your brand. Export in the right aspect ratio for each channel and plan simple A/B tests to keep improving.`
      const combined = `${base}${base.endsWith('.') ? '' : '.'}${extra}`
      return cap(combined)
    }
    const enrichStep = (text: string | undefined, fallback: string, step: 1 | 2 | 3): string => {
      const base = (text && text.trim()) || fallback
      if (base.length >= 180) return base
      let extra = ''
      if (step === 1) {
        extra = ` Focus on capturing the core message, audience, tone, and motion style. Clear prompts lead to better concepts and fewer revisions.`
      } else if (step === 2) {
        extra = ` Ensure brand consistency with fonts, colors, and safe areas. Optimize pacing and composition so animations feel native to each platform.`
      } else {
        extra = ` Export in the correct formats, then monitor engagement metrics like thumb-stop rate, completion, and CTR to refine future variants.`
      }
      return cap(`${base}${base.endsWith('.') ? '' : '.'}${extra}`)
    }

    return {
      slug,
      usecase: safeUsecase,
      audience: safeAudience,
      title: row.title || 'Gomotion - AI Motion Graphics',
      description: row.description || 'Create stunning animations with AI',
      keywords: row.keywords ? row.keywords.split(',').map((k) => k.trim()) : ['AI', 'motion graphics', 'animation'],

      hero: {
        headline: row.hero_headline || 'Transform Your Content with AI Motion Graphics',
        subheadline: row.hero_subheadline || 'Create professional animations in seconds',
        ctaText: row.hero_cta || 'Start Creating Now',
        badgeText: row.hero_badge_text || undefined,
        points: heroPoints,
        secondaryCtaText: row.hero_secondary_cta || undefined,
      },

      why: {
        title: row.why_title || `Why ${safeAudience} Choose Gomotion`,
        description: row.why_description || 'Create professional motion graphics effortlessly',
        benefits: [
          {
            title: row.why_benefit1_title || 'Text to Motion Magic',
            description: row.why_benefit1_description || 'Animate text from simple prompts',
            icon: row.why_benefit1_icon || 'WandSparkles',
          },
          {
            title: row.why_benefit2_title || 'Industry-Ready Quality',
            description: row.why_benefit2_description || 'Professional-grade animations',
            icon: row.why_benefit2_icon || 'BadgeCheck',
          },
          {
            title: row.why_benefit3_title || 'Multi-Platform Ready',
            description: row.why_benefit3_description || 'Optimized for all platforms',
            icon: row.why_benefit3_icon || 'Smartphone',
          },
          {
            title: row.why_benefit4_title || 'Cost Effective',
            description: row.why_benefit4_description || 'Get professional results at a fraction of the cost',
            icon: row.why_benefit4_icon || 'PiggyBank',
          },
          {
            title: row.why_benefit5_title || 'Time Efficient',
            description: row.why_benefit5_description || 'Create content in minutes not hours',
            icon: row.why_benefit5_icon || 'Timer',
          },
          {
            title: row.why_benefit6_title || 'Scalable Production',
            description: row.why_benefit6_description || 'Generate unlimited variations and iterations',
            icon: row.why_benefit6_icon || 'Layers',
          },
        ],
      },

      how: {
        title: row.how_title || 'How to Create Stunning Animations',
        description: enrichGeneral(row.how_description, 'From concept to content in three steps'),
        steps: [
          {
            step: 1,
            title: row.how_step1_title || 'Describe Your Vision',
            description: enrichStep(row.how_step1_description, 'Simply type what you want', 1),
            imageUrl: row['how_step1_image'] || undefined,
            imageAlt: row['how_step1_alt'] || undefined,
          },
          {
            step: 2,
            title: row.how_step2_title || 'AI Creates the Magic',
            description: enrichStep(row.how_step2_description, 'Our AI generates animations instantly', 2),
            imageUrl: row['how_step2_image'] || undefined,
            imageAlt: row['how_step2_alt'] || undefined,
          },
          {
            step: 3,
            title: row.how_step3_title || 'Publish & Engage',
            description: enrichStep(row.how_step3_description, 'Download and share your content', 3),
            imageUrl: row['how_step3_image'] || undefined,
            imageAlt: row['how_step3_alt'] || undefined,
          },
        ],
      },

      doMore: {
        title: row.domore_title || 'Do More with Gomotion',
        description: row.domore_description || 'Unlock the full power of AI motion graphics',
        features: [
          {
            title: row.domore_feature1_title || 'Narrative Mode',
            description: row.domore_feature1_description || 'Turn scripts into animated stories',
          },
          {
            title: row.domore_feature2_title || 'Brand Integration',
            description: row.domore_feature2_description || 'Import your brand assets easily',
          },
          {
            title: row.domore_feature3_title || 'Data Visualization',
            description: row.domore_feature3_description || 'Create animated charts and graphs',
          },
        ],
      },

      faq: (() => {
        // Collect custom FAQs if present
        const customFaq: { question: string; answer: string }[] = []
        for (let i = 1; i <= 8; i++) {
          const q = row[`faq${i}_question`]
          const a = row[`faq${i}_answer`]
          if (q && a) customFaq.push({ question: q, answer: a })
        }
        if (customFaq.length) return customFaq
        // Fallback defaults
        return [
          {
            question: `Do I need animation experience for ${safeUsecase.replace(/-/g, ' ')}?`,
            answer:
              'Not at all! Gomotion is designed for creators of all skill levels. Simply describe what you want in plain English, and our AI handles the complex animation work for you.',
          },
          {
            question: `How does Gomotion help with ${safeUsecase.replace(/-/g, ' ')}?`,
            answer: `Gomotion creates content specifically optimized for ${safeUsecase.replace(/-/g, ' ')}. You can export in different formats and aspect ratios perfect for your preferred platforms.`,
          },
          {
            question: 'How long does it take to create an animation?',
            answer:
              'Most animations are generated in under 30 seconds. Complex narrative mode videos with multiple scenes typically take 2-3 minutes to render.',
          },
          {
            question: 'Can I create content for TikTok, Instagram, and YouTube?',
            answer:
              'Yes. Gomotion supports multiple aspect ratios and durations so your animations are optimized for TikTok, Instagram, YouTube, LinkedIn, and web embeds.',
          },
          {
            question: 'How does Gomotion compare to After Effects?',
            answer:
              'Gomotion focuses on speed and simplicity—describe your idea and get a polished animation in minutes—while After Effects provides deep manual control at the cost of time and expertise. Many teams prototype in Gomotion and finalize complex edits in AE when needed.',
          },
        ]
      })(),

      testimonial: {
        quote:
          row.testimonial_quote ||
          `Gomotion completely transformed our ${safeUsecase.replace(/-/g, ' ')}. We went from spending hours on animations to creating professional content in minutes.`,
        author: row.testimonial_author || 'Sarah Johnson',
        company: row.testimonial_company || 'Creative Studio',
        role: row.testimonial_role || (safeAudience.includes('team') ? 'Team Lead' : 'Senior Creator'),
      },

      images: images.length ? images : undefined,
      trust:
        row.trust_badge_text || (trustLogos && trustLogos.length)
          ? {
              badgeText: row.trust_badge_text || undefined,
              logos: trustLogos,
            }
          : undefined,
      relatedSlugs: relatedSlugs,

      longSection: (() => {
        const title = row['long_section_title']
        const parasRaw = row['long_section_paragraphs'] || undefined
        const paras = splitList(parasRaw)
        if (title && paras && paras.length) {
          return { title, paragraphs: paras }
        }
        // Default long-form content to ensure adequate on-page text
        const defaultTitle = `A Practical Guide to ${safeUsecase.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`
        const p1 = `Understanding the fundamentals of ${safeUsecase.replace(/-/g, ' ')} is essential for ${safeAudience.replace(/-/g, ' ')} who want to produce consistent, on-brand results. Start by clarifying your objective, audience, and message. Strong creative briefs lead to smoother generation, faster iteration, and better-performing motion content.`
        const p2 = `Next, align visual identity and channel requirements. Gomotion supports brand colors, fonts, and layout preferences so your output matches guidelines across Instagram, TikTok, YouTube, and web. Export in the right aspect ratio and duration for each destination to maximize reach and watch-time.`
        const p3 = `Finally, close the loop with measurement and iteration. Test multiple variations, review engagement metrics, and keep improving prompts and styles. Over time, your ${safeUsecase.replace(/-/g, ' ')} pipeline becomes a repeatable advantage for the team.`
        return { title: defaultTitle, paragraphs: [p1, p2, p3] }
      })(),

      applications: (() => {
        const title = row['usecases_title'] || 'Real-World Use Cases for Gomotion'
        const items: { title: string; description: string; slug?: string }[] = []
        for (let i = 1; i <= 4; i++) {
          const t = row[`usecase_bullet${i}_text`]
          const d = row[`usecase_bullet${i}_description`]
          const s = row[`usecase_bullet${i}_slug`]
          if (t && d) items.push({ title: t, description: d, slug: s || undefined })
        }
        if (items.length) return { title, items }

        // If not provided, try building from relatedSlugs
        if (relatedSlugs && relatedSlugs.length) {
          const rs = relatedSlugs.slice(0, 4).map((slug) => {
            const label = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
            const desc = `Explore how AI motion graphics streamline ${label.toLowerCase()} with fast iteration, brand consistency, and platform‑optimized outputs.`
            return { title: label, description: desc, slug }
          })
          return { title, items: rs }
        }

        // Sensible defaults per audience/use case
        const defaults = [
          {
            title: 'For Content Creators',
            description:
              'Produce engaging TikTok intros, Instagram stories, and YouTube shorts that look professional without spending hours editing.',
          },
          {
            title: 'For Small Businesses',
            description:
              'Promote products with animated ads and explainers that boost awareness and conversions across social and web.',
          },
          {
            title: 'For Marketing Teams',
            description:
              'Generate multiple versions of campaign assets quickly, test performance, and optimize for each platform.',
          },
          {
            title: 'For Educators & Coaches',
            description:
              'Turn lessons, data, or key points into motion graphics that make learning and retention more engaging.',
          },
        ]
        return { title, items: defaults }
      })(),
    }
  })
}

// Ensure relatedSlugs only contain valid, routable entries and fill gaps.
function enrichRelatedSlugs(pages: SEOPageData[]): SEOPageData[] {
  const slugOf = (p: SEOPageData) => normalizeSlug(p.slug || `${p.audience}-${p.usecase}`)
  const computedOf = (p: SEOPageData) => normalizeSlug(`${p.audience}-${p.usecase}`)
  const validSet = new Set(pages.map(slugOf))

  // Map various tokens to canonical slugs for backward compatibility
  const tokenToCanonical = new Map<string, string>()
  for (const p of pages) {
    const canonical = slugOf(p)
    const computed = computedOf(p)
    tokenToCanonical.set(canonical, canonical)
    tokenToCanonical.set(computed, canonical)
  }

  const byUsecase = new Map<string, SEOPageData[]>()
  const byAudience = new Map<string, SEOPageData[]>()
  for (const p of pages) {
    const u = p.usecase
    const a = p.audience
    if (!byUsecase.has(u)) byUsecase.set(u, [])
    if (!byAudience.has(a)) byAudience.set(a, [])
    byUsecase.get(u)!.push(p)
    byAudience.get(a)!.push(p)
  }

  const resolveGeneric = (token: string | undefined, current: SEOPageData): string | null => {
    if (!token) return null
    const t = normalizeSlug(token)
    // Exact or alias match
    if (tokenToCanonical.has(t)) return tokenToCanonical.get(t)!
    // Try interpret as usecase only: prefer same-audience if exists
    const maybeSameAudience = normalizeSlug(`${current.audience}-${t}`)
    if (tokenToCanonical.has(maybeSameAudience)) return tokenToCanonical.get(maybeSameAudience)!
    // Otherwise, try find any audience that has this usecase
    const candidates = pages
      .filter((p) => normalizeSlug(p.usecase) === t)
      .map((p) => slugOf(p))
    return candidates[0] || null
  }

  const uniq = (arr: string[]) => Array.from(new Set(arr))

  return pages.map((p) => {
    const self = slugOf(p)
    const given = (p.relatedSlugs || [])
      .map((s) => (s || '').trim())
      .filter(Boolean)
      .map((s) => resolveGeneric(s, p))
      .filter((s): s is string => Boolean(s && validSet.has(s!)))

    const base = uniq(given.filter((s) => s !== self))

    const need = (n: number) => n - base.length

    // 1) Same usecase, different audiences
    if (need(4) > 0) {
      const sameUsecase = (byUsecase.get(p.usecase) || [])
        .map(slugOf)
        .filter((s) => s !== self && !base.includes(s))
      base.push(...sameUsecase.slice(0, need(4)))
    }

    // 2) Same audience, different usecases
    if (need(4) > 0) {
      const sameAudience = (byAudience.get(p.audience) || [])
        .map(slugOf)
        .filter((s) => s !== self && !base.includes(s))
      base.push(...sameAudience.slice(0, need(4)))
    }

    // 3) Fill with any remaining valid slugs
    if (need(4) > 0) {
      const anyOthers = pages
        .map(slugOf)
        .filter((s) => s !== self && !base.includes(s))
      base.push(...anyOthers.slice(0, need(4)))
    }

    p.relatedSlugs = base.slice(0, 4)

    // Normalize any application item slugs to canonical
    if (p.applications && p.applications.items && p.applications.items.length > 0) {
      p.applications.items = p.applications.items.map((it) => {
        if (!it.slug) return it
        const resolved = resolveGeneric(it.slug, p)
        return { ...it, slug: resolved || undefined }
      })
    }
    return p
  })
}

export function getBlogPostBySlug(slug: string): SEOPageData | null {
  const allPosts = loadBlogData()
  const target = normalizeSlug(slug)
  return (
    allPosts.find(post => normalizeSlug(post.slug || `${post.audience}-${post.usecase}`) === target) || null
  )
}

export function getAllBlogSlugs(): string[] {
  const allPosts = loadBlogData()
  const set = new Set<string>()
  for (const post of allPosts) {
    const s = normalizeSlug(post.slug || `${post.audience}-${post.usecase}`)
    set.add(s)
  }
  return Array.from(set)
}

export function generateSamplePage(useCase: (typeof sampleUseCases)[0]): SEOPageData {
  const samplePage: SEOPageData = {
    slug: `${useCase.audience}-${useCase.usecase}`,
    usecase: useCase.usecase,
    audience: useCase.audience,
    title: `AI Motion Graphics for ${useCase.audience.replace(/-/g, " ")} - Gomotion`,
    description: `Create stunning animated content for ${useCase.usecase.replace(/-/g, " ")} with Gomotion's AI-powered motion graphics. Transform ideas into viral content instantly.`,
    keywords: ["AI motion graphics", useCase.usecase.replace(/-/g, " "), "animation", "content creation"],

    hero: {
      headline: `Transform Your ${useCase.usecase.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} with AI Motion Graphics`,
      subheadline: `Perfect for ${useCase.audience.replace(/-/g, " ")} who want to create professional animated content without the complexity of traditional animation software.`,
      ctaText: "Start Creating Now",
    },

    why: {
      title: `Why ${useCase.audience.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Choose Gomotion`,
      description: `Skip the learning curve and create professional motion graphics that captivate your audience.`,
      benefits: [
        {
          title: "Text to Motion Magic",
          description:
            "Animate text from simple prompts. No keyframes needed - just describe how you want it to move.",
          icon: "WandSparkles",
        },
        {
          title: "Industry-Ready Quality",
          description: `Professional-grade animations tailored for ${useCase.usecase.replace(/-/g, " ")} standards and best practices.`,
          icon: "BadgeCheck",
        },
        {
          title: "Multi-Platform Ready",
          description: "Create content optimized for all platforms where your audience engages most.",
          icon: "Smartphone",
        },
        {
          title: "Cost Effective",
          description: "Get professional results at a fraction of traditional production costs.",
          icon: "PiggyBank",
        },
        {
          title: "Time Efficient",
          description: "Create content in minutes not hours with instant AI generation.",
          icon: "Timer",
        },
        {
          title: "Scalable Production",
          description: "Generate unlimited variations and iterations without additional costs.",
          icon: "Layers",
        },
      ],
    },

    how: {
      title: "How to Create Stunning Animations in Minutes",
      description: "From concept to professional content in three simple steps.",
      steps: [
        {
          step: 1,
          title: "Describe Your Vision",
          description: `Simply type what you want for your ${useCase.usecase.replace(/-/g, " ")} - no technical skills required.`,
        },
        {
          step: 2,
          title: "AI Creates the Magic",
          description: "Our AI motion designer generates professional animations instantly.",
        },
        {
          step: 3,
          title: "Publish & Engage",
          description: `Download your animation and share across all your channels.`,
        },
      ],
    },

    doMore: {
      title: "Do More with Gomotion",
      description: "Unlock the full power of AI-driven motion graphics for your content strategy.",
      features: [
        {
          title: "Narrative Mode",
          description: "Turn scripts into full animated stories with synced images and videos for complete ads.",
        },
        {
          title: "Brand Integration",
          description: "Import your brand assets with one click to maintain consistent visual identity.",
        },
        {
          title: "Data Visualization",
          description: "Create animated charts and simulations from your data for engaging explainer content.",
        },
      ],
    },

    faq: [
      {
        question: `Do I need animation experience for ${useCase.usecase.replace(/-/g, " ")}?`,
        answer:
          "Not at all! Gomotion is designed for creators of all skill levels. Simply describe what you want in plain English, and our AI handles the complex animation work for you.",
      },
      {
        question: `How does Gomotion help with ${useCase.usecase.replace(/-/g, " ")}?`,
        answer: `Gomotion creates content specifically optimized for ${useCase.usecase.replace(/-/g, " ")}. You can export in different formats and aspect ratios perfect for your preferred platforms.`,
      },
      {
        question: "How long does it take to create an animation?",
        answer:
          "Most animations are generated in under 30 seconds. Complex narrative mode videos with multiple scenes typically take 2-3 minutes to render.",
      },
      {
        question: "Can I use my own brand colors and fonts?",
        answer:
          "Yes! Gomotion supports one-click brand import. Upload your logo, and we'll automatically extract your brand colors, fonts, and style guidelines for consistent content creation.",
      },
    ],

    testimonial: {
      quote: `Gomotion completely transformed our ${useCase.usecase.replace(/-/g, " ")}. We went from spending hours on animations to creating professional content in minutes.`,
      author: "Sarah Johnson",
      company: "Creative Studio",
      role: useCase.audience.includes("team")
        ? "Team Lead"
        : "Senior " + useCase.audience.replace(/-/g, " ").replace(/s$/, ""),
    },
  }

  return samplePage
}
