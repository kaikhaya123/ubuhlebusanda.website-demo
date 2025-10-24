"use client"
import { useState } from 'react'
import Image from 'next/image'

type MediaItem = {
  id: string
  title: string
  type: 'image' | 'video'
  img?: string
  poster?: string
  videoSrc?: string
  city?: string
  description?: string
}

const sample: MediaItem[] = [
  { 
    id: '1', 
    title: 'Electrical Installation', 
    type: 'video', 
    videoSrc: "/videos/ssstik.io_@siyanda_24_1759239017612.mp4",
  poster: "/images/jimmy-nilsson-masth-CskQi7DDUuY-unsplash.jpg",
    city: 'Durban',
    description: 'Professional electrical installation with complete safety compliance and aftercare support.'
  },
  { 
    id: '2', 
    title: 'Solar Panel Installation', 
    type: 'video', 
    videoSrc: "/videos/ssstik.io_@siyanda_24_1759238335036.mp4",
  poster: "/images/newpowa-0jf8n9COg6s-unsplash.jpg",
    city: 'Trenchgula Guest Lodge',
    description: '50kW solar system installation providing sustainable energy solutions.'
  },
  { 
    id: '3', 
    title: 'Lorenzetti Supply & Install', 
    type: 'video', 
    videoSrc: "/videos/snaptik_7346607726019104006_v2.mp4",
  poster: "/images/natalia-menin-kvNXrgbmCGM-unsplash.jpg",
    city: 'Durban',
    description: 'Premium Lorenzetti water heating solutions with professional installation.'
  },
  { 
    id: '4', 
    title: 'Kitchen Renovation', 
    type: 'video', 
    videoSrc: "/videos/ssstik.io_@siyanda_24_1759237904218.mp4",
  poster: "/images/pexels-pixabay-373541.jpg",
    city: 'KwaMashu, Durban',
    description: 'Complete kitchen electrical upgrade with modern lighting and appliance installations.'
  },
]

export default function WorkGallery({ items = sample }: { items?: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const activeProject = items[activeIndex]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const handleProjectSelect = (index: number) => {
    setActiveIndex(index)
    setIsPlaying(false)
  }

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our portfolio of completed electrical installations, solar projects, and renovations across KwaZulu-Natal.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* LEFT SIDE - Large Media Display */}
          <div className="relative bg-black min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
            {activeProject.type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  key={activeProject.id}
                  className="w-full h-full object-cover"
                  poster={activeProject.poster}
                  controls={isPlaying}
                  autoPlay={isPlaying}
                  loop
                  muted={!isPlaying}
                  playsInline
                >
                  <source src={activeProject.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Overlay */}
                {!isPlaying && (
                  <button
                    onClick={handlePlayToggle}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <Image
                src={activeProject.img || activeProject.poster || '/images/placeholder.jpg'}
                alt={activeProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          {/* RIGHT SIDE - Project List */}
          <div className="p-8 lg:p-10 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h3>
            
            {/* Active Project Info */}
            <div className="mb-8 p-6 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{activeProject.title}</h4>
              <p className="text-gray-600 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {activeProject.city}
              </p>
              <p className="text-gray-700 text-sm mb-4">{activeProject.description}</p>
              <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                View Details
              </button>
              <button className="flex-1 px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium">
                Get Quote
              </button>
              </div>
            </div>

            {/* Project Thumbnails List */}
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {items.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    index === activeIndex
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    {project.type === 'video' ? (
                      <div className="relative w-full h-full bg-black">
                        <Image
                          src={project.poster || '/images/placeholder.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-8 h-8 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/80'} flex items-center justify-center`}>
                            <svg className={`w-4 h-4 ${index === activeIndex ? 'text-gray-900' : 'text-gray-700'} ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={project.img || project.poster || '/images/placeholder.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 text-left">
                    <h5 className={`font-semibold mb-1 ${index === activeIndex ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h5>
                    <p className={`text-sm ${index === activeIndex ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.city}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg 
                    className={`w-5 h-5 flex-shrink-0 ${index === activeIndex ? 'text-white' : 'text-gray-400'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a 
            href="/projects" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
