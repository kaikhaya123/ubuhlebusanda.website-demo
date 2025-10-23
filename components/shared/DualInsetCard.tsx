import Image from 'next/image'

export default function DualInsetCard({title, baseImg, insetImg, position = 'right', children}:{title:string, baseImg:string, insetImg:string, position?:'left'|'right', children?:React.ReactNode}){
  const insetClasses = position === 'left' ? 'left-4 bottom-4 -rotate-2 sm:-rotate-2' : 'right-4 bottom-4 rotate-2 sm:rotate-2'
  return (
    <article className="relative flex flex-col bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm" aria-labelledby={`service-${title.replace(/\s+/g,'-')}`}>
      <div className="w-full h-52 sm:h-64 md:h-56 lg:h-64 relative bg-gray-100">
        <Image src={baseImg} alt={`${title} base`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        <div className={`absolute ${insetClasses} w-24 h-16 sm:w-36 sm:h-24 md:w-44 md:h-32 rounded-xl overflow-hidden bg-white/80 shadow-lg transform transition-transform duration-300 hover:scale-105`}>
          <Image src={insetImg} alt={`${title} inset`} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
        </div>
        {/* subtle overlay to help text legibility on top of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      <div className="p-4">
        <h3 id={`service-${title.replace(/\s+/g,'-')}`} className="text-center font-semibold">{title}</h3>
        {children && <p className="mt-2 text-sm text-center text-gray-700">{children}</p>}
      </div>
    </article>
  )
}
