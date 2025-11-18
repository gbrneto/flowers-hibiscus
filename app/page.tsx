import { Header } from "@/components/header"
import { ProductSection } from "@/components/product-section"
import { ScrollingMarquee } from "@/components/scrolling-marquee"
import { AlertBar } from "@/components/alert-bar"
import { FeaturesSection } from "@/components/features-section"
import { ScrollingMarqueeDark } from "@/components/scrolling-marquee-dark"
import { SuccessSection } from "@/components/success-section"
import { GerminationSection } from "@/components/germination-section"
import { TechnicalDataSection } from "@/components/technical-data-section"
import { ComparisonSection } from "@/components/comparison-section"
import { CustomerReviewsSection } from "@/components/customer-reviews-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { OurStorySection } from "@/components/our-story-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <ScrollingMarquee />
      <AlertBar />
      <Header />
      <main>
        <ProductSection />
        <FeaturesSection />
        <ScrollingMarqueeDark />
        <SuccessSection />
        <GerminationSection />
        <TechnicalDataSection />
        <ComparisonSection />
        <CustomerReviewsSection />
        <TestimonialsSection />
        <OurStorySection />
      </main>
      <Footer />
    </>
  )
}
