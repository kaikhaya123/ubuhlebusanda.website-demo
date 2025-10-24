export type Service = {
  slug: string;
  title: string;
  img: string;
  desc: string;
};

export const services: Service[] = [
  {slug: 'electrical-installations', title:'Electrical Installations', img:'/Images/484807011_1060048006163645_9082220095922664128_n.jpg', desc: 'Supply and install wiring, switchgear and lighting for homes and businesses. We handle domestic, commercial and industrial wiring with certified electricians and compliant materials.'},
  {slug: 'maintenance-repairs', title:'Maintenance & Repairs', img:'/Images/Electrical-Repairs-Maintenance-Banner-Image.png', desc: 'Rapid troubleshooting, repairs and ongoing maintenance plans. We offer scheduled maintenance contracts to keep your installations safe and reliable.'},
  {slug: 'lorenzetti', title:'Lorenzetti Supply & Install', img:'/Images/natalia-menin-kvNXrgbmCGM-unsplash.jpg', desc: 'Certified Lorenzetti product supply and professional installation. We are authorized to supply and install Lorenzetti showers and water heating solutions.'},
  {slug: 'consultation-assessments', title:'Consultation & Assessments', img:'/Images/Electric-Services.jpg', desc: 'Site assessments, safety reports and tailored quotes. We provide comprehensive reports and recommendations for compliance and efficiency improvements.'},
  {slug: 'renovation', title:'Renovation', img:'/Images/pexels-metalier-coatings-3515111-5252538.jpg', desc: 'Full electrical fit-outs for new builds and renovations. We coordinate with builders and trades to deliver turnkey electrical packages.'},
  {slug: 'plumbing', title:'Plumbing', img:'/Images/jacek-dylag-Vve7XkiUq_Y-unsplash (2).jpg', desc: 'Trusted plumbing and carpentry partners for integrated building projects. We deliver reliable subcontracted trades under a single project umbrella.'},
  // New carpentry image grid entry, aligned with plumbing
  {slug: 'carpentry', title:'Carpentry', img:'/Images/pexels-ron-lach-8820166.jpg', desc: 'Expert carpentry services for custom woodwork, repairs, and installations. Our skilled carpenters deliver quality craftsmanship for residential and commercial projects.'},
  {slug: 'motor-gate', title:'Motor Gate', img:'/Images/istockphoto-1127900004-612x612.jpg', desc: 'Automated motor gate installations for enhanced security and convenience. We provide reliable motor gate systems tailored to your property needs.'},
  {slug: 'roof-cleaning', title:'Roof Cleaning', img:'/Images/Pressure-Washing-Your-Roof.webp', desc: 'Professional roof cleaning services to extend the life of your roof and improve curb appeal. Safe, effective, and environmentally friendly methods.'},
  {slug: 'painting', title:'Painting', img:'/Images/pexels-ivan-samkov-5799017.jpg', desc: 'Expert interior and exterior painting for residential and commercial properties. Transform your space with high-quality finishes and vibrant colors.'},
  // New construction image grid entry, aligned with renovation
  {slug: 'construction', title:'Construction', img:'/Images/pexels-pixabay-73833.jpg', desc: 'Professional construction services for residential and commercial projects. Our team ensures quality, safety, and timely delivery for all your building needs.'},
  // New motor gate image grid entry, aligned with CCTV
  {slug: 'cctv', title:'CCTV', img:'/Images/pexels-jakubzerdzicki-27588251.jpg', desc: 'advanced CCTV security systems for homes and businesses. Secure your property with smart access and surveillance.'},
  // Solar panel installation image grid (rectangular, animated)
  {slug: 'solar-panel', title:'Solar Panel Installation', img:'/Images/pexels-bizar-van-jan-92378004-16427010.jpg', desc: 'Professional solar panel installation for homes and businesses. Maximize energy efficiency and sustainability with our expert team.'},
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
