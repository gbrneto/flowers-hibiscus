import { Star } from 'lucide-react'
import Image from "next/image"

export function OurStorySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/design-mode/Gemini_Generated_Image_bh8t6jbh8t6jbh8t.png"
                alt="Helena Viana, founder of Versia Garden, in greenhouse"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Our Story</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Versia Garden's story begins with the passion of our founder, botanist Helena Viana, for the power of
                flowers to turn the ordinary into the extraordinary. She saw that thousands of people shared this dream
                but were held back by the frustration of inaccessible and difficult-to-grow rare plants. Her mission
                became clear: to create a complete ecosystem to empower anyone to succeed, focusing solely on the joy of
                gardening.
              </p>

              <p>
                From that mission, 'The Colour Awakening' movement was born. Today, we are more than a store; we are
                partners for everyone who wishes to be an agent of transformation by cultivating beauty in their own
                homes. Join us, plant a hibiscus, and watch your own story of colour unfold.
              </p>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center gap-2 pt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">(19,329 Reviews)</span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/design-mode/a8e399fcfcf6a29c3ce0bd1ae5ff2900d1d38aa9.webp"
              alt="Hibiscus growth process"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
