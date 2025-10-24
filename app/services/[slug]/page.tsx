
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../../lib/services';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const service = services.find(s => s.slug === slug);

  if (!service) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center">
      <div className="w-full mb-8 rounded-2xl overflow-hidden shadow-xl relative h-64">
        <Image
          src={service.img}
          alt={service.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-center">{service.title}</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">{service.desc}</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="px-6 py-3 rounded-xl bg-black text-white shadow-xl transition-all font-serif font-extrabold tracking-wide text-lg border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white w-full text-center">
          Request a Quote
        </Link>
        <Link href="/services" className="px-6 py-3 rounded-xl bg-white border-2 border-gray-900 text-gray-900 shadow-xl hover:bg-gray-900 hover:text-white transition-all font-serif font-extrabold tracking-wide text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 w-full text-center">
          Back to Services
        </Link>
      </div>
    </main>
  );
}
