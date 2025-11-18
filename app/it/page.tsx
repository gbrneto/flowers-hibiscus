import { Header } from "@/components/it/header"
import { ProductSection } from "@/components/it/product-section"
import { ScrollingMarquee } from "@/components/it/scrolling-marquee"
import { AlertBar } from "@/components/it/alert-bar"
import { FeaturesSection } from "@/components/it/features-section"
import { ScrollingMarqueeDark } from "@/components/it/scrolling-marquee-dark"
import { SuccessSection } from "@/components/it/success-section"
import { GerminationSection } from "@/components/it/germination-section"
import { TechnicalDataSection } from "@/components/it/technical-data-section"
import { ComparisonSection } from "@/components/it/comparison-section"
import { CustomerReviewsSection } from "@/components/it/customer-reviews-section"
import { TestimonialsSection } from "@/components/it/testimonials-section"
import { OurStorySection } from "@/components/it/our-story-section"
import { Footer } from "@/components/it/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Versia Garden - Piante di Ibisco Premium",
  description: "Piante di ibisco di alta qualità con germinazione garantita",
}

export default function ItalianPage() {
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
