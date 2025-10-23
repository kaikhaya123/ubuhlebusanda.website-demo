import Image from 'next/image'

export default function ServiceCard({title, img, children}:{title:string, img:string, children?:React.ReactNode}){
  return (
    <article className="flex flex-col bg-transparent rounded-lg overflow-hidden shadow-sm group" aria-labelledby={`service-${title.replace(/\s+/g,'-')}`}>
      <figure className="w-full h-52 sm:h-64 md:h-56 lg:h-64 relative overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover object-center transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
      </figure>
      <div className="p-4">
        <h3 id={`service-${title.replace(/\s+/g,'-')}`} className="text-center font-semibold">{title}</h3>
        {children && <p className="mt-2 text-sm text-center text-gray-700">{children}</p>}
      </div>
    </article>
  )
}
