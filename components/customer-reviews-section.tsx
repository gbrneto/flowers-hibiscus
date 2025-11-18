'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reviews = [
  {
    id: 1,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_ltnw6mltnw6mltnw.png',
    text: "The atmosphere feels more cheerful, with a tropical vibe, almost like a private holiday retreat. It's the first thing my friends comment on when they visit",
  },
  {
    id: 2,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4zk4nd4zk4nd4zk4.png',
    text: "The exuberance of its flowers transports me far away from the noise and concrete.",
  },
  {
    id: 3,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_qczasfqczasfqcza.png',
    text: "All my friends ask about it whenever I post a photo. It doesn't just brighten up my space, it brightens up my feed. It's beauty worth sharing.",
  },
  {
    id: 4,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4tkvsy4tkvsy4tkv.png',
    text: "Between work, family, and the daily rush, I rarely get a moment to myself. My little corner with the Hibiscus has become my sanctuary. Tending to it for five minutes, seeing the incredible color of the flowers—that's my meditation. It brings me a calm I can't find anywhere else. It's my daily luxury of tranquility.",
  },
  {
    id: 5,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png',
    text: "The flowers are huge, vibrant, and last all day, changing their hue with the light. It's not just about having a beautiful plant; it's about having a daily ritual that connects you to something simple and perfect.",
  },
  {
    id: 6,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20874.png',
    text: "The results speak for themselves: an abundant and spectacular bloom. For anyone who takes gardening seriously, this is a safe bet.",
  },
  {
    id: 7,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20877.png',
    text: "We moved recently, and I was looking for 'that one' piece to make the house truly feel like home. I found it in this Hibiscus. With its burst of color, it brought the exact energy and personality our living room was missing.",
  },
  {
    id: 8,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20878.png',
    text: "My husband gave me this Hibiscus seedling for our anniversary, and it's the most special gift I've ever received. Instead of flowers that die in a week, I got flowers that bloom every week! Every new bud that opens feels like a small celebration of our love and life. It's a gift that literally keeps on blooming.",
  },
  {
    id: 9,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20875.png',
    text: "I've always appreciated design and aesthetics, and for me, the Hibiscus flower is a work of art by nature. The details are incredible: the delicate texture of the petals, the color gradient, the contrast of the pistil... it's a perfect structure.",
  },
]

export function CustomerReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const itemsPerPage = 3
  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
  
  const visibleReviews = reviews.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Approved by our customers
        </h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-100"
            onClick={prevSlide}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-100"
            onClick={nextSlide}
            aria-label="Next reviews"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16">
            {visibleReviews.map((review) => (
              <div key={review.id} className="flex flex-col">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <img
                    src={review.image || "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png"}
                    alt={`Customer review ${review.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gray-800'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
