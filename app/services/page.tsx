import Image from 'next/image'
import Link from 'next/link'
import ServicesTOC from '../../components/ServicesTOC'
import { services } from '../../lib/services'

export default function ServicesPage(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="mt-4 text-gray-700">Comprehensive electrical and building services tailored for homes and businesses.</p>
      </header>

      <div className="lg:flex lg:items-start lg:gap-8">
        <ServicesTOC items={services.map(s=>({slug:s.slug, title:s.title}))} />

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(s => (
              <section id={s.slug} key={s.slug} className="bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-md scroll-mt-28" style={{scrollMarginTop: '6rem'}}>
                <div className="relative h-56 w-full">
                  <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-3 text-gray-700">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link href="/contact" className="inline-block btn-glass btn-glass--warm">Request a Quote</Link>
                    <Link href={`/services/${s.slug}`} className="text-sm text-gray-500">Read more</Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
