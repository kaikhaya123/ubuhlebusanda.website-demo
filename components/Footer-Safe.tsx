import Image from 'next/image'

export default function Footer(){
  return (
    <footer className="mt-12 border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="flex-shrink-0">
              <Image
                src="/Images/chatgpt-2025-09-29-08-16-40.png"
                alt="Ubuhlebusanda Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Ubuhlebusanda Pty Ltd</h3>
              <p className="text-sm text-gray-600">Electrical Excellence & Innovation</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
            <span>© 2025 Ubuhlebusanda Pty Ltd</span>
            <span className="hidden md:inline">|</span>
            <span>All rights reserved</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Electrical Installations</li>
                <li>Lorenzetti Products</li>
                <li>Maintenance & Repairs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Coverage</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Nationwide Service</li>
                <li>Residential & Commercial</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Professional Consultation</li>
                <li>Quality Guaranteed</li>
                <li>Licensed & Insured</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}