"use client"
import Image from 'next/image'
import Link from 'next/link'
import ServicesTOC from '../../components/ServicesTOC'
import { services } from '../../lib/services'

export default function ServicesPage(){
  return (
    <main className="max-w-7xl mx-auto px-0 sm:px-0 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="relative mb-16 w-screen left-1/2 right-1/2 -translate-x-1/2" style={{height: '320px', minHeight: '320px'}}>
        {/* Custom hero background image: replace src with your own image path */}
        <Image
          src="/Images/pexels-rezwan-1216544.jpg"
          alt="Hero Background"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{zIndex:0}}
          priority
        />
        <header className="relative text-center flex flex-col justify-center items-center h-full" style={{zIndex:2}}>
          <h1 className="text-5xl font-extrabold tracking-tight text-black mb-4">OUR SERVICES</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Comprehensive electrical and building services tailored for homes and businesses.</p>
        </header>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-1/4 mb-10 lg:mb-0">
          <div className="sticky top-32">
        <ServicesTOC items={services.map(s=>({slug:s.slug, title:s.title}))} />
          </div>
        </aside>
        <section className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {services.map(s => (
                <section
                  id={s.slug}
                  key={s.slug}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 scroll-mt-32 flex flex-col min-h-[480px]"
                  style={{ scrollMarginTop: '8rem' }}
                >
                  <div className="relative h-56 w-full">
                    <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-2">{s.title}</h2>
                      <p className="text-gray-700 text-base mb-6">{s.desc}</p>
                    </div>
                    <div>
                        <div className="flex flex-col gap-3 mt-4">
                          <Link href="/contact?service=" className="px-6 py-2 rounded-xl bg-black text-white shadow-xl transition-all font-serif font-extrabold tracking-wide text-lg border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white w-full text-center" style={{textShadow: '0 2px 8px rgba(0,0,0,0.10)'}}>
                            Request a Quote
                          </Link>
                          <Link href={`/services/${s.slug}`} className="px-6 py-2 rounded-xl bg-white border-2 border-gray-900 text-gray-900 shadow-xl hover:bg-gray-900 hover:text-white transition-all font-serif font-extrabold tracking-wide text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 w-full text-center" style={{textShadow: '0 2px 8px rgba(0,0,0,0.10)'}}>
                            Learn More
                          </Link>
                        </div>
                    </div>
                  </div>
                </section>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
