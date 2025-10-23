"use client"
import { useEffect, useState } from 'react'

export default function ServicesTOC({items}:{items:{slug:string,title:string}[]}){
  const [active, setActive] = useState(items[0]?.slug || '')

  useEffect(()=>{
    const observers: IntersectionObserver[] = []
    items.forEach(i => {
      const el = document.getElementById(i.slug)
      if (!el) return
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e => {
          if (e.isIntersecting) setActive(i.slug)
        })
      }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 })
      obs.observe(el)
      observers.push(obs)
    })
    return ()=> observers.forEach(o => o.disconnect())
  }, [items])

  // mobile select handler: scroll into view with smooth behavior
  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
    const slug = e.target.value
    if (!slug) return
    const el = document.getElementById(slug)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop TOC */}
      <nav aria-label="Services" className="sticky top-24 hidden lg:block w-64">
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.slug}>
              <a href={`#${i.slug}`} className={`block px-3 py-2 rounded ${active===i.slug ? 'bg-amber-200 font-semibold' : 'text-gray-700'}`}>{i.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile floating select - visible on small screens */}
      <div className="lg:hidden fixed right-4 bottom-4 z-50">
        <label htmlFor="services-select" className="sr-only">Jump to service</label>
        <select id="services-select" onChange={onSelectChange} value={active} className="bg-white/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-md w-64">
          {items.map(i => (
            <option key={i.slug} value={i.slug}>{i.title}</option>
          ))}
        </select>
      </div>
    </>
  )
}
