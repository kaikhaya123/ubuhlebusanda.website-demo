"use client"
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// motion.div typing can be strict in some setups; use a small alias so JSX
// accepts standard DOM props (className, role, onClick) without type errors.
const MDiv: any = motion.div

type LightboxItem = {
  src: string
  type: 'image' | 'video'
  alt?: string
  caption?: string | string[]
  position?: string // CSS object-position value, e.g. 'center top'
  credit?: { text: string, href?: string }
}

type LightboxProps = {
  open: boolean
  index?: number
  items?: LightboxItem[]
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function Lightbox({ open, index = 0, items = [], onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev && onPrev()
      if (e.key === 'ArrowRight') onNext && onNext()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, onPrev, onNext])

  if (!open || !items || items.length === 0) return null

  const itm = items[index]
  if (!itm) return null

  const captionId = `lightbox-caption-${index}`
  return (
    <AnimatePresence>
      {open && (
        <MDiv
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
          {...{ role: 'presentation' }}
        >
          <MDiv
            key="panel"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={itm.caption ? captionId : undefined}
          >
            <div className="flex items-center justify-between mb-2">
              <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev && onPrev() }} className="text-white mr-2">◀</button>
              <button aria-label="Close" onClick={onClose} className="text-white">Close ✕</button>
              <button aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext && onNext() }} className="text-white ml-2">▶</button>
            </div>

            <div className="bg-black rounded overflow-hidden">
              {itm.type === 'video' ? (
                <video src={itm.src} controls className="w-full h-auto max-h-[80vh]" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={itm.src} alt={itm.alt || ''} style={{ objectPosition: itm.position || 'center' }} className="w-full h-auto object-contain max-h-[80vh]" />
              )}
            </div>

            {itm.caption && (
              <div id={captionId} className="mt-3 text-center text-sm text-white/90">
                {Array.isArray(itm.caption) ? (
                  itm.caption.map((line, i) => <p key={i} className="leading-relaxed">{line}</p>)
                ) : (
                  <p className="leading-relaxed">{itm.caption}</p>
                )}

                {itm.credit && (
                  <div className="mt-2">
                    {itm.credit.href ? (
                      <a href={itm.credit.href} className="text-amber-300 underline text-sm" rel="noopener noreferrer">{itm.credit.text}</a>
                    ) : (
                      <span className="text-amber-300 text-sm">{itm.credit.text}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </MDiv>
        </MDiv>
      )}
    </AnimatePresence>
  )
}
