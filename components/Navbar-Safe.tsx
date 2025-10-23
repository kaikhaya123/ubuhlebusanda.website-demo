"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration issues by only running client-side code after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  if (!mounted) {
    // Return a static version during SSR
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/Images/chatgpt-2025-09-29-08-16-40.png" 
                alt="Ubuhlebusanda Logo" 
                width={40} 
                height={40}
                className="rounded"
              />
              <span className="font-bold text-xl text-gray-800">Ubuhlebusanda</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
                Projects
              </Link>
            </div>
            
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/Images/chatgpt-2025-09-29-08-16-40.png" 
              alt="Ubuhlebusanda Logo" 
              width={40} 
              height={40}
              className="rounded"
            />
            <span className="font-bold text-xl text-gray-800">Ubuhlebusanda</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
              Projects
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link href="/projects" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}