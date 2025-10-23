"use client"
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type PlayerItem = { src: string, type: 'image'|'video', alt?: string }

export default function FullscreenPlayer({ open, index = 0, items = [], onClose, onPrev, onNext }:{ open: boolean, index?: number, items?: PlayerItem[], onClose: ()=>void, onPrev?: ()=>void, onNext?: ()=>void }){
  const [current, setCurrent] = useState(index)
  const vidRef = useRef<HTMLVideoElement|null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState<number|undefined>(undefined)
  const containerRef = useRef<HTMLDivElement|null>(null)
  const closeRef = useRef<HTMLButtonElement|null>(null)
  const prevActiveRef = useRef<Element | null>(null)

  useEffect(() => { setCurrent(index) }, [index])

  useEffect(() => {
    if (!open) return
    // focus the close button when opened
    prevActiveRef.current = document.activeElement
    setTimeout(() => { closeRef.current?.focus() }, 0)

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === ' ' && vidRef.current) { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose, onPrev, onNext])

  // Focus trap: keep tab focus within the dialog
  useEffect(() => {
    if (!open) return
    const container = containerRef.current
    if (!container) return

    function getFocusable() {
      return Array.from(container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input[type="text"], input[type="range"], input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.hasAttribute('disabled'))
    }

    function onKey(e: KeyboardEvent){
      if (e.key !== 'Tab') return
      const focusable = getFocusable()
      if (!focusable.length) { e.preventDefault(); return }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !container.contains(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', onKey)
    return () => container.removeEventListener('keydown', onKey)
  }, [open])

  // restore focus when closed/unmounted
  useEffect(() => {
    return () => {
      try {
        const prev = prevActiveRef.current as HTMLElement | null
        if (prev && typeof prev.focus === 'function') prev.focus()
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    const onTime = () => setTime(v.currentTime)
    const onDur = () => setDuration(v.duration)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onDur)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onDur)
    }
  }, [current, open])

  useEffect(() => {
    // autoplay muted on open
    if (!open) return
    const v = vidRef.current
    if (v) {
      v.muted = true
      const p = v.play()
      if (p && typeof p.then === 'function') p.catch(()=>{})
      setPlaying(true)
    }
  }, [open, current])

  function togglePlay(){
    const v = vidRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  function seekTo(val:number){
    const v = vidRef.current
    if (!v) return
    try { v.currentTime = val } catch(e){}
  }

  if (!open) return null

  const item = items[current] || { src: '', type: 'video', alt: '' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" role="dialog" aria-modal="true" aria-label={item.alt || item.src} ref={containerRef}>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%' }}>
        <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
          {/* Close button - always visible at top */}
          <div className="absolute top-6 right-6 z-20">
            <button 
              ref={closeRef} 
              onClick={onClose} 
              aria-label="Close player" 
              className="bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Close</span>
            </button>
          </div>

          {/* Content container with fixed aspect ratio */}
          <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {item.type === 'video' ? (
                <video 
                  ref={vidRef} 
                  src={item.src} 
                  className="max-h-[85vh] max-w-full object-contain bg-black" 
                  playsInline 
                  controls={false} 
                  aria-label={`Video: ${item.alt || ''}`} 
                />
              ) : (
                <div className="relative h-full w-full">
                  <Image 
                    src={item.src} 
                    alt={item.alt || ''} 
                    fill 
                    className="object-contain" 
                    priority={true} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Controls overlay - semi-transparent background for better visibility */}
          <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              {onPrev && (
                <button 
                  onClick={() => { onPrev(); setCurrent(c => Math.max(0, c-1)) }} 
                  aria-label="Previous video" 
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              <button 
                onClick={togglePlay} 
                aria-pressed={playing} 
                aria-label={playing ? 'Pause' : 'Play'} 
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>

              <div className="flex-1 px-4">
                <input 
                  aria-label="Seek" 
                  type="range" 
                  min={0} 
                  max={duration || 0} 
                  step={0.01} 
                  value={time} 
                  onChange={(e)=>seekTo(Number(e.target.value))} 
                  className="w-full accent-amber-500 h-2 rounded-full bg-white/20" 
                />
              </div>

              {onNext && (
                <button 
                  onClick={() => { onNext(); setCurrent(c => Math.min(items.length-1, c+1)) }} 
                  aria-label="Next video" 
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
