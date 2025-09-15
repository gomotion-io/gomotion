import Link from 'next/link'
import { loadBlogData } from '@/lib/blog-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Target } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases - Gomotion',
  description: 'Discover how Gomotion helps different audiences create stunning AI-powered motion graphics for their specific needs.',
}

export default function UseCasesPage() {
  const blogPosts = loadBlogData()

  return (
    <div className="min-h-screen ">
      {/* Header */}
     
      {/* Hero Section */}
      <section className="py-20 lg:py-28 ">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight">
              Use Cases & Audiences
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
              Explore product‑focused scenarios tailored to creators, teams, and industries. 
              Flat, fast, and on‑brand—pick a use case to see the full page.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center text-gray-700 font-medium">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                Product‑Focused
              </div>
              <div className="flex items-center text-gray-700 font-medium">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                Platform‑Ready
              </div>
              <div className="flex items-center text-gray-700 font-medium">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                Easy to Use
              </div>
            </div>
            {blogPosts.length > 0 && (
              <Link href={`/usecases/${blogPosts[0].slug || `${blogPosts[0].audience}-${blogPosts[0].usecase}`}` }>
                <Button size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="use-cases" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Explore Our Use Cases</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Each page is tailored to a specific audience and outcome.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <Link 
                key={index} 
                href={`/usecases/${post.slug || `${post.audience}-${post.usecase}`}`}
                className="group"
              >
                <Card className="h-full border-gray-200 hover:border-indigo-300 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <Users className="w-3 h-3 mr-1" />
                        {post.audience.replace(/-/g, ' ')}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-700">
                        <Target className="w-3 h-3 mr-1" />
                        {post.usecase.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-black group-hover:text-indigo-700 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center text-indigo-700 font-semibold group-hover:underline">
                      View use case
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">What’s inside each page</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Clear benefits, step‑by‑step “How it works”, application ideas, FAQs, and internal links—built for SEO and clarity.
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-10 text-left">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-1">Benefits</h4>
                  <p className="text-gray-600 text-sm">Concrete outcomes and why it matters for the audience.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">How it works</h4>
                  <p className="text-gray-600 text-sm">Three concise steps with platform‑ready imagery.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Use cases + FAQ</h4>
                  <p className="text-gray-600 text-sm">Application ideas and long‑tail answers with schema.</p>
                </div>
              </div>
            </div>
            {blogPosts.length > 0 && (
              <Link href={`/usecases/${blogPosts[0].slug || `${blogPosts[0].audience}-${blogPosts[0].usecase}`}` }>
                <Button size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg">
                  View a sample page
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Ready to transform your content?</h2>
          <p className="text-lg mb-10 text-gray-700 max-w-3xl mx-auto">Create scroll‑stopping, on‑brand motion graphics in minutes—no complex tools required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-4 text-lg">
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-indigo-300 hover:text-white hover:bg-indigo-800 rounded-full px-8 py-4 text-lg bg-transparent">
              Request a demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}
