"use client"
import { useState, useRef } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

type ProjectItem = {
  id: string
  title: string
  type: 'image'|'video'
  img?: string
  poster?: string
  videoSrc?: string
}

const demo: ProjectItem[] = [
  { id: 'p1', title: '', type: 'image', img: '/Images/484274009_1060030022832110_6067769429391287603_n.jpg' },
  { id: 'p2', title: '', type: 'image', img: '/Images/jimmy-nilsson-masth-CskQi7DDUuY-unsplash.jpg' },
  { id: 'p3', title: '', type: 'video', videoSrc: '/videos/ssstik.io_@ubuhlebusanda_1759241752304.mp4'},
  { id: 'p4', title: '', type: 'image', img: '/Images/Ubuhlebusanda_roof Solar panel.jpg' },
  { id: 'p5', title: '', type: 'image', img: '/Images/pexels-vlada-karpovich-6634838.jpg' },
  { id: 'p6', title: '', type: 'video', videoSrc: '/videos/ssstik.io_@siyanda_24_1759243059783.mp4' },
]

export default function Projects({ items = demo }: { items?: ProjectItem[] }){
  const [light, setLight] = useState<{open:boolean, index?:number, items?:Array<{src:string,type:'image'|'video',alt?:string}>}>({open:false})
  const [playingId, setPlayingId] = useState<string|undefined>(undefined)
  const previewRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const lightboxItems = items.map(it => ({ src: it.type === 'video' ? (it.videoSrc || '') : (it.img || ''), type: it.type, alt: it.title }))

  return (
  <section id="galley" className="py-16 section-divider">

      <header className="mb-6">
  <div className="flex justify-center">
    <h2 className="text-2xl font-bold">Gallery</h2>
  </div>
        <p className="text-sm text-gray-600 mt-2 mx-auto max-w-xl">A selection of recent installations and case studies showcasing our workmanship and solutions.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((p, i)=> {
          const isVideo = p.type === 'video'
          const thumb = isVideo ? (p.poster || p.img || '') : (p.img || '')
          const isPlaying = playingId === p.id
          return (
            <article key={p.id} className="bg-white border-2 border-white shadow-sm overflow-hidden rounded-md" role="group">
              <div className="relative w-full" style={{paddingBottom: '66%'}}>
                {isPlaying && isVideo ? (
                  <video src={p.videoSrc} controls autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" onEnded={()=>setPlayingId(undefined)} />
                ) : (
                  thumb ? (
                    <Image src={thumb} alt={p.title} fill className="object-cover" />
                  ) : (
                    // render a lightweight preview video if user uploaded a video but no thumbnail
                    p.videoSrc ? (
                      <video
                        src={p.videoSrc}
                        ref={(el) => { previewRefs.current[p.id] = el }}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        onMouseEnter={() => { try { previewRefs.current[p.id]?.play() } catch (e) {} }}
                        onMouseLeave={() => { try { previewRefs.current[p.id]?.pause(); if (previewRefs.current[p.id]) previewRefs.current[p.id]!.currentTime = 0 } catch (e) {} }}
                        onFocus={() => { try { previewRefs.current[p.id]?.play() } catch (e) {} }}
                        onBlur={() => { try { previewRefs.current[p.id]?.pause(); if (previewRefs.current[p.id]) previewRefs.current[p.id]!.currentTime = 0 } catch (e) {} }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-600">No preview</div>
                    )
                  )
                )}

                {isVideo && !isPlaying && (
                  <button aria-label={`Play ${p.title}`} onClick={(e)=>{ e.stopPropagation(); setPlayingId(p.id); }} className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-black text-xl">▶</div>
                  </button>
                )}
              </div>

              <div className="p-3 border-t border-gray-100">
                <h4 className="text-sm font-semibold">{p.title}</h4>
              </div>
            </article>
          )
        })}
      </div>

      <Lightbox
        open={!!light.open}
        index={light.index}
        items={light.items}
        onClose={()=>setLight({open:false})}
        onPrev={()=>setLight(s => ({...s, index: Math.max(0, (s.index || 0) - 1)}))}
        onNext={()=>setLight(s => ({...s, index: Math.min((s.items?.length || 1) - 1, (s.index || 0) + 1)}))}
      />
    </section>
  )
}
