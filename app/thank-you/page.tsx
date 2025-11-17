"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void
  }
}

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    setEmail(emailParam)

    if (typeof window !== "undefined" && window.fbq) {
      const orderDataStr = sessionStorage.getItem("orderData")
      if (orderDataStr) {
        try {
          const orderData = JSON.parse(orderDataStr)
          window.fbq("track", "Purchase", orderData)
          console.log("[v0] Facebook Pixel Purchase event fired", orderData)
          // Clear the order data after firing the event
          sessionStorage.removeItem("orderData")
        } catch (error) {
          console.error("[v0] Error parsing order data for Facebook Pixel:", error)
        }
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Image src="/versia-garden-logo.jpg" alt="Versia Garden" width={120} height={50} className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#016630]/10 p-4">
              <CheckCircle className="h-16 w-16 text-[#016630]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Thank you for your purchase!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Your order has been successfully confirmed. You will receive all detailed information about your order and
            shipping via email.
          </p>

          {/* Email Confirmation */}
          {email && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 inline-flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#016630] flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Confirmation sent to:</p>
                <p className="text-base font-medium text-foreground">{email}</p>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-[#F3F8F4] border border-[#016630]/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-3">What happens next?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>You will receive a confirmation email with your order details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Tracking information will be sent as soon as your order is shipped</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Our customer support team is available 24/7 for any questions</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#016630] hover:bg-[#014d24] text-white">
              <Link href="/">
                Back to homepage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:support@versiagarden.com">Contact support</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
            <Link href="#" className="hover:text-foreground transition-colors">
              Refund Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Shipping
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} Versia Garden. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
