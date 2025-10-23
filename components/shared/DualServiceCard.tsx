import Image from 'next/image'

export default function DualServiceCard({title, imgLeft, imgRight, children}:{title:string, imgLeft:string, imgRight:string, children?:React.ReactNode}){
  return (
    <article className="flex flex-col bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm" aria-labelledby={`service-${title.replace(/\s+/g,'-')}`}>
      <div className="w-full h-52 sm:h-64 md:h-56 lg:h-64 relative overflow-hidden flex flex-col sm:flex-row">
        {/* left image */}
        <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden">
          <Image src={imgLeft} alt={`${title} left`} fill className="object-cover transform transition-transform duration-300 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
        {/* divider for larger screens */}
        <div className="hidden sm:block w-px bg-white/40 my-4" />
        {/* right image */}
        <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden">
          <Image src={imgRight} alt={`${title} right`} fill className="object-cover transform transition-transform duration-300 hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
      </div>
      <div className="p-4">
        <h3 id={`service-${title.replace(/\s+/g,'-')}`} className="text-center font-semibold">{title}</h3>
        {children && <p className="mt-2 text-sm text-center text-gray-700">{children}</p>}
      </div>
    </article>
  )
}
