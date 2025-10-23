import Image from 'next/image'

export default function WhyChooseUs(){
  return (
    <section className="py-16 grid md:grid-cols-2 gap-8 items-center section-divider">
      <div>
        <h2 className="text-2xl font-bold">Why Ubuhlebusanda?</h2>
        <ul className="mt-4 list-disc ml-6 text-gray-700">
          <li>Certified & Experienced Team</li>
          <li>Quality Products (Lorenzetti)</li>
          <li>Affordable & Scalable Solutions</li>
          <li>Customer-Centric Service</li>
        </ul>
      </div>
      <div>
        <div className="w-full rounded shadow relative h-64 md:h-80">
          <Image src="/Images/hurley-david-ac-technician-min-1.jpg" alt="Why choose us" fill className="object-cover rounded" />
        </div>
      </div>
    </section>
  )
}
