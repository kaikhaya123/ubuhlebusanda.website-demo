import About from '../../components/About'

export const metadata = {
  title: 'About — Ubuhle Busanda',
  description: 'Meet the founders and learn about our story since 2018.'
}

export default function AboutPage(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
  <About fullDisplay={true} />
    </main>
  )
}
