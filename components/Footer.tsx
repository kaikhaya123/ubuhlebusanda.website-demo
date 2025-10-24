"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer(){
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
  }
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } }
  }

  return (
    <footer className="mt-12 border-t">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-20 md:w-40">
            <Image
              src="/images/chatgpt-2025-09-29-08-16-40.png"
              alt="Ubuhlebusanda logo"
              width={280}
              height={84}
              sizes="(max-width: 640px) 80px, (max-width: 768px) 120px, 160px"
              className="object-contain w-full h-auto"
            />
          </div>
          <div>
            <div className="font-bold">Ubuhlebusanda</div>
            <div className="text-sm text-gray-600">Powering homes & businesses</div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-6">
          <div className="w-full md:w-auto">
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="text-sm text-gray-600 text-center md:text-right" suppressHydrationWarning>
                © {new Date().getFullYear()} Ubuhlebusanda Pty Ltd
              </div>

              <nav role="navigation" aria-label="Social links" className="flex items-center gap-3 md:gap-4">
                <a href="https://www.facebook.com/ubuhlebusanda" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" title="Facebook - Ubuhlebusanda" className="focus:outline-none">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-sm hover:scale-[1.04] transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="white" role="img" aria-hidden="true">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </span>
                </a>

                <a href="https://wa.me/27764257905" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="WhatsApp - Chat with us" className="focus:outline-none">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-sm hover:scale-[1.04] transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="white" role="img" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </span>
                </a>

                <a href="https://www.tiktok.com/@ubuhlebusanda?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok profile" title="TikTok - @ubuhlebusanda" className="focus:outline-none">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center bg-black text-white shadow-sm hover:scale-[1.04] transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5" fill="white" role="img" aria-hidden="true">
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                    </svg>
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// removed stray test fetch that executed at build time
