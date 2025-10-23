"use client"
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroDiagonalSplit() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden" 
      style={{ paddingTop: 'var(--hero-offset, 0px)' }}
    >
      {/* Electrical Current Animation along diagonal */}
      <svg 
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FCD34D" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Diagonal line with glow */}
        <line 
          x1="0" 
          y1="0" 
          x2="100" 
          y2="100" 
          stroke="url(#electricGradient)" 
          strokeWidth="0.5" 
          filter="url(#glow)"
          className="animate-pulse"
        />
      </svg>

      <div className="relative h-full w-full">
        {/* LEFT SIDE - RESIDENTIAL (Dark Theme with Amber Accent) */}
        <div
          className="absolute top-0 left-0 h-full w-full md:w-1/2 overflow-hidden transition-all duration-700 ease-out"
          style={{
            clipPath: hoveredSide === 'left' 
              ? 'polygon(0 0, 55% 0, 55% 100%, 0 100%)' 
              : hoveredSide === 'right'
              ? 'polygon(0 0, 45% 0, 45% 100%, 0 100%)'
              : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/Images/pexels-lisa-anna-901356985-19866477.jpg"
              alt="Residential electrical services"
              fill
              priority
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/85" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Residential</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Powering
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                  Your Home
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md leading-relaxed">
                Expert electrical installations, repairs, and upgrades for homes across KwaZulu-Natal.
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 text-gray-300">
                {[
                  'Complete electrical installations',
                  'Safety inspections & COC',
                  'Smart home solutions',
                  'Emergency repairs 24/7'
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Home Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Trust Badge */}
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-gray-900 flex items-center justify-center text-white font-bold text-xs">
                    ⚡
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-gray-900 flex items-center justify-center text-white font-bold text-xs">
                    💡
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-700 border-2 border-gray-900 flex items-center justify-center text-white font-bold text-xs">
                    🏠
                  </div>
                </div>
                <span className="font-medium">500+ Happy Homeowners</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - COMMERCIAL (Light Theme with Blue Accent) */}
        <div
          className="absolute top-0 right-0 h-full w-full md:w-1/2 overflow-hidden transition-all duration-700 ease-out"
          style={{
            clipPath: hoveredSide === 'right'
              ? 'polygon(45% 0, 100% 0, 100% 100%, 45% 100%)'
              : hoveredSide === 'left'
              ? 'polygon(55% 0, 100% 0, 100% 100%, 55% 100%)'
              : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
          }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/Images/pexels-tima-miroshnichenko-7033665.jpg"
              alt="Commercial electrical services"
              fill
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-white/95 via-blue-50/95 to-blue-100/90" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 md:px-12 lg:px-16">
            <div className="ml-auto max-w-xl text-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Commercial</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Empowering
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                  Your Business
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md ml-auto leading-relaxed">
                Comprehensive electrical solutions for businesses, industrial facilities, and commercial properties.
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 text-gray-700">
                {[
                  'Industrial electrical systems',
                  '50kW+ solar installations',
                  'Preventive maintenance plans',
                  'Energy efficiency audits'
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 justify-end opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <span>{feature}</span>
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Business Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Trust Badge */}
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-600 justify-end">
                <span className="font-medium">100+ Commercial Projects</span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    ⚡
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    🏢
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    ☀️
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (Stacked) */}
        <div className="md:hidden absolute inset-0 flex flex-col">
          {/* Residential (Top Half) */}
          <div className="h-1/2 relative overflow-hidden">
            <Image
              src="/Images/pexels-lisa-anna-901356985-19866477.jpg"
              alt="Residential"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Powering <span className="text-amber-400">Your Home</span>
                </h2>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold"
                >
                  Home Services
                </a>
              </div>
            </div>
          </div>

          {/* Commercial (Bottom Half) */}
          <div className="h-1/2 relative overflow-hidden border-t-4 border-amber-500">
            <Image
              src="/Images/pexels-tima-miroshnichenko-7033665.jpg"
              alt="Commercial"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-100/90 flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Empowering <span className="text-blue-600">Your Business</span>
                </h2>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
                >
                  Business Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <span className="text-sm font-medium text-gray-500">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
