export type Service = {
  slug: string;
  title: string;
  img: string;
  desc: string;
};

export const services: Service[] = [
  {slug: 'electrical-installations', title:'Electrical Installations', img:'/Images/pexels-eric-mufasa-578798-6349399.jpg', desc: 'Supply and install wiring, switchgear and lighting for homes and businesses. We handle domestic, commercial and industrial wiring with certified electricians and compliant materials.'},
  {slug: 'maintenance-repairs', title:'Maintenance & Repairs', img:'/Images/istockphoto-2181440121-612x612.jpg', desc: 'Rapid troubleshooting, repairs and ongoing maintenance plans. We offer scheduled maintenance contracts to keep your installations safe and reliable.'},
  {slug: 'lorenzetti', title:'Lorenzetti Supply & Install', img:'/Images/Lorenzetti Shower Installation.jpg', desc: 'Certified Lorenzetti product supply and professional installation. We are authorized to supply and install Lorenzetti showers and water heating solutions.'},
  {slug: 'consultation-assessments', title:'Consultation & Assessments', img:'/Images/closeup-male-electrician-checking-fuse-600nw-2349429843.webp', desc: 'Site assessments, safety reports and tailored quotes. We provide comprehensive reports and recommendations for compliance and efficiency improvements.'},
  {slug: 'construction-renovation', title:'Construction & Renovation', img:'/Images/pexels-timepro-tv-2148736540-33321432.jpg', desc: 'Full electrical fit-outs for new builds and renovations. We coordinate with builders and trades to deliver turnkey electrical packages.'},
  {slug: 'plumbing-carpentry', title:'Plumbing & Carpentry', img:'/Images/istockphoto-2170643829-612x612.jpg', desc: 'Trusted plumbing and carpentry partners for integrated building projects. We deliver reliable subcontracted trades under a single project umbrella.'},
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
