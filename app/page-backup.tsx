export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Ubuhlebusanda Pty Ltd</h1>
        <p className="text-lg text-gray-600">Site temporarily in maintenance mode</p>
        <p className="text-sm text-gray-500 mt-2">React {process.env.NODE_ENV === 'development' ? '18.3.0' : ''} on Next.js 15.5.6</p>
      </div>
    </div>
  );
}