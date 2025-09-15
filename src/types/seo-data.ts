export interface SEOPageData {
  // Meta information
  // Optional explicit slug for routing; falls back to `${audience}-${usecase}` if absent
  slug?: string
  usecase: string
  audience: string
  title: string
  description: string
  keywords?: string[]

  // Hero section
  hero: {
    headline: string
    subheadline: string
    ctaText: string
    badgeText?: string
    points?: string[]
    secondaryCtaText?: string
  }

  // Why section
  why: {
    title: string
    description: string
    benefits: Array<{
      title: string
      description: string
      icon: string
    }>
  }

  // How section
  how: {
    title: string
    description: string
    steps: Array<{
      step: number
      title: string
      description: string
      imageUrl?: string
      imageAlt?: string
    }>
  }

  // Do more section
  doMore: {
    title: string
    description: string
    features: Array<{
      title: string
      description: string
    }>
  }

  // FAQ section
  faq: Array<{
    question: string
    answer: string
  }>

  // Optional customization
  primaryColor?: string
  testimonial?: {
    quote: string
    author: string
    company: string
    role: string
  }

  // Optional trust and visuals
  images?: Array<{
    url: string
    alt?: string
  }>
  trust?: {
    badgeText?: string
    logos?: Array<{
      name?: string
      url?: string
    }>
  }

  // Optional related linking
  relatedSlugs?: string[]

  // Optional long-form section for SEO depth
  longSection?: {
    title: string
    paragraphs: string[]
  }

  // Optional applications/use-cases bullets section
  applications?: {
    title: string
    items: Array<{
      title: string
      description: string
      slug?: string
    }>
  }
}



export const sampleUseCases = [
  // Content Creators
  { usecase: "social-media-marketing", audience: "content-creators", title: "AI Motion Graphics for Content Creators" },
  { usecase: "youtube-intros", audience: "youtubers", title: "Professional YouTube Intro Animations" },
  { usecase: "tiktok-viral-content", audience: "tiktok-creators", title: "Viral TikTok Animation Effects" },
  { usecase: "instagram-stories", audience: "instagram-influencers", title: "Animated Instagram Stories" },

  // Business & Marketing
  { usecase: "product-launches", audience: "marketing-teams", title: "Product Launch Video Animations" },
  { usecase: "brand-storytelling", audience: "brand-managers", title: "Animated Brand Story Videos" },
  { usecase: "social-ads", audience: "digital-marketers", title: "High-Converting Social Media Ads" },
  { usecase: "email-marketing", audience: "email-marketers", title: "Animated Email Marketing Videos" },

  // Education & Training
  { usecase: "educational-content", audience: "educators", title: "Engaging Educational Animations" },
  { usecase: "training-videos", audience: "corporate-trainers", title: "Interactive Training Animations" },
  { usecase: "course-promotion", audience: "course-creators", title: "Course Promotional Videos" },
  { usecase: "explainer-videos", audience: "saas-companies", title: "Product Explainer Animations" },

  // Agencies & Freelancers
  { usecase: "client-presentations", audience: "creative-agencies", title: "Dynamic Client Presentations" },
  { usecase: "pitch-decks", audience: "freelance-designers", title: "Animated Pitch Deck Videos" },
  { usecase: "portfolio-showcases", audience: "motion-designers", title: "Portfolio Animation Showcases" },

  // Specific Industries
  { usecase: "real-estate", audience: "real-estate-agents", title: "Property Listing Animations" },
  { usecase: "restaurant-promos", audience: "restaurant-owners", title: "Food & Restaurant Promotions" },
  { usecase: "fitness-content", audience: "fitness-trainers", title: "Fitness Motivation Videos" },
  { usecase: "event-promotion", audience: "event-planners", title: "Event Promotional Animations" },

  // Technical & Data
  { usecase: "data-visualization", audience: "data-analysts", title: "Animated Data Visualizations" },
  { usecase: "sales-presentations", audience: "sales-teams", title: "Dynamic Sales Presentations" },
  { usecase: "product-demos", audience: "product-managers", title: "Interactive Product Demos" },
]
