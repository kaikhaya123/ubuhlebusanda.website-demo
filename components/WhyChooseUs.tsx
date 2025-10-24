"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

const WhyChooseUs = () => {
  return (
    <motion.section
      className="py-16 grid md:grid-cols-2 gap-8 items-center section-divider"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="text-2xl font-bold">Why Ubuhlebusanda?</h2>
        <ul className="mt-4 list-disc ml-6 text-gray-700">
          {[
            'Certified & Experienced Team',
            'Quality Products (Lorenzetti)',
            'Affordable & Scalable Solutions',
            'Customer-Centric Service',
          ].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="w-full rounded shadow relative h-64 md:h-80">
          <Image src="/images/hurley-david-ac-technician-min-1.jpg" alt="Why choose us" fill className="object-cover rounded" />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default WhyChooseUs