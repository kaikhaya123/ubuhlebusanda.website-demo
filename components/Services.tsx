import ServiceCard from './shared/ServiceCard'
import ShapeBlur from './ShapeBlur'
import SplitServiceCard from './shared/SplitServiceCard'

const services = [
  {slug: 'electrical-installations', title:'Electrical Installations', img:'/Images/484807011_1060048006163645_9082220095922664128_n.jpg', desc: 'Supply and install wiring, switchgear and lighting for homes and businesses.'},
  {slug: 'maintenance-repairs', title:'Maintenance & Repairs', img:'/Images/istockphoto-2181440121-612x612.jpg', desc: 'Rapid troubleshooting, repairs and ongoing maintenance plans.'},
  {slug: 'lorenzetti', title:'Lorenzetti Supply & Install', img:'/Images/Bello-Shower-600x900.webp', desc: 'Certified Lorenzetti product supply and professional installation.'},
  {slug: 'consultation-assessments', title:'Consultation & Assessments', img:'/Images/closeup-male-electrician-checking-fuse-600nw-2349429843.webp', desc: 'Site assessments, safety reports and tailored quotes.'},
  {slug: 'construction-renovation', title:'Renovation & Construction', img:'/Images/pexels-timepro-tv-2148736540-33321432.jpg', desc: 'Full electrical fit-outs for new builds and renovations.'},
  // Make sure the image 'pexels-timepro-tv-2148736540-33321432.jpg' exists in the public/Images directory.
  {slug: 'plumbing-carpentry', title:'Plumbing & Carpentry', img:'/Images/jacek-dylag-Vve7XkiUq_Y-unsplash (2).jpg', desc: 'Trusted plumbing and carpentry partners for integrated building projects.'},
]

export default function Services(){
  return (
    <section id="services" className="py-16 section-divider relative">
      {/* decorative background images (left + right) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* left image */}
        <div className="absolute left-0 top-0 h-80 w-1/2 sm:w-2/5 -translate-x-12 transform overflow-hidden">
          <div style={{backgroundImage: `url('/Images/pexels-timepro-tv-2148736540-33321432.jpg')`}} className="h-full w-full bg-cover bg-center opacity-30 blur-2xl rounded-3xl transform translate-y-10" />
        </div>
        {/* right image */}
        <div className="absolute right-0 bottom-0 h-80 w-1/2 sm:w-2/5 translate-x-12 transform overflow-hidden">
          <div style={{backgroundImage: `url('/Images/pexels-eric-mufasa-578798-6349399.jpg')`}} className="h-full w-full bg-cover bg-center opacity-30 blur-2xl rounded-3xl -translate-y-8" />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mx-auto">What We Do</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, idx)=> (
          <div key={s.title} className={`relative overflow-hidden rounded-2xl ${s.slug === 'plumbing-carpentry' || s.slug === 'construction-renovation' ? 'lg:col-span-2' : ''}`}>
            {/* decorative blurred shape behind the card */}
            <div className="absolute inset-0 -z-10 opacity-80 pointer-events-none">
              <ShapeBlur
                variation={idx % 4}
                pixelRatioProp={2}
                shapeSize={0.9}
                roundness={0.5}
                borderSize={0.06}
                circleSize={0.4}
                circleEdge={0.5}
                className="w-full h-full"
              />
            </div>
            {/* Link to the services page anchor for the detailed view */}
            <a href={`/services#${s.slug}`} className="block">
              {s.slug === 'plumbing-carpentry' ? (
                <SplitServiceCard
                  title={s.title}
                  left={{src:'/Images/jacek-dylag-Vve7XkiUq_Y-unsplash (2).jpg', label:'Plumbing'}}
                  right={{src:'/Images/immo-wegmann-rzU6ubIzW7o-unsplash.jpg', label:'Carpentry'}}
                  variant='chip'
                />
              ) : s.slug === 'construction-renovation' ? (
                <SplitServiceCard
                  title={s.title}
                  left={{src:'/Images/darwin-interior-wHAV8p9dd6Q-unsplash.jpg', label:'Renovation'}}
                  right={{src:'/Images/ivan-henao-2DK-CP_WAuw-unsplash.jpg', label:'Construction'}}
                  variant='chip'
                />
              ) : (
                <ServiceCard title={s.title} img={s.img}>
                  {s.desc}
                </ServiceCard>
              )}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
