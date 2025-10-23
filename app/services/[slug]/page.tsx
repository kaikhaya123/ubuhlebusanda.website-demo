import Image from 'next/image'
import Link from 'next/link'
import { getServiceBySlug, services } from '../../../lib/services'

export async function generateStaticParams(){
  return services.map(s => ({ slug: s.slug }))
}

export default function ServiceDetail({ params }:{ params:{ slug:string } }){
  const s = getServiceBySlug(params.slug)
  if (!s) return <main className="p-8">Service not found</main>

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{s.title}</h1>
        <p className="mt-2 text-gray-700">{s.desc}</p>
      </header>

      <div className="relative h-72 w-full mb-6 rounded-lg overflow-hidden">
        <Image src={s.img} alt={s.title} fill className="object-cover" />
      </div>

      <article className="prose prose-neutral">
        <p>{s.desc} We provide certified technicians, compliant parts, and end-to-end project management. Our team handles permits, testing, and handover documentation.</p>
        <p>Typical deliverables include:</p>
        <ul>
          <li>Detailed site assessment and risk report</li>
          <li>Electrical layout and circuit schedules</li>
          <li>Supply of materials and installation by certified electricians</li>
          <li>Testing and compliance certificates</li>
        </ul>
      </article>

      <div className="mt-8">
        <Link href="/contact" className="btn-glass btn-glass--warm">Request a Quote</Link>
        <Link href="/services" className="ml-4 text-sm text-gray-600">Back to services</Link>
      </div>
    </main>
  )
}
