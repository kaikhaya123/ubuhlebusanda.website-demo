import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Projects from '../components/Projects';
import WorkGallery from '../components/WorkGallery';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
  <section className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
        <About hideDuplicateName={true} />
        <Services />
        <WorkGallery />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
      </section>
      <CTA />
      <Contact />
    </>
  );
}
