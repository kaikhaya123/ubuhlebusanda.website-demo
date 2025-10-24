"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from './Lightbox'

type LightboxItem = { src: string; type: 'image' | 'video'; alt?: string; caption?: string | string[]; position?: string }
type AboutProps = { hideDuplicateName?: boolean; fullDisplay?: boolean }

export default function About({ hideDuplicateName = false, fullDisplay = false }: AboutProps) {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const lbItems: LightboxItem[] = [
  { src: '/images/Siyanda Mkhize.jpg', type: 'image', alt: 'Siyanda Mkhize', caption: ['Siyanda Mkhize', 'Founder & Lead Electrician'], position: 'center 40%' },
  { src: '/images/Wife.jpg', type: 'image', alt: 'Co-founder', caption: ['His Lovely Wife', 'Co-founder & operations partner'], position: 'center 45%' }
  ]

  // Compact teaser for homepage
  if (!fullDisplay) {
    return (
      <section id="about" className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-full overflow-hidden rounded shadow">
              <Image src="/images/chatgpt-2025-09-29-08-16-40.png" alt="Team at work" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Who We Are</h2>
            <p className="mt-4 text-gray-700">Ubuhlebusanda Pty Ltd is a trusted electrical installation company, proudly supplying and installing Lorenzetti products and offering reliable solar backup solutions. We focus on safe, professional, and affordable services that keep your home or business powered at all times.</p>
            <p className="mt-3 text-gray-600 italic">Powering progress, one connection at a time.</p>
            <div className="mt-4">
                <Link href="/about" className="text-black underline">Read more</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="about" className="py-20 bg-gray-50 section-divider">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image and decorative icon */}
        <div className="relative flex justify-center items-center">
          {/* Decorative icon */}
          <div className="absolute -left-10 top-8 hidden md:block">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#222" strokeWidth="3">
                {[...Array(16)].map((_,i)=>(
                  <line key={i} x1="30" y1="6" x2="30" y2="16" transform={`rotate(${i*22.5} 30 30)`}/>
                ))}
              </g>
              <circle cx="30" cy="30" r="8" fill="#222" />
            </svg>
          </div>
          <Image
            src="/images/premium_photo-1671808062726-2a7ffcd6109e.jpg"
            alt="About Us"
            width={400}
            height={500}
            className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* Right: Heading and text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 leading-tight font-heading">ABOUT US</h2>
          <div className="text-gray-700 text-lg md:text-xl max-w-xl">
            <p className="mb-6">
              Ubuhlebusanda started as a small electrical and building services company, aiming to help homeowners and businesses achieve their vision with quality, safety, and care. We soon realized the importance of guiding our clients through every step, from planning to completion, ensuring their needs are met beyond expectations.
            </p>
            <p>
              Today, we offer electrical installations, renovations, plumbing, carpentry, and more—helping our customers create safe, beautiful, and functional spaces. We value our clients above all, and we never settle for &#39;OK&#39;—only excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Founders / People section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portrait card: Siayanda (tall) */}
            <div className="relative rounded overflow-hidden shadow h-[64vh] md:h-[72vh]">
              <figure className="w-full h-full m-0 relative group">
                <button
                  aria-label="Open Siayanda photo"
                  aria-describedby="caption-siayanda"
                  className="w-full h-full relative focus:outline-none focus-visible:ring-4 focus-visible:ring-black"
                  onClick={() => { setLbIndex(0); setLbOpen(true) }}
                >
                  <Image
                    src="/images/Siyanda Mkhize.jpg"
                    alt="Siayanda Mkhize"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus:scale-105"
                    sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                    style={{ objectPosition: 'center 40%' }}
                  />
                </button>
                <figcaption id="caption-siyanda" className="absolute left-4 bottom-4 bg-white/95 rounded px-3 py-2 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold">Siyanda Mkhize</h3>
                  <p className="text-xs text-gray-700">Founder & Lead Electrician</p>
                </figcaption>
              </figure>
            </div>

            {/* Portrait card: Co-founder (tall but slightly shorter) */}
            <div className="relative rounded overflow-hidden shadow h-[56vh] md:h-[64vh]">
              <figure className="w-full h-full m-0 relative group">
                <button
                  aria-label="Open co-founder photo"
                  aria-describedby="caption-wife"
                  className="w-full h-full relative focus:outline-none focus-visible:ring-4 focus-visible:ring-black"
                  onClick={() => { setLbIndex(1); setLbOpen(true) }}
                >
                  <Image
                    src="/images/Wife.jpg"
                    alt="Co-founder"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus:scale-105"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    style={{ objectPosition: 'center 45%' }}
                  />
                </button>
                <figcaption id="caption-wife" className="absolute left-4 bottom-4 bg-white/95 rounded px-3 py-2 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold">Buhle Mkhize</h3>
                  <p className="text-xs text-gray-700">Co-founder & Operations Partner</p>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Short mission / values */}
          <div className="mt-6 bg-white rounded shadow p-6">
            <h4 className="font-semibold">Our Mission</h4>
            <p className="mt-2 text-sm text-gray-700">At Ubuhlebusanda Pty Ltd, we deliver scalable, safe, and future-ready electrical solutions tailored to your needs. As authorized suppliers and installers of Lorenzetti products, we combine trusted technology with expert workmanship. From essential electrical setups to solar backup systems, our mission is to keep your world running without interruption — reliably, affordably, and professionally.</p>
            <p className="mt-3 text-sm font-medium text-gray-900 italic">Powering progress, one connection at a time.</p>
          </div>
        </div>

        {/* Sidebar: timeline & quick facts */}
        <aside className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">Quick Facts</h4>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>Founded: 2018</li>
              <li>Family-run</li>
              <li>Operates across KwaZulu-Natal</li>
            </ul>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-sm text-gray-700 mt-2">For quotes and enquiries, call or send a message via our contact page.</p>
            <div className="mt-3">
              <Link href="/services" className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">Our Services</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Timeline / Journey */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold">Our Journey</h3>
        <p className="text-sm text-gray-600 mt-2">A short timeline of milestones from our founding in 2018 to today.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">2018 — Founded</h4>
            <p className="text-sm text-gray-600 mt-1">Started as a local family electrical service.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">2019-2020 — Growing</h4>
            <p className="text-sm text-gray-600 mt-1">Expanded to maintenance and small commercial projects.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">2021 — Trusted Locally</h4>
            <p className="text-sm text-gray-600 mt-1">Became a trusted local provider for safety-focused installations.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">2022-2023 — Service Expansion</h4>
            <p className="text-sm text-gray-600 mt-1">Introduced specialist work and supplier partnerships.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">2024-2025 — Today</h4>
            <p className="text-sm text-gray-600 mt-1">Continuing to deliver quality work and training apprentices.</p>
          </div>
        </div>
      </div>

      {/* Services & community cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-6">
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
            <li>Professional electrical installations</li>
            <li>Lorenzetti product supply & installation</li>
            <li>Solar backup solutions</li>
            <li>Residential & commercial projects</li>
            <li>Diagnostics & repairs</li>
          </ul>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h4 className="font-semibold">Quality & Innovation</h4>
          <p className="mt-2 text-sm text-gray-700">We deliver scalable, safe, and future-ready solutions that meet the highest standards. Every project combines trusted technology with expert workmanship for lasting results.</p>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h4 className="font-semibold">Customer Care</h4>
          <p className="mt-2 text-sm text-gray-700">With a growing community of satisfied clients, we&apos;re committed to service excellence. From essential setups to sustainable energy, we make it happen — reliably and affordably.</p>
        </div>
      </div>

      {/* Testimonials (small) and CTA */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h4 className="font-semibold">What clients say</h4>
          <blockquote className="mt-4 text-sm text-gray-700">&quot;Professional, on-time, and thorough — they fixed our installation and explained everything clearly.&quot;</blockquote>
        </div>

        <div className="bg-black text-white rounded shadow p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold">Ready to start?</h4>
            <p className="mt-2 text-sm">Request a quote or book a consultation.</p>
          </div>
          <div className="mt-4">
            <Link href="/api/contact" className="inline-block bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Lightbox (kept at bottom to overlay when open) */}
      <Lightbox open={lbOpen} index={lbIndex} items={lbItems} onClose={() => setLbOpen(false)} onPrev={() => setLbIndex(i => i > 0 ? i - 1 : lbItems.length - 1)} onNext={() => setLbIndex(i => (i + 1) % lbItems.length)} />
    </section>
  )
}
