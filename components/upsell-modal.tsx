"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  onDecline: () => void
}

export function UpsellModal({ isOpen, onClose, onAccept, onDecline }: UpsellModalProps) {
  if (!isOpen) return null

  const handleAccept = () => {
    window.location.href = "https://mvn0vr-9t.myshopify.com/cart/50672673653016:1"
  }

  const handleDecline = () => {
    window.location.href = "https://mvn0vr-9t.myshopify.com/cart/50689694728472:1"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-balance">
            Congratulations, you've been selected
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-center text-gray-700 text-balance">
            You are one of a select few chosen to receive the Plus Kit, delivered to your home
          </p>

          {/* Image */}
          <div className="w-full rounded-lg overflow-hidden">
            <img
              src="/images/design-mode/Group%201089.png"
              alt="Plus Kit with Hibiscus, Sunflower, and Petunia seeds"
              className="w-full h-auto"
            />
          </div>

          {/* Kit contents description */}
          <p className="text-center text-base sm:text-lg text-gray-800">
            In this kit, you'll receive 20 Hibiscus seeds + 20 Giant Sunflower seeds + 20 Galaxy Petunia seeds
          </p>

          {/* Price section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-red-600 line-through text-lg sm:text-xl font-semibold">£39.80</span>
              <span className="text-green-600 text-3xl sm:text-4xl font-bold">£24.80</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-gray-800">+ Free Delivery</p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleAccept}
              className="w-full h-14 text-base font-bold rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              Yes, I want the Plus Kit
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="w-full h-14 text-base font-bold rounded-md bg-gray-400 hover:bg-gray-500 text-white border-gray-400"
            >
              Just the hibiscus Seeds
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
