const items = [
  {quote:'Excellent service and very professional.', author:'K. Mthethwa'},
  {quote:'Installed quickly and reliably.', author:'A. Naidoo'},
]

export default function Testimonials(){
  return (
    <section id="testimonials" className="py-16 bg-gray-50 section-divider">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {items.map((t,i)=> (
            <blockquote key={i} className="p-6 bg-white rounded shadow">
              <p>“{t.quote}”</p>
              <cite className="block mt-3 text-sm text-gray-600">— {t.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
