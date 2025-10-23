import Image from 'next/image'

export default function SplitServiceCard({
  title,
  left,
  right,
  href,
  variant = 'flat',
  large = false
}:{
  title:string,
  left:{src:string; alt?:string; label?:string},
  right:{src:string; alt?:string; label?:string},
  href?:string,
  variant?: 'flat'|'chip'|'frame'
  large?: boolean
}){
  const Wrapper: any = href ? 'a' : 'div'
  const heightClass = large ? 'h-64 sm:h-80 md:h-96' : 'h-48 sm:h-56 md:h-64'
  return (
    <Wrapper href={href} className="block group">
      <article className="flex flex-col bg-transparent rounded-2xl overflow-hidden shadow-sm" aria-labelledby={`service-${title.replace(/\s+/g,'-')}`}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 items-stretch w-full">
          <div className="relative overflow-hidden rounded-md">
            <div className={`w-full ${heightClass} relative bg-gray-50`}> 
              <Image src={left.src} alt={left.alt || left.label || title} fill className="object-cover object-center transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </div>
            {variant === 'chip' && (
              <div className="absolute left-4 bottom-4 bg-white/90 px-3 py-1 rounded-full text-sm shadow-sm">{left.label}</div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-md">
            <div className={`w-full ${heightClass} relative bg-gray-50`}> 
              <Image src={right.src} alt={right.alt || right.label || title} fill className="object-cover object-center transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </div>
            {variant === 'chip' && (
              <div className="absolute left-4 bottom-4 bg-white/90 px-3 py-1 rounded-full text-sm shadow-sm">{right.label}</div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 id={`service-${title.replace(/\s+/g,'-')}`} className="text-center font-semibold">{title}</h3>
        </div>
      </article>
    </Wrapper>
  )
}
