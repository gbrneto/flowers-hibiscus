"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Heart, Shield, Truck, Star, Check, Minus, Plus, ChevronLeft, ChevronRight, ShoppingCart, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UpsellModal } from "@/components/upsell-modal"
import { useCart } from "@/lib/cart-context"

const PRODUCT_IMAGES = [
  "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20894.png",
  "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20vermelho.png",
  "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20amarelo.png",
  "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20rosa%201.1.png",
  "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20roxo%201.1.png",
]

const COLOR_IMAGE_MAP: Record<string, number> = {
  "Colori Misti": 0,
  "Rosso": 1,
  "Giallo": 2,
  "Rosa": 3,
  "Viola": 4,
}

export function ProductSection() {
  const [selectedColor, setSelectedColor] = useState("Colori Misti")
  const [selectedKit, setSelectedKit] = useState("20-seeds")
  const [quantity, setQuantity] = useState(1)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const offersRef = useRef<HTMLDivElement>(null)

  const { addItem } = useCart()

  const colors = [
    { id: "Colori Misti", label: "Colori Misti" },
    { id: "Rosso", label: "Rosso" },
    { id: "Giallo", label: "Giallo" },
    { id: "Rosa", label: "Rosa" },
    { id: "Viola", label: "Viola" },
  ]

  const kits = [
    { id: "20-seeds", label: "Offerta Speciale - Kit Pianta Ibisco 4 Colori (Giallo, Viola, Rosso e Rosa)", price: 19.87, originalPrice: 39.74 },
    { id: "75-seeds", label: "Ibisco Rosso - Confezione da 4", price: 24.87, originalPrice: 49.74 },
    { id: "50-seeds", label: "Ibisco Giallo - Confezione da 4", price: 24.87, originalPrice: 49.74 },
    {
      id: "silver-kit",
      label: "Ibisco Rosa - Confezione da 4",
      price: 24.87,
      originalPrice: 49.74,
    },
    {
      id: "gold-kit",
      label: "Ibisco Viola - Confezione da 4",
      price: 24.87,
      originalPrice: 49.74,
    },
  ]

  const getCurrentPrice = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    return kit ? kit.price : 0
  }

  const getOriginalPrice = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    return kit ? kit.originalPrice : 39.74
  }

  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice()
    const originalPrice = getOriginalPrice()
    if (currentPrice === 0) return 100
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    return discount
  }

  const handleAddToCart = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    if (kit) {
      const cartItem = {
        id: `${selectedColor}-${selectedKit}`,
        name: "Kit Ibisco Rari | Multicolore",
        color: selectedColor,
        kit: selectedKit,
        kitLabel: kit.label,
        price: kit.price,
        originalPrice: kit.originalPrice,
        image: PRODUCT_IMAGES[COLOR_IMAGE_MAP[selectedColor] || 0],
        quantity: quantity,
      }
      addItem(cartItem)

      if (typeof window !== "undefined" && (window as any).fbq) {
        ;(window as any).fbq("track", "AddToCart", {
          content_name: cartItem.name,
          content_ids: [cartItem.id],
          content_type: "product",
          value: cartItem.price * quantity,
          currency: "EUR",
        })
      }
    }
  }

  const handleAcceptUpsell = () => {
    console.log("[v0] User accepted Plus Kit upsell")
    setShowUpsellModal(false)
  }

  const handleDeclineUpsell = () => {
    console.log("[v0] User declined Plus Kit upsell, proceeding with free hibiscus seeds")
    setShowUpsellModal(false)
  }

  const handleColorSelect = (colorLabel: string) => {
    setSelectedColor(colorLabel)
    const imageIndex = COLOR_IMAGE_MAP[colorLabel]
    if (imageIndex !== undefined) {
      setCurrentSlide(imageIndex)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PRODUCT_IMAGES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const getLondonDate = (daysOffset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + daysOffset)

    const londonDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/London" }))
    return londonDate
  }

  const formatDate = (date: Date) => {
    const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
    const day = date.getDate()
    const month = months[date.getMonth()]

    return `${day} ${month}`
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const startMonth = startDate.toLocaleString("it-IT", { month: "short", timeZone: "Europe/London" })
    const endMonth = endDate.toLocaleString("it-IT", { month: "short", timeZone: "Europe/London" })
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth}`
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="w-full bg-white">
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onAccept={handleAcceptUpsell}
        onDecline={handleDeclineUpsell}
      />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div
              ref={carouselRef}
              className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {PRODUCT_IMAGES.map((image, index) => (
                  <div key={index} className="min-w-full h-full flex-shrink-0">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Immagine prodotto ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {PRODUCT_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      currentSlide === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/75",
                    )}
                    aria-label={`Vai alla slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {PRODUCT_IMAGES.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all",
                    currentSlide === index ? "border-black" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Miniatura ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-balance leading-tight">
              Kit Ibisco Rari | Multicolore
            </h1>

            <div className="flex flex-wrap gap-6 lg:gap-8 justify-center mx-10">
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">Colori Vibranti</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">
                  Garanzia
                  <br />
                  di
                  <br />
                  Crescita
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">Consegna Sicura</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9 | Eccellente | 19.329+ recensioni</span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">
                  <strong>Successo Garantito:</strong> Le tue giovani piante arriveranno sane e hanno la garanzia di crescere rigogliose, oppure ti rimborsiamo.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">
                  Ricevi un kit GRATUITO di fertilizzante e fungicida per nutrire e proteggere le tue nuove piante.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">Inizia in Anticipo: Goditi piante sane e verdi dal momento del loro arrivo.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">Goditi un Giardino Pieno di Fiori Vibranti e Bellissimi.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">€{getCurrentPrice().toFixed(2).replace(".", ",")}</span>
              <span className="text-lg text-gray-500 line-through">
                €{getOriginalPrice().toFixed(2).replace(".", ",")}
              </span>
              <span className="bg-warning-yellow text-white text-xs font-bold px-2 py-1 rounded">
                🔥 RISPARMIA {getDiscountPercentage()}%
              </span>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Colore del Fiore - {selectedColor}</label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color.label)}
                    className={cn(
                      "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                      selectedColor === color.label
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-gray-400",
                    )}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={offersRef} className="space-y-3">
              <label className="text-sm font-semibold">
                Opzioni Kit - {kits.find((k) => k.id === selectedKit)?.label}
              </label>
              <div className="space-y-2">
                {kits.map((kit) => (
                  <button
                    key={kit.id}
                    onClick={() => setSelectedKit(kit.id)}
                    className={cn(
                      "w-full px-4 py-3 rounded-full border text-sm font-medium text-left transition-all",
                      selectedKit === kit.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-gray-400",
                    )}
                  >
                    {kit.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Quantità</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-md"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-base font-bold rounded-md"
              style={{ backgroundColor: "#2d5f4f", color: "white" }}
            >
              AGGIUNGI AL CARRELLO
            </Button>

            <div className="pt-6 pb-4">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-6 left-12 w-20 sm:w-24 h-0.5 bg-gray-900" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDate(getLondonDate(0))}</p>
                    <p className="text-xs text-gray-600">Ordinato</p>
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-6 left-12 w-20 sm:w-24 h-0.5 bg-gray-900" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDateRange(getLondonDate(1), getLondonDate(2))}</p>
                    <p className="text-xs text-gray-600">Ordine Pronto</p>
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDateRange(getLondonDate(5), getLondonDate(7))}</p>
                    <p className="text-xs text-gray-600">Consegnato</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <img
                src="/images/design-mode/Pagamento%20seguro.webp"
                alt="Metodi di Pagamento Sicuri"
                className="max-w-full h-auto w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 z-50",
          showStickyBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate">
                Kit Ibisco Rari | Multicolore
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold">€{getCurrentPrice().toFixed(2).replace(".", ",")}</span>
                <span className="text-sm text-gray-500 line-through">
                  €{getOriginalPrice().toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
            <Button
              onClick={selectedKit === "20-seeds" ? scrollToOffers : handleAddToCart}
              className="h-12 px-6 text-sm font-bold rounded-md whitespace-nowrap"
              style={{ backgroundColor: "#2d5f4f", color: "white" }}
            >
              Aggiungi al carrello
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
