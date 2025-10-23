"use client"
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type StageItem = {
  id: string
  title: string
  type: 'image'|'video'
  img?: string
  poster?: string
  videoSrc?: string
  city?: string
}

export default function CinematicStage({ items = [], onOpen }:{ items?: StageItem[], onOpen?: (i:number)=>void }){
  const [heroIndex, setHeroIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement|null>(null)
  const videoRef = useRef<HTMLVideoElement|null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // autoplay hero when visible
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0]
      setIsVisible(!!e.isIntersecting)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isVisible) {
      v.muted = true
      const p = v.play()
      if (p && typeof p.then === 'function') p.catch(()=>{})
    } else {
      try { v.pause() } catch(e){}
    }
  }, [isVisible, heroIndex])

  // prefetch on thumbnail hover
  function prefetchVideo(src?: string){
    if (!src) return
    try {
      const v = document.createElement('video')
      v.preload = 'metadata'
      v.src = src
    } catch(e) {}
  }

  const hero = items[heroIndex]

  return (
    <section className="w-full bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={heroRef} className="relative w-full overflow-hidden rounded-md" style={{ paddingBottom: '48%' }}>
          {hero?.type === 'video' ? (
            <video ref={videoRef} src={hero.videoSrc} className="absolute inset-0 w-full h-full object-contain bg-black" playsInline muted loop preload="metadata" />
          ) : (
            <Image src={hero?.poster || hero?.img || ''} alt={hero?.title || ''} className="absolute inset-0 w-full h-full object-contain" fill />
          )}

          <div className="absolute left-6 bottom-6 bg-black/50 px-4 py-2 rounded-md">
            <h3 className="text-2xl font-bold">{hero?.title}</h3>
            {hero?.city && <div className="text-sm text-gray-300 mt-1">{hero.city}</div>}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto py-2">
          <div className="flex gap-4 items-center">
            {items.map((it, i) => (
              <motion.div key={it.id}>
                <div className={`relative flex-shrink-0 w-44 h-24 bg-black/30 rounded-md overflow-hidden border border-white/5 ${i === heroIndex ? 'ring-2 ring-white/30' : ''}`}>
                  <button
                    onMouseEnter={() => prefetchVideo(it.videoSrc)}
                    onClick={() => { setHeroIndex(i); onOpen && onOpen(i) }}
                    aria-label={`Show ${it.title}`}
                    className="absolute inset-0"
                  >
                    {it.type === 'video' ? (
                      <video src={it.videoSrc} className="absolute inset-0 w-full h-full object-cover" muted playsInline preload="metadata" />
                    ) : (
                      <Image src={it.poster || it.img || ''} alt={it.title} className="absolute inset-0 w-full h-full object-cover" fill />
                    )}
                    <div className="absolute left-2 bottom-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded">{it.city}</div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
