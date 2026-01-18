import dynamic from 'next/dynamic'
import HeroSection from '@/components/landing/HeroSection'

import Header from '@/components/landing/Header'
import AIScanSection from '@/components/landing/AIScanSection'
import BuyerExperience from '@/components/landing/BuyerExperience'
import ReviewerSpotlight from '@/components/landing/ReviewerSpotlight'
import Testimonials from '@/components/landing/Testimonials'
import FeaturedProducts from '@/components/landing/FeaturedProducts'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'TrustMart',
  description: 'Nền tảng mua bán đồ cũ. An toàn, minh bạch, đáng tin cậy.',
}

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white">
      <Header />
      <HeroSection />

      <FeaturedProducts />
      <AIScanSection />
      <BuyerExperience />
      <ReviewerSpotlight />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}