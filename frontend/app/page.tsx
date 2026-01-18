import dynamic from 'next/dynamic'
import HeroSection from '@/components/landing/HeroSection'
// import TrustIndicators from '@/components/landing/TrustIndicators' // Removed per user request
import Header from '@/components/landing/Header'
import AIScanSection from '@/components/landing/AIScanSection'
import BuyerExperience from '@/components/landing/BuyerExperience'
import ReviewerSpotlight from '@/components/landing/ReviewerSpotlight'
import Testimonials from '@/components/landing/Testimonials'
import FeaturedProducts from '@/components/landing/FeaturedProducts'
import Footer from '@/components/landing/Footer'

// Lazy load
const ValueProposition = dynamic(() => import('@/components/landing/ValueProposition'))

export const metadata = {
  title: 'SecondLife - Premium Secondhand Marketplace',
  description: 'A vibrant marketplace for premium secondhand goods. Verified by AI.',
}

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white">
      <Header />
      <HeroSection />
      {/* <TrustIndicators /> Removed */}
      <FeaturedProducts />
      <AIScanSection />
      <BuyerExperience />
      <Testimonials />
      <ReviewerSpotlight />
      <Footer />
    </main>
  )
}