import React, { useState, useEffect, useRef } from 'react'


// Helper component to load Lottie animation from public folder
function SuccessLottie() {
  const [animationData, setAnimationData] = React.useState<any>(null);
  React.useEffect(() => {
    fetch('/lottie/Email Sent.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);
  if (!animationData) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="mt-4 flex flex-col items-center justify-center p-3 bg-green-50 text-green-800 rounded shadow"
    >
      <Lottie
        animationData={animationData}
        play
        style={{ width: 80, height: 80, marginBottom: 8 }}
      />
      <span>Message sent — thank you.</span>
    </motion.div>
  );
}
import { UserIcon, EnvelopeIcon, PencilSquareIcon, PhoneIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'react-lottie-player'

// Next.js: load Lottie animation from public folder at runtime

export default function Contact(){
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  // Map/modal state
  const [mapOpen, setMapOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const previousActive = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMapOpen(false)
    }
    if (mapOpen) {
      previousActive.current = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', onKey)
      setTimeout(() => closeBtnRef.current?.focus(), 0)
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      try { previousActive.current?.focus() } catch (e) {}
    }
  }, [mapOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    let recaptchaToken: string | undefined
    if (typeof window !== 'undefined' && (window as any).grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      try {
        recaptchaToken = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact' })
      } catch (err) {
        console.warn('Recaptcha execute failed', err)
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, recaptchaToken, hp: honeypot })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setHoneypot('')
      // auto-hide success after 4s and reset to idle
      setTimeout(()=> setStatus('idle'), 4000)
    } catch (err: any) {
      setError(err?.message || 'Submission failed')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 section-divider">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 border rounded-lg shadow-sm text-black">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <EnvelopeIcon className="w-6 h-6 text-black" />
            Contact Us
          </h3>
          {/* Name Field */}
          <label className="block mt-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-black" />
              Name
            </span>
            <input 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              className="w-full mt-2 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base text-black" 
              placeholder="Your full name"
            />
          </label>
          {/* Email Field */}
          <label className="block mt-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4 text-black" />
              Email *
            </span>
            <input 
              required 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              type="email" 
              className="w-full mt-2 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base text-black" 
              placeholder="your.email@example.com"
            />
          </label>
          {/* Message Field */}
          <label className="block mt-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <PencilSquareIcon className="w-4 h-4 text-black" />
              Message *
            </span>
            <textarea 
              required 
              value={message} 
              onChange={e=>setMessage(e.target.value)} 
              className="w-full mt-2 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base resize-none text-black" 
              rows={5} 
              placeholder="Tell us about your project..."
            />
          </label>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button 
              type="submit" 
              disabled={status==='sending'} 
              className="w-full sm:w-auto px-6 py-3 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-900 disabled:bg-gray-400 transition-colors duration-200 text-base"
            >
              {status==='sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status==='error' && <div className="text-red-600 text-sm">{error}</div>}
          </div>

          {/* Honeypot - visually hidden but present in DOM */}
          <div aria-hidden style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
            <label>Do not fill<input name="hp" value={honeypot} onChange={e=>setHoneypot(e.target.value)} /></label>
          </div>

          {/* Success Lottie animation with auto-dismiss */}
          <AnimatePresence>
            {status==='success' && (
              <SuccessLottie />
            )}
          </AnimatePresence>
        </form>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-black">
          <h4 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <BuildingOffice2Icon className="w-6 h-6 text-black" />
            Business Info
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-base">076 425 7905</p>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-base">065 937 8948</p>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-base">siyanda@ubuhlebusanda.co.za</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-base">Durban, KwaZulu-Natal</p>
            </div>
          </div>

          <div className="mt-6 w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden relative shadow-md">
            <iframe
              title="Ubuhle Busanda location — Durban, KwaZulu-Natal"
              src="https://www.google.com/maps?q=Durban%2C%20KwaZulu-Natal&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-hidden={mapOpen}
            />
            <button
              onClick={() => setMapOpen(true)}
              className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 hover:bg-white px-3 py-2 rounded-lg shadow-md text-sm font-medium transition-all duration-200 touch-manipulation"
              aria-label="Open map in full screen"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Expand
            </button>
          </div>

          <AnimatePresence>
            {mapOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/60" onClick={() => setMapOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-4xl mx-4 md:mx-0 h-[80vh] bg-white rounded overflow-hidden">
                      <button
                        ref={closeBtnRef}
                        onClick={() => setMapOpen(false)}
                        className="absolute right-3 top-3 z-20 bg-white rounded px-3 py-1 shadow"
                      >
                        Close
                      </button>
                      <iframe
                        title="Ubuhle Busanda — interactive map"
                        src="https://www.google.com/maps?q=Durban%2C%20KwaZulu-Natal&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
