"use client"
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import HeroSimple from '../../components/shared/HeroSimple'
import Reveal from '../../components/Reveal'

// Project categories for filtering
const categories = [
  'All',
  'Electrical Installation',
  'Solar Installation',
  'Lorenzetti',
  'Renovation',
  'Construction'
]

// Project data structure
type Project = {
  id: string
  title: string
  category: string
  description: string
  location: string
  date: string
  coverImage: string
  images: string[]
  videoUrl?: string
  challenge: string
  solution: string
  results: string[]
}

// Sample projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'Lu X Power Tek',
    category: 'Electrical Installation',
    description: 'Complete electrical system installation for a modern residential complex.',
    location: '',
    date: '',
    coverImage: '/Images/3_6a3f8f37-ea77-4911-9c98-0ffcb8428cd5.webp',
    images: [
      '/Images/pexels-eric-mufasa-578798-6349399.jpg',
      '/Images/istockphoto-2170643829-612x612.jpg',
      '/Images/closeup-male-electrician-checking-fuse-600nw-2349429843.webp',
      '/Images/3_6a3f8f37-ea77-4911-9c98-0ffcb8428cd5.webp'
    ],
    videoUrl: "/videos/ssstik.io_@siyanda_24_1759239017612.mp4",
    challenge: 'Installing a complex electrical system while maintaining safety standards and meeting tight deadlines.',
    solution: 'Implemented a phased installation approach with regular quality checks and safety assessments.',
    results: [
      'Successfully completed installation ahead of schedule',
      'Zero safety incidents during installation',
      'Achieved 100% compliance with electrical codes'
    ]
  },
  {
    id: '2',
    title: 'Solar Panel Installation',
    category: 'Solar Installation',
    description: 'Solar power system installation for sustainable energy solutions.',
    location: '',
    date: '',
    coverImage: '/Images/img01.jpg',
    images: [
      '/Images/Ubuhlebusanda_roof Solar panel.jpg',
      '/Images/pexels-kindelmedia-8488025.jpg',
      '/Images/istockphoto-2181440121-612x612.jpg',
      '/Images/pexels-florida-solar-fix-2154752009-33379361.jpg'
    ],
    videoUrl: "/videos/ssstik.io_@siyanda_24_1759238335036.mp4",
    challenge: 'Optimizing solar panel placement for maximum efficiency in limited roof space.',
    solution: 'Used advanced mapping software to determine optimal panel positioning and installation configuration.',
    results: [
      '40% reduction in energy costs',
      'Annual energy production of 12,000 kWh',
      'Carbon footprint reduction of 8.5 tons annually'
    ]
  },
  {
    id: '3',
    title: 'Lorenzetti Installation Project',
    category: 'Lorenzetti',
    description: 'Premium Lorenzetti product installation and setup.',
    location: '',
    date: '',
    coverImage: '/Images/Lorenzetti Shower Installation.jpg',
    images: [
      '/Images/Lorenzetti Shower Installation.jpg',
      '/Images/Bello-Shower-600x900.webp',
      '/Images/484274009_1060030022832110_6067769429391287603_n.jpg',
      '/Images/484807011_1060048006163645_9082220095922664128_n.jpg'
    ],
    videoUrl: "/videos/snaptik_7346607726019104006_v2.mp4",
    challenge: 'Integrating modern Lorenzetti systems with existing plumbing infrastructure.',
    solution: 'Custom-designed adaptation solutions with minimal structural modifications.',
    results: [
      'Enhanced water heating efficiency',
      'Improved user experience',
      'Significant energy savings'
    ]
  },
  {
    id: '4',
    title: 'Complete Home Renovation',
    category: 'Renovation',
    description: 'Full-scale home renovation including electrical upgrades, modern lighting, and smart home integration.',
    location: '',
    date: '',
    coverImage: '/Images/7-Pixabay-1024x683.jpg',
    images: [
      '/Images/jimmy-nilsson-masth-CskQi7DDUuY-unsplash.jpg',
      '/Images/pexels-vlada-karpovich-6634838.jpg',
      '/Images/natalia-menin-kvNXrgbmCGM-unsplash.jpg',
      '/Images/newpowa-0jf8n9COg6s-unsplash.jpg'
    ],
    challenge: 'Modernizing an older home while preserving its character and ensuring all systems meet current safety standards.',
    solution: 'Phased renovation approach with careful planning to maintain structural integrity while upgrading all electrical systems and adding modern amenities.',
    results: [
      'Increased property value by 35%',
      'Reduced energy consumption by 50%',
      'Modern smart home integration throughout',
      'Enhanced safety with updated electrical systems'
    ]
  },
  {
    id: '5',
    title: 'Commercial Building Construction',
    category: 'Construction',
    description: 'New commercial building construction with complete electrical infrastructure and modern lighting systems.',
    location: '',
    date: '',
    coverImage: '/Images/premium_photo-1681989486976-9ec9d2eac57a.jpeg',
    images: [
      '/Images/pexels-cristian-rojas-8853537.jpg',
      '/Images/closeup-male-electrician-checking-fuse-600nw-2349429843.webp',
      '/Images/istockphoto-2197665899-612x612.jpg',
      '/Images/pexels-alex-tyson-919593032-19966749.jpg'
    ],
    challenge: 'Building a modern commercial facility from the ground up with comprehensive electrical systems, energy-efficient lighting, and future-ready infrastructure.',
    solution: 'Implemented advanced electrical planning with modular systems, energy-efficient LED lighting throughout, and infrastructure for future technology upgrades.',
    results: [
      'Completed construction 2 weeks ahead of schedule',
      '100% code compliance and safety certification',
      '30% more energy efficient than standard buildings',
      'Future-ready infrastructure for technology expansion',
      'SANS 10142 electrical installation certification'
    ]
  }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [videoAspectRatio, setVideoAspectRatio] = useState<'horizontal' | 'vertical' | 'square'>('horizontal')

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  )

  const handleVideoLoad = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    const { videoWidth, videoHeight } = video
    
    if (videoWidth > videoHeight * 1.2) {
      setVideoAspectRatio('horizontal')
    } else if (videoHeight > videoWidth * 1.2) {
      setVideoAspectRatio('vertical')
    } else {
      setVideoAspectRatio('square')
    }
  }

  return (
    <div className="min-h-screen  text-black">
      {/* Hero Section */}
      <HeroSimple
        title="Our Projects"
        sub="Explore our portfolio of successful installations and transformations across South Africa."
        bg="/Images/pexels-pixabay-356036.jpg"
        ctaText="View All Projects"
        ctaHref="#projects"
      />

      {/* Category Filter */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 min-w-0 ${
                selectedCategory === category 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border border-black hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Reveal>
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-56 sm:h-64">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-black bg-white rounded-full">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
                      <p className="text-sm text-white/90">{project.location}</p>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal - Mobile Optimized */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80" onClick={() => setSelectedProject(null)}>
          <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8">
            <div className="fixed inset-0" aria-hidden="true" />
            <div className="inline-block w-full max-w-6xl p-4 sm:p-6 my-4 sm:my-8 text-left align-middle bg-white rounded-lg sm:rounded-2xl shadow-xl transform transition-all"
                 onClick={(e) => e.stopPropagation()}>
              
              {/* Adaptive Video/Image Container */}
              {selectedProject.videoUrl ? (
                <div className={`mb-4 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden ${
                  videoAspectRatio === 'vertical' 
                    ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6' 
                    : ''
                }`}>
                  <div className={`relative rounded-lg sm:rounded-xl overflow-hidden ${
                    videoAspectRatio === 'horizontal' ? 'h-48 sm:h-64 md:h-80 lg:h-96' :
                    videoAspectRatio === 'vertical' ? 'h-[400px] sm:h-[500px] lg:h-[600px]' :
                    'h-48 sm:h-64 md:h-80 lg:h-96'
                  }`}>
                    <video
                      src={selectedProject.videoUrl}
                      className={`w-full h-full ${
                        videoAspectRatio === 'vertical' ? 'object-contain bg-black' : 'object-cover'
                      }`}
                      controls
                      playsInline
                      muted
                      loop
                      onLoadedMetadata={handleVideoLoad}
                    />
                  </div>
                  
                  {/* Content beside vertical video */}
                  {videoAspectRatio === 'vertical' && (
                    <div className="space-y-4">
                      <div>
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-black rounded-full">
                          {selectedProject.category}
                        </span>
                        <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-black">{selectedProject.title}</h2>
                        <div className="mt-2 flex items-center gap-4 text-gray-600">
                          <span>{selectedProject.location}</span>
                          <span>•</span>
                          <span>{selectedProject.date}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Project Overview</h3>
                        <p className="text-gray-700 text-sm">{selectedProject.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Challenge</h3>
                        <p className="text-gray-700 text-sm">{selectedProject.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Solution</h3>
                        <p className="text-gray-700 text-sm">{selectedProject.solution}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-96 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content below for horizontal videos or when no video */}
              <div className={`space-y-6 ${videoAspectRatio === 'vertical' ? 'lg:col-span-2' : ''}`}>
                {(!selectedProject.videoUrl || videoAspectRatio !== 'vertical') && (
                  <div>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-black rounded-full">
                      {selectedProject.category}
                    </span>
                    <h2 className="mt-2 text-3xl font-bold text-black">{selectedProject.title}</h2>
                    <div className="mt-2 flex items-center gap-4 text-gray-600">
                      <span>{selectedProject.location}</span>
                      <span>•</span>
                      <span>{selectedProject.date}</span>
                    </div>
                  </div>
                )}

                {(!selectedProject.videoUrl || videoAspectRatio !== 'vertical') && (
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Project Overview</h3>
                    <p className="text-gray-700">{selectedProject.description}</p>
                  </div>
                )}

                {(!selectedProject.videoUrl || videoAspectRatio !== 'vertical') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Challenge</h3>
                      <p className="text-gray-700">{selectedProject.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">Solution</h3>
                      <p className="text-gray-700">{selectedProject.solution}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Results</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedProject.images.map((image, index) => (
                    <div key={index} className="relative h-32 md:h-40 rounded-lg overflow-hidden group cursor-pointer">
                      <Image
                        src={image}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile-friendly close button */}
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-3 text-white bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors duration-200 touch-manipulation"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            Let us help you bring your vision to life with our expert installation services and premium products.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}