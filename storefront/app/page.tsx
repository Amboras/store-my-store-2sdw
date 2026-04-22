'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Leaf, Sparkles, Heart } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newsletterEmail.trim()) {
      return
    }

    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-muted/30 overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-center py-section lg:py-32">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              New Collection
            </p>
            <h1 className="text-display font-heading font-semibold text-balance">
              Elevate Your Everyday
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Thoughtfully designed products that bring beauty and function to your daily rituals.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="btn-brand-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-opacity"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-brand-primary border px-8 py-3.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-primary hover:text-white transition-colors"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-muted rounded-sm overflow-hidden animate-fade-in">
            <Image
              src={HERO_PLACEHOLDER}
              alt="Hero - New Collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Collections */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* Editorial / Brand Story Section */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image with floating badge */}
            <div className="relative lg:col-span-5">
              <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden relative">
                <Image
                  src={LIFESTYLE_PLACEHOLDER}
                  alt="Lifestyle - Our Philosophy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:flex absolute -bottom-6 -right-6 lg:-right-10 bg-background shadow-lg px-6 py-5 items-center gap-4 rounded-sm border">
                <p className="text-4xl font-heading font-semibold leading-none">2024</p>
                <div className="h-10 w-px bg-border" />
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                  Founded with<br />a purpose
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 lg:pl-8">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                — Our Philosophy
              </p>
              <h2 className="text-h2 font-heading font-semibold text-balance mb-6">
                Crafted With Intention,<br className="hidden sm:block" />
                Designed to Last.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-xl mb-10">
                We believe in fewer, better things — pieces that earn their place in your life
                and bring quiet joy to everyday moments.
              </p>

              {/* Three Pillars */}
              <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t">
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5">
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Quality</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Premium materials sourced from artisans who care about craft.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5">
                    <Leaf className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Sustainability</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ethically produced and packaged to minimize our footprint.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5">
                    <Heart className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Timeless</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Designs that transcend trends and only get better with time.
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide link-underline pb-0.5 mt-10"
                prefetch={true}
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Features Bar */}
      <section className="py-section-sm border-y">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <Truck className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <RotateCcw className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <Shield className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-section">
        <div className="container-custom max-w-xl text-center">
          <h2 className="text-h2 font-heading font-semibold">Stay in Touch</h2>
          <p className="mt-3 text-muted-foreground">
            Be the first to know about new arrivals, exclusive offers, and more.
          </p>
          <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border-b border-foreground/30 bg-transparent px-1 py-3 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-foreground text-background px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
