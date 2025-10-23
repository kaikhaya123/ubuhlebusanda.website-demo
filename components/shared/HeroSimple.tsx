"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroSimple({
  title = 'Powering Homes & Businesses with Excellence',
  sub = 'Ubuhlebusanda Pty Ltd delivers trusted electrical installations and Lorenzetti product solutions across South Africa.',
  ctaText = 'Get a Quote',
  ctaHref = '#contact',
  bg = '/Images/pexels-lisa-anna-901356985-19866477.jpg'
}: {
  title?: string
  sub?: string
  ctaText?: string
  ctaHref?: string
  bg?: string
}){
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <section id="hero" className="relative h-[60vh] sm:h-[70vh] md:h-screen w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
        <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center items-center md:items-start pt-20 md:pt-24">
          <div className="py-8 sm:py-6 md:py-0 w-full max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">{title}</h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-xl mx-auto md:mx-0 leading-relaxed">{sub}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href={ctaHref} className="w-full sm:w-auto px-8 py-4 rounded-lg text-white font-medium bg-black hover:bg-gray-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl">{ctaText}</a>
              <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-200 text-center font-medium">View Our Work</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section id="hero" className="relative h-[60vh] sm:h-[70vh] md:h-screen w-full overflow-hidden" suppressHydrationWarning>
      <div className="absolute inset-0 -z-10" suppressHydrationWarning>
        <Image 
          src={bg} 
          alt="Hero background" 
          fill
          priority
          quality={85}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
      
      <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center items-center md:items-start pt-20 md:pt-24" suppressHydrationWarning>
        <div className="py-8 sm:py-6 md:py-0 w-full max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">{title}</h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-xl mx-auto md:mx-0 leading-relaxed">{sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href={ctaHref} className="w-full sm:w-auto px-8 py-4 rounded-lg text-white font-medium bg-black hover:bg-gray-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl">{ctaText}</a>
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-200 text-center font-medium">View Our Work</a>
          </div>
        </div>
      </div>
    </section>
  )
}
