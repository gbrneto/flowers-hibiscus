'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    id: 1,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_ltnw6mltnw6mltnw.png',
    text: "L'atmosfera sembra più allegra, con un'atmosfera tropicale, quasi come un rifugio vacanziero privato. È la prima cosa che i miei amici commentano quando mi visitano",
  },
  {
    id: 2,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4zk4nd4zk4nd4zk4.png',
    text: "L'esuberanza dei suoi fiori mi trasporta lontano dal rumore e dal cemento.",
  },
  {
    id: 3,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_qczasfqczasfqcza.png',
    text: "Tutti i miei amici me lo chiedono ogni volta che pubblico una foto. Non illumina solo il mio spazio, illumina il mio feed. È una bellezza che vale la pena condividere.",
  },
  {
    id: 4,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4tkvsy4tkvsy4tkv.png',
    text: "Tra il lavoro, la famiglia e la corsa quotidiana, raramente ho un momento per me. Il mio piccolo angolo con l'Ibisco è diventato il mio santuario. Prendermene cura per cinque minuti, vedendo il colore incredibile dei fiori: questa è la mia meditazione. Mi porta una calma che non riesco a trovare da nessun'altra parte. È il mio lusso quotidiano di tranquillità.",
  },
  {
    id: 5,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png',
    text: "I fiori sono enormi, vibranti e durano tutto il giorno, cambiando tonalità con la luce. Non si tratta solo di avere una bella pianta; si tratta di avere un rituale quotidiano che ti connette a qualcosa di semplice e perfetto.",
  },
  {
    id: 6,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20874.png',
    text: "I risultati parlano da soli: una fioritura abbondante e spettacolare. Per chiunque prenda sul serio il giardinaggio, questa è una scommessa sicura.",
  },
  {
    id: 7,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20877.png',
    text: "Ci siamo trasferiti di recente e stavo cercando quel pezzo per far sentire davvero la casa come casa. L'ho trovato in questo Ibisco. Con la sua esplosione di colore, ha portato esattamente l'energia e la personalità che mancava al nostro soggiorno.",
  },
  {
    id: 8,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20878.png',
    text: "Mio marito mi ha regalato questa piantina di Ibisco per il nostro anniversario, ed è il regalo più speciale che abbia mai ricevuto. Invece di fiori che muoiono in una settimana, ho ottenuto fiori che sbocciano ogni settimana! Ogni nuovo bocciolo che si apre sembra una piccola celebrazione del nostro amore e della nostra vita. È un regalo che letteralmente continua a fiorire.",
  },
  {
    id: 9,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20875.png',
    text: "Ho sempre apprezzato il design e l'estetica, e per me, il fiore di Ibisco è un'opera d'arte della natura. I dettagli sono incredibili: la delicata texture dei petali, il gradiente di colore, il contrasto del pistillo... è una struttura perfetta.",
  },
]

export function CustomerReviewsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Approvato dai nostri clienti
        </h2>
        
        <div className="relative px-4 md:px-16">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/3">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <img
                        src={review.image || "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png"}
                        alt={`Recensione cliente ${review.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4 md:hidden">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'w-8 bg-gray-800'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Vai alla slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
