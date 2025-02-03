import LandingPage from '@/components/LandingPage'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black via-[#DC1C3C] to-[#DC1C3C] bg-fixed">
      <div className="container mx-auto px-4 py-16"> {/* Changed py-8 to py-16 */}
        <h1 className="text-4xl font-bold text-[#DC1C3C] mb-2 text-center">Welcome to Krimson.</h1>
        <LandingPage />
      </div>
    </main>
  )
}