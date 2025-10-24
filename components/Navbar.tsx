"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { useIsClient } from '../lib/hooks'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const isClient = useIsClient()
  const debounceRef = useRef<number | null>(null)
  
  useEffect(()=>{
    if (!isClient) return
    
    const hero = document.getElementById('hero')
    // prefer IntersectionObserver when hero exists; use a larger threshold to avoid rapid toggles while scrolling
    if (hero){
      const obs = new IntersectionObserver((entries)=>{
        const isIntersecting = entries[0].isIntersecting
        // debounce toggles to avoid flashing while user scrolls quickly
        if (debounceRef.current) window.clearTimeout(debounceRef.current)
        debounceRef.current = window.setTimeout(()=> setIsScrolled(!isIntersecting), 120)
      }, {root:null, threshold:0.45, rootMargin: '0px'})
      obs.observe(hero)
      return ()=>{
        obs.disconnect()
        if (debounceRef.current) window.clearTimeout(debounceRef.current)
      }
    }
    // fallback: debounce scroll handler
    const onScroll = ()=>{
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
      debounceRef.current = window.setTimeout(()=> setIsScrolled(window.scrollY > 40), 120)
    }
    window.addEventListener('scroll', onScroll, {passive:true})
    onScroll()
    return ()=>{
      window.removeEventListener('scroll', onScroll)
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  },[isClient])
  function handleLogoClick(e: React.MouseEvent){
    e.preventDefault()
    if (pathname === '/'){
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    router.push('/');
    setTimeout(() => {
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }
  const linkClass = (href:string) => {
    // normalize comparison: treat '/#section' as homepage
    const hrefPath = href.split('#')[0] || '/'
    const isActive = hrefPath === '/' ? pathname === '/' : pathname.startsWith(hrefPath)
    // animated underline approach using a pseudo-element (::after) so we get a smooth reveal
    const activeAfter = "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-amber-600 after:origin-left after:scale-x-100 after:transition-transform after:duration-300"
    const inactiveAfter = "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-amber-600 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    // when not home we use dark links; on home we prefer white so they blend with hero
    if (!isHome) return `relative inline-block text-sm ${isActive ? `font-semibold text-amber-600 ${activeAfter}` : `text-gray-700 hover:text-gray-900 ${inactiveAfter}`}`
    // add small text-shadow for contrast when over images
    return `relative inline-block text-sm ${isActive ? `font-semibold text-white ${activeAfter}` : `text-white/90 hover:text-white ${inactiveAfter}`} ${showTransparent ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : ''}`
  }
  const isHome = pathname === '/'
  const showTransparent = isHome && !isScrolled
  const headerRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef(0)
  const [hidden, setHidden] = useState(false)
  
  // keep a CSS variable with the nav height so other components can offset themselves
  useEffect(()=>{
    if (!isClient) return
    
    function updateHeight(){
      const h = headerRef.current?.offsetHeight ?? 0
      try{ document.documentElement.style.setProperty('--nav-height', `${h}px`) }catch(e){}
      // if header is fixed (not transparent over hero), add body padding so page content isn't hidden
      if (!showTransparent){
        try{ document.body.style.paddingTop = `${h}px` }catch(e){}
      } else {
        try{ document.body.style.paddingTop = '0px' }catch(e){}
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return ()=> window.removeEventListener('resize', updateHeight)
  },[isClient, showTransparent])

  // auto-hide on scroll down, show on scroll up
  useEffect(()=>{
    if (typeof window === 'undefined') return
    let ticking = false
    function onScroll(){
      const y = window.scrollY
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(()=>{
        const delta = y - (lastScrollY.current || 0)
        const nearTop = y < 80
        const userHasFocusInside = headerRef.current ? headerRef.current.contains(document.activeElement) : false
        // don't hide when mobile menu is open or focus is inside nav
        if (open || userHasFocusInside) {
          setHidden(false)
        } else if (nearTop) {
          setHidden(false)
        } else if (delta > 12) {
          // scrolling down
          setHidden(true)
        } else if (delta < -12) {
          // scrolling up
          setHidden(false)
        }
        lastScrollY.current = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=> window.removeEventListener('scroll', onScroll)
  },[open])

  return (
  <header ref={headerRef} className={`w-full ${showTransparent ? 'absolute top-0' : 'fixed top-0'} z-40 transition-all duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'} ${showTransparent ? 'bg-transparent border-b border-white/10' : 'bg-white/95 shadow-sm border-b border-gray-200'}`} role="banner">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* subtle overlay behind nav items when header is transparent to improve legibility */}
        <div aria-hidden className={`pointer-events-none absolute left-0 right-0 top-0 h-full mix-blend-overlay transition-opacity duration-300 ${showTransparent ? 'opacity-100 bg-gradient-to-r from-black/20 via-black/10 to-transparent' : 'opacity-0'}`} />
  <Link href="/" onClick={handleLogoClick} className="inline-flex items-center gap-3 px-3 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300" aria-label="Ubuhlebusanda home">
          <span className="sr-only">Ubuhlebusanda</span>
          {/* keep navbar height small while visually enlarging the logo, especially on mobile */}
          <div className="relative w-56 sm:w-72 md:w-96 h-24 sm:h-20 md:h-24 overflow-visible">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-full overflow-visible -translate-y-1 transform scale-[2] sm:scale-[1.7] md:scale-[1.9]">
                <Image
                  src="/Images/chatgpt-2025-09-29-08-16-40.png"
                  alt="Ubuhlebusanda logo"
                  width={1200}
                  height={360}
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 280px, 384px"
                  priority
                  quality={100}
                  className="w-full h-full object-contain filter contrast-105 saturate-105"
                />
              </div>
            </div>
          </div>
        </Link>

        <nav className="space-x-6 hidden md:flex items-center" role="navigation" aria-label="Primary">
          <Link href="/" className={linkClass('/')} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link href="/about" className={linkClass('/about')} aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
          <Link href="/services" className={linkClass('/services')} aria-current={pathname.startsWith('/services') ? 'page' : undefined}>Services</Link>
          <Link href="/projects" className={linkClass('/projects')} aria-current={pathname.startsWith('/projects') ? 'page' : undefined}>Projects</Link>
          <Link href="/#testimonials" className={linkClass('/#testimonials')} aria-current={pathname === '/' ? 'page' : undefined}>Testimonials</Link>
          <Link href="/#contact" className={linkClass('/#contact')} aria-current={pathname === '/' ? 'page' : undefined}>Contact</Link>
            <Link href="/#contact" className={`${isHome ? 'bg-white/10 text-white' : 'bg-amber-100 text-black'} inline-block mt-2 px-4 py-2 rounded shadow`}>Get a Quote</Link>
        </nav>

        {/* Mobile menu toggle - Animated Hamburger */}
        <button 
          aria-label={open ? 'Close menu' : 'Open menu'} 
          aria-expanded={open} 
          onClick={()=>setOpen(v => !v)} 
          className="md:hidden p-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition-all hover:bg-white/10 active:scale-95"
        >
          <div className="w-7 h-6 relative flex flex-col justify-center gap-1.5">
            {/* Top line */}
            <span 
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                showTransparent ? 'bg-white' : 'bg-gray-900'
              } ${
                open ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
              }`}
            />
            {/* Middle line */}
            <span 
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                showTransparent ? 'bg-white' : 'bg-gray-900'
              } ${
                open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            {/* Bottom line */}
            <span 
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${
                showTransparent ? 'bg-white' : 'bg-gray-900'
              } ${
                open ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
              }`}
            />
          </div>
        </button>
      </div>
      {/* Mobile menu - improved styling and layout */}
      {open && (
        <div className="md:hidden border-t border-white/20" aria-hidden={false}>
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 bg-white">
              <Link 
                href="/" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname === '/' ? 'font-semibold bg-gray-100' : ''}`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname === '/about' ? 'font-semibold bg-gray-100' : ''}`}
              >
                About
              </Link>
              <Link 
                href="/services" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname.startsWith('/services') ? 'font-semibold bg-gray-100' : ''}`}
              >
                Services
              </Link>
              <Link 
                href="/projects" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname.startsWith('/projects') ? 'font-semibold bg-gray-100' : ''}`}
              >
                Projects
              </Link>
              <Link 
                href="/#testimonials" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname === '/' ? 'font-semibold bg-gray-100' : ''}`}
              >
                Testimonials
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setOpen(false)}
                className={`text-black hover:text-gray-900 text-lg py-2 px-2 rounded-lg transition-colors ${pathname === '/' ? 'font-semibold bg-gray-100' : ''}`}
              >
                Contact
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setOpen(false)}
                className="bg-black text-white border border-black inline-block mt-4 px-6 py-3 rounded-lg font-medium text-center transition-all hover:shadow-lg"
              >
                Get a Quote
              </Link>
          </div>
        </div>
      )}
    </header>
  )
}
