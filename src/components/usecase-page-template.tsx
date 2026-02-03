"use client"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Star, Play, Users, Building2, Megaphone, GraduationCap, Layers, ArrowUpRight } from "lucide-react"
import IconFromName from "@/components/icon-from-name"
import type { SEOPageData } from "@/types/seo-data"
import Link from "next/link"

interface UseCasePageTemplateProps {
  data: SEOPageData
}

export function UseCasePageTemplate({ data }: UseCasePageTemplateProps) {

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
 

      {/* Hero Section */}
      <section className="py-20 lg:pb-6 pb-6 lg:py-28 ">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              {/* Top Badge (optional) */}
              {data.hero.badgeText && (
                <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-6 text-sm py-3 rounded-full mb-12 font-medium">
                  <span className="text-indigo-500 mr-2">🏆</span>
                  {data.hero.badgeText}
                  <span className="text-indigo-500 ml-2">🏆</span>
                </div>
              )}

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-black leadin max-w-5xl mx-auto">
                {data.hero.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-md lg:text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                {data.hero.subheadline}
              </p>

              {/* Key Benefits Points */}
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                {(data.hero.points && data.hero.points.length > 0
                  ? data.hero.points
                  : [
                      'AI-Powered Motion Design',
                      'Fast Delivery',
                      'Professional Results',
                    ]
                ).map((p, i) => (
                  <div key={i} className="flex items-center text-gray-700 font-medium">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    {p}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                <Link href="/explore">
                  <Button
                    size="lg"
                    className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg font-medium"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Creating Now
                  </Button>
                </Link>
                <Link href="https://discord.gg/Wd4nCJhCgd" target="_blank" rel="noreferrer">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-black hover:bg-indigo-200 cursor-pointer rounded-full px-8 py-4 text-lg font-medium"
                  >
                    Request a demo
                  </Button>
                </Link>
              </div>

              <div className="mb-12">
                {data.images && data.images[0]?.url ? (
                  <img
                    src={data.images[0].url}
                    alt={data.images[0].alt || `${data.usecase.replaceAll('-', ' ')} illustration`}
                    className="w-[80%] mx-auto rounded-3xl shadow-lg object-cover"
                  />
                ) : (
                  <img
                    src="/images/usecase.png"
                    alt="Use cases illustration"
                    className="w-[80%] mx-auto rounded-3xl shadow-lg object-cover"
                  />
                )}
              </div>

              

              {/* Trust Indicator (optional, data-driven) */}
              {/* {(data.trust?.badgeText || (data.trust?.logos && data.trust.logos.length > 0)) && (
                <div className="mb-6">
                  {data.trust?.badgeText && (
                    <p className="text-indigo-500 font-medium text-lg mb-8">{data.trust.badgeText}</p>
                  )}
                  {data.trust?.logos && data.trust.logos.length > 0 && (
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                      {data.trust.logos.map((l, i) => (
                        l.url ? (
                          <img key={i} src={l.url} alt={l.name || 'logo'} className="h-8 object-contain" />
                        ) : (
                          <div key={i} className="text-2xl font-bold text-gray-400">{l.name}</div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <div className="bg-gray-50 rounded-2xl p-8 pt-0 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-lg text-black mb-6 text-center leading-relaxed">
            {data.testimonial.quote}
          </blockquote>
          <div className="text-center">
            <div className="font-semibold text-black">{data.testimonial.author}</div>
            <div className="text-gray-600">
              {data.testimonial.role}
            </div>
          </div>
        </div>
      )}

      {/* Why Section */}
      <section id="why" className="py-24 bg-gray-100 rounded-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-sans text-black">
              {data.why.title}
            </h2>
            <p className="text-md lg:text-lg text-gray-600 leading-relaxed">
              {data.why.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.why.benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full mb-6 mx-auto">
                  <IconFromName name={benefit.icon} className="text-white h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-4 text-black text-center">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Section (SEO-friendly, alternating layout) */}
      <section id="how" className="py-24 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-black font-sans">
              {data.how.title}
            </h2>
            <p className="text-md lg:text-lg text-gray-600 leading-relaxed">
              {data.how.description}
            </p>
          </div>

          {data.how.steps.map((step, index) => {
            const fallbacks = [
              "/images/how-illustration-1.png",
              "/images/how-illustration-2.png",
              "/images/how-illustration-3.png",
            ]
            const img = fallbacks[index % fallbacks.length] // step.imageUrl || (data.images && data.images[index + 1]?.url) || fallbacks[index % fallbacks.length]
            const isEven = index % 2 === 0

            const TextBlock = (
              <div>
                <div className="text-sm text-indigo-500 font-semibold tracking-wide mb-2">
                  Step {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-base lg:text-lg leading-8">
                  {step.description}
                </p>
              </div>
            )

            const ImageBlock = (
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl p-4 lg:p-6 h-56 sm:h-64 lg:h-80 flex items-center justify-center">
                  <img
                    src={img}
                    alt={step.imageAlt || `${step.title} illustration`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            )

            // Responsive ordering: image first on mobile, alternate on desktop
            const textOrder = isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
            const imageOrder = isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto mb-16"
              >
                <div className={textOrder}>{TextBlock}</div>
                <div className={imageOrder}>{ImageBlock}</div>
              </div>
            )
          })}

          <div className="text-center mt-12 flex items-center justify-center gap-4">
            <Link href="/explore">
              <Button className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg font-medium">
                Start Creating Now
              </Button>
            </Link>
            <Link href="https://discord.gg/Wd4nCJhCgd" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="border-2 border-indigo-300 hover:text-white hover:bg-indigo-800 rounded-full px-8 py-4 text-lg bg-transparent"
              >
                Request a demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-black font-sans">
                Key Benefits of Our System for Your Business Efficiency
              </h2>
              <p className="text-md lg:text-lg text-gray-600 mb-8 leading-relaxed">
                Our system delivers productivity, controls, and efficiency improvements that transform how you work.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-black mb-2">Boosting Quality with Tech</h3>
                    <p className="text-gray-600">
                      Advanced AI algorithms ensure consistent, high-quality output every time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-black mb-2">Optimization Production Process</h3>
                    <p className="text-gray-600">
                      Streamlined workflows reduce time-to-market and increase efficiency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-black mb-2">AI-Driven Production</h3>
                    <p className="text-gray-600">
                      Intelligent automation handles complex tasks while you focus on creativity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black mb-2">1951+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <div className="text-6xl">📊</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Do More Section */}
      {data.doMore && data.doMore.features && data.doMore.features.length > 0 && (
        <section id="more" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-sans text-black">
                {data.doMore.title}
              </h2>
              <p className="text-md lg:text-lg text-gray-600 leading-relaxed">
                {data.doMore.description}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.doMore.features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-3 text-black">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications / Use Cases Section */}
      {data.applications && data.applications.items && data.applications.items.length > 0 && (
        <section id="applications" className="py-24 bg-white rounded-t-2xl">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-sans text-black">
                {data.applications.title}
              </h2>
              <p className="text-gray-600 text-lg">Explore product‑focused scenarios tailored to your needs.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {data.applications.items.map((item, i) => {
                const label = (item.title || '').toLowerCase()
                const IconComp = label.includes('creator')
                  ? Users
                  : label.includes('business') || label.includes('brand')
                  ? Building2
                  : label.includes('marketing')
                  ? Megaphone
                  : label.includes('educat') || label.includes('coach')
                  ? GraduationCap
                  : Layers

                const slug = item.slug || data.relatedSlugs?.[i]
                const CardInner = (
                  <div className="group rounded-2xl p-6 lg:p-7 bg-white border border-gray-200 shadow-sm hover:border-indigo-300 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-bold text-indigo-600">{String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-black">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    {slug && (
                      <div className="mt-4 inline-flex items-center text-indigo-700 font-semibold group-hover:underline">
                        Learn more
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </div>
                    )}
                  </div>
                )

                return slug ? (
                  <Link key={i} href={`/usecases/${slug}`} className="block">{CardInner}</Link>
                ) : (
                  <div key={i}>{CardInner}</div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Use Cases */}
      {data.relatedSlugs && data.relatedSlugs.length > 0 && (
        <section id="related" className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-black">Related Use Cases</h3>
            <div className="flex flex-wrap gap-3">
              {data.relatedSlugs.map((slug, i) => (
                <Link key={i} href={`/usecases/${slug}`} className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  {slug.replaceAll('-', ' ')}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long-form Section removed in favor of Applications */}

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white rounded-t-xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-black font-sans">Frequently Asked Questions</h2>
            <p className="text-md lg:text-lg text-gray-600 leading-relaxed">
              Everything you need to know about Gomotion for {data.audience.replace("-", " ")}.
            </p>
          </div>
          <div className="max-w-3xl mx-auto py-6">
            <Accordion type="single" collapsible className="space-y-4">
              {data.faq.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-indigo-200 bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-black">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 rounded-b-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 font-sans">
            Transform Your {data.usecase.replaceAll("-", " ")}?
          </h2>
          <p className="text-md lg:text-lg mb-12 text-gray-900 max-w-3xl mx-auto leading-relaxed">
            Join thousands of {data.audience.replaceAll("-", " ")} who are already using Gomotion to achieve better
            results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://discord.gg/Wd4nCJhCgd" target="_blank" rel="noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-indigo-300 hover:text-white hover:bg-indigo-800 rounded-full px-8 py-4 text-lg bg-transparent"
              >
                Request a demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.title,
            description: data.description,
            url: typeof window !== 'undefined' ? window.location.href : undefined,
          }),
        }}
      />
      {data.faq && data.faq.length > 0 && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: data.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}

      {/* Footer */}
      
    </div>
  )
}
