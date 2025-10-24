"use client";
import Image from 'next/image';
import { services } from '../lib/services';
import { motion } from 'framer-motion';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white section-divider">
      <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">What We Do</h2>
        <div className="flex flex-col gap-0">
          {services.map((s, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={s.slug}
                className={`w-full flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-stretch gap-0`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.1 }}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 h-64 md:h-96 relative">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Text */}
                <motion.div
                  className="w-full md:w-1/2 flex flex-col justify-center gap-4 bg-white p-6 md:p-10"
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 + idx * 0.1 }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold mb-2"
                    style={{
                      fontFamily: 'Poppins, ui-sans-serif, system-ui',
                      color: '#111', // black
                      letterSpacing: '-0.01em',
                      lineHeight: '1.2',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: 'Inter, ui-sans-serif, system-ui',
                      color: '#222',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {s.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
