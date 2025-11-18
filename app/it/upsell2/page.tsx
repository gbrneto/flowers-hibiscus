"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Upsell2PageIT() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(282) // 4:42 in seconds
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Offerta Speciale - Kit Pianta Ibisco 4 Colori (Giallo, Viola, Rosso e Rosa)")
  const [selectedKit, setSelectedKit] = useState("special-offer")
  const [quantity, setQuantity] = useState(1)

  const email = searchParams.get("email")
  const customer = searchParams.get("customer")

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const images = [
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20894.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20vermelho.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20amarelo.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20rosa%201.1.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20roxo%201.1.png",
  ]

  const colorOptions = [
    { 
      id: "special-offer", 
      label: "Offerta Speciale - Kit Pianta Ibisco 4 Colori (Giallo, Viola, Rosso e Rosa)",
      price: 19.87,
      imageIndex: 0
    },
    { 
      id: "red", 
      label: "Ibisco Rosso - Confezione da 4",
      price: 24.87,
      imageIndex: 1
    },
    { 
      id: "yellow", 
      label: "Ibisco Giallo - Confezione da 4",
      price: 24.87,
      imageIndex: 2
    },
    { 
      id: "pink", 
      label: "Ibisco Rosa - Confezione da 4",
      price: 24.87,
      imageIndex: 3
    },
    { 
      id: "purple", 
      label: "Ibisco Viola - Confezione da 4",
      price: 24.87,
      imageIndex: 4
    },
  ]

  const getOriginalPrice = () => {
    const option = colorOptions.find(opt => opt.id === selectedKit)
    return option ? option.price * quantity : 0
  }

  const getDiscountedPrice = () => {
    return getOriginalPrice() * 0.5 // 50% discount
  }

  const getDiscount = () => {
    return getOriginalPrice() - getDiscountedPrice()
  }

  const handleColorSelect = (optionId: string) => {
    setSelectedKit(optionId)
    const option = colorOptions.find(opt => opt.id === optionId)
    if (option) {
      setSelectedColor(option.label)
      setCurrentImageIndex(option.imageIndex)
    }
  }

  const handleAccept = async () => {
    setIsLoading(true)
    setErrorMessage(null)

    if (!customer) {
      setErrorMessage("ID cliente non trovato. Si prega di contattare l'assistenza.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe/create-one-time-charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customer,
          priceId: "price_EUR_UPSELL2_PLACEHOLDER",
          amountInCents: 994,
          currency: "eur"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process payment")
      }

      router.push(`/it/thank-you?email=${encodeURIComponent(email || "")}&upsell2=true`)
    } catch (error) {
      console.error("[v0] Upsell 2 charge error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Si è verificato un errore. Riprova.")
      setIsLoading(false)
    }
  }

  const handleDecline = () => {
    router.push(`/it/thank-you?email=${encodeURIComponent(email || "")}`)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/it">
            <img src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/logoversiagardemsemfundo%201.png" alt="Versia Garden" className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance px-2">
            Congratulazioni! Sei stato selezionato per ricevere il doppio delle piante per la tua casa.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl mx-auto text-pretty px-2">
            Esatto! Come nostro nuovo cliente, hai guadagnato un'opportunità unica per portare a casa il doppio dei fiori – un altro Kit Pianta Ibisco da 4 – con il 50% DI SCONTO su questo secondo kit. Approfitta di questa offerta esclusiva! Non è necessario reinserire i tuoi dati, basta cliccare il pulsante qui sotto per confermare.
          </p>
        </div>

        {/* Timer */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 text-center mb-6 sm:mb-8 max-w-md mx-auto">
          <p className="text-sm sm:text-base text-foreground">
            L'offerta scade tra: <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt="Kit Pianta Ibisco"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2 overflow-x-auto flex-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 rounded border-2 overflow-hidden ${
                      currentImageIndex === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Kit Semi di Fiori di Ibisco Rari | Multicolore
              </h2>
              <p className="text-xs uppercase text-muted-foreground mb-3 sm:mb-4 tracking-wide">
                OFFERTA SPECIALE - KIT PIANTA IBISCO 4 COLORI (GIALLO, VIOLA, ROSSO E ROSA)
              </p>
              
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <span className="text-red-600 line-through text-base sm:text-lg">€ {getOriginalPrice().toFixed(2)}</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground">€ {getDiscountedPrice().toFixed(2)}</span>
                <span className="bg-warning-yellow text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  🔥 RISPARMIA 50%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold block">Colore del Fiore - {selectedColor}</label>
              <div className="space-y-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleColorSelect(option.id)}
                    className={cn(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-medium text-left transition-all break-words",
                      selectedKit === option.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Quantità</label>
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-md flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 rounded-md flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border border-border rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Subtotale</span>
                <span className="font-medium">€ {getOriginalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Sconto (50%)</span>
                <span className="font-medium text-green-600">- € {getDiscount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Spedizione</span>
                <span className="font-medium">Gratuita</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base sm:text-lg font-bold">
                <span>Totale</span>
                <span>€ {getDiscountedPrice().toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Inclusi € 0,00 di tasse</p>
            </div>

            {/* CTA Buttons */}
            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className="bg-[#1e73be] hover:bg-[#155a96] w-full h-12 sm:h-14 text-base sm:text-lg font-bold"
            >
              {isLoading ? "Elaborazione..." : "SÌ, RICHIEDI QUESTA OFFERTA!"}
            </Button>

            <Button
              onClick={handleDecline}
              disabled={isLoading}
              variant="outline"
              className="w-full h-10 sm:h-12 text-sm sm:text-base"
            >
              Rifiuta offerta
            </Button>

            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground justify-center flex-wrap">
            <Link href="#" className="hover:text-foreground transition-colors">
              Informativa sulla Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica di Cancellazione
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
