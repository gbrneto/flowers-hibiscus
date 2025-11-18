"use client"

import { useEffect, useState } from "react"
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalItems, getSubtotal, getTotalSavings } =
    useCart()
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const router = useRouter()

  // Countdown timer
  useEffect(() => {
    if (!isOpen || items.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, items.length])

  // Reset timer when cart opens
  useEffect(() => {
    if (isOpen && items.length > 0) {
      setTimeLeft(300)
    }
  }, [isOpen, items.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            Cart • {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Bar */}
        {items.length > 0 && (
          <div className="bg-black text-white text-center py-3 text-sm font-semibold">
            Cart reserved for {formatTime(timeLeft)}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">
                      {item.color} / {item.kitLabel}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">
                            £{(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-sm font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-success-green font-medium">
                          (You save £{((item.originalPrice - item.price) * item.quantity).toFixed(2)})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {/* Savings */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Savings</span>
              <span className="text-success-green font-bold">-£{getTotalSavings().toFixed(2)}</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">£{getSubtotal().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full h-12 text-base font-bold rounded-md"
              style={{ backgroundColor: "#2d5f4f", color: "white" }}
            >
              Check out
            </Button>

            {/* Payment Icons */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <img src="/images/design-mode/Pagamento%20seguro.webp" alt="Payment methods" className="h-8 opacity-70" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
