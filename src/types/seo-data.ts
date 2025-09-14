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

// Example data structure for CSV import
export const exampleSEOData: SEOPageData = {
  usecase: "social-media-marketing",
  audience: "content-creators",
  title: "AI Motion Graphics for Social Media Creators - Gomotion",
  description:
    "Create stunning animated content for social media with Gomotion's AI-powered motion graphics. Transform text into cinematic animations in seconds.",
  keywords: ["AI motion graphics", "social media animation", "text animation", "content creation", "video marketing"],

  hero: {
    headline: "Create Viral Social Media Content with AI Motion Graphics",
    subheadline:
      "Transform your ideas into stunning animated videos instantly. No keyframes, no complex software - just describe your vision and watch it come to life.",
    ctaText: "Start Creating Now",
  },

  why: {
    title: "Why Content Creators Choose Gomotion",
    description: "Skip the learning curve and create professional motion graphics that captivate your audience.",
    benefits: [
      {
        title: "Text to Motion Magic",
        description: "Animate text from simple prompts. No keyframes needed - just describe how you want it to move.",
        icon: "✨",
      },
      {
        title: "Cinematic Quality",
        description: "Professional-grade animations that make your content stand out in crowded feeds.",
        icon: "🎬",
      },
      {
        title: "Multi-Platform Ready",
        description: "Create content optimized for Instagram, TikTok, YouTube, and all social platforms.",
        icon: "📱",
      },
    ],
  },

  how: {
    title: "How to Create Stunning Animations in Minutes",
    description: "From concept to viral content in three simple steps.",
    steps: [
      {
        step: 1,
        title: "Describe Your Vision",
        description: "Simply type what you want your text or logo to do - no technical skills required.",
      },
      {
        step: 2,
        title: "AI Creates the Magic",
        description: "Our AI motion designer generates professional animations instantly.",
      },
      {
        step: 3,
        title: "Publish & Go Viral",
        description: "Download your animation and share across all your social platforms.",
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
      question: "Do I need animation experience to use Gomotion?",
      answer:
        "Not at all! Gomotion is designed for creators of all skill levels. Simply describe what you want in plain English, and our AI handles the complex animation work for you.",
    },
    {
      question: "What social media platforms work best with Gomotion content?",
      answer:
        "Gomotion creates content optimized for all major platforms including Instagram, TikTok, YouTube, Facebook, LinkedIn, and Twitter. You can export in different aspect ratios for each platform.",
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
    quote:
      "Gomotion completely changed my content game. I went from spending hours on animations to creating viral content in minutes. My engagement rates have tripled!",
    author: "Alex Chen",
    company: "@CreativeAlex",
    role: "Content Creator (2.3M followers)",
  },
}

export const sampleSEOData: SEOPageData = {
  usecase: "social-media-marketing",
  audience: "content-creators",
  title: "AI Motion Graphics for Content Creators - Gomotion",
  description:
    "Create stunning animated text and motion graphics for your content with AI. Transform simple prompts into cinematic animations perfect for social media, product demos, and marketing videos.",
  hero: {
    headline: "AI-Powered Motion Graphics for Content Creators",
    subheadline:
      "Transform your ideas into stunning animated text and motion graphics with simple prompts. No keyframes, no complex software—just describe what you want and GoMotion creates professional animations instantly.",
    ctaText: "Start Creating Free",
  },
  why: {
    title: "Why Content Creators Choose Gomotion",
    description: "Skip the complex animation software and create professional motion graphics in minutes, not hours.",
    benefits: [
      {
        title: "No Animation Experience Needed",
        description:
          "Just describe your vision in simple words and watch GoMotion bring it to life with cinematic flair.",
        icon: "Zap",
      },
      {
        title: "Perfect for All Platforms",
        description: "Create animations optimized for Instagram, TikTok, YouTube, and any screen size automatically.",
        icon: "Users",
      },
      {
        title: "Brand-Consistent Animations",
        description: "Import your brand assets in one click and maintain consistency across all your animated content.",
        icon: "DollarSign",
      },
    ],
  },
  how: {
    title: "How Gomotion Transforms Your Content Creation",
    description: "From concept to stunning animation in just a few simple steps.",
    steps: [
      {
        step: 1,
        title: "Describe Your Vision",
        description: "Simply type what you want your text or graphics to do—no technical jargon needed.",
      },
      {
        step: 2,
        title: "Choose Your Style",
        description: "Select from cinematic effects, brand templates, or let AI choose the perfect animation style.",
      },
      {
        step: 3,
        title: "Generate & Customize",
        description: "Watch your animation come to life instantly, then fine-tune colors, timing, and effects.",
      },
      {
        step: 4,
        title: "Export & Share",
        description: "Download in any format or size optimized for your target platform and audience.",
      },
    ],
  },
  doMore: {
    title: "Do More with Gomotion",
    description: "Unlock the full potential of AI-powered motion graphics for your content strategy.",
    features: [
      {
        title: "Narrative Mode",
        description: "Create end-to-end animated stories with synced images and videos from just a script.",
      },
      {
        title: "Multi-Screen Optimization",
        description: "Generate versions for every platform—from mobile to desktop, Instagram to YouTube.",
      },
      {
        title: "Brand Asset Integration",
        description: "Import your logos, fonts, and colors to maintain consistent branding across all animations.",
      },
      {
        title: "AI-Powered Creativity",
        description: "Let our AI suggest creative effects and transitions that match your content style and audience.",
      },
      {
        title: "Batch Processing",
        description:
          "Create multiple variations of your animations for A/B testing and different platforms simultaneously.",
      },
      {
        title: "Professional Templates",
        description: "Start with proven animation templates designed for maximum engagement and conversion.",
      },
    ],
  },
  faq: [
    {
      question: "Do I need animation experience to use Gomotion?",
      answer:
        "Not at all! Gomotion is designed for creators of all skill levels. Simply describe what you want in plain English, and our AI will create professional animations for you. No keyframes, no complex software knowledge required.",
    },
    {
      question: "What types of content can I create with Gomotion?",
      answer:
        "You can create animated text, logos, titles, captions, product demos, social media content, ads, and full animated stories. Our Narrative Mode even lets you turn scripts into complete videos with synced visuals.",
    },
    {
      question: "Which platforms and formats are supported?",
      answer:
        "Gomotion creates content optimized for all major platforms including Instagram, TikTok, YouTube, Twitter, and LinkedIn. Export in any resolution from mobile-friendly vertical videos to desktop-wide formats.",
    },
    {
      question: "Can I use my own brand assets?",
      answer:
        "Yes! You can import your brand colors, fonts, logos, and other assets in one click. All your animations will maintain consistent branding across your content.",
    },
    {
      question: "How fast can I create animations?",
      answer:
        "Most animations are generated in seconds to minutes. Complex narrative mode videos might take a few minutes, but you'll still create professional content faster than traditional animation tools.",
    },
  ],
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
