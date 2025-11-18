"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void
  }
}

export default function ThankYouPageIT() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const upsellAccepted = searchParams.get("upsell") === "true"
  const upsell2Accepted = searchParams.get("upsell2") === "true"

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
          <Link href="/it">
            <Image src="/images/design-mode/logoversiagardemsemfundo%201.png" alt="Versia Garden" width={120} height={50} className="h-12 w-auto" />
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
            Grazie per il tuo acquisto!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Il tuo ordine è stato confermato con successo. Riceverai tutte le informazioni dettagliate sul tuo ordine e sulla spedizione via email.
          </p>

          {/* Email Confirmation */}
          {email && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 inline-flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#016630] flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Conferma inviata a:</p>
                <p className="text-base font-medium text-foreground">{email}</p>
              </div>
            </div>
          )}

          {upsellAccepted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-emerald-900">
                <strong>Congratulazioni!</strong> Il tuo accesso al <strong>Corso Maestro di Giardinaggio</strong> è stato attivato.
                Controlla la tua email per le istruzioni di accesso.
              </p>
            </div>
          )}

          {upsell2Accepted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-blue-900">
                <strong>Offerta Confermata!</strong> Il tuo Kit Ibisco extra è stato aggiunto alla tua spedizione.
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-[#F3F8F4] border border-[#016630]/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-3">Cosa succede ora?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Riceverai un'email di conferma con i dettagli del tuo ordine</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Le informazioni di tracciamento verranno inviate non appena il tuo ordine viene spedito</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Il nostro team di assistenza clienti è disponibile 24/7 per qualsiasi domanda</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#016630] hover:bg-[#014d24] text-white">
              <Link href="/it">
                Torna alla homepage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:support@versiagarden.com">Contatta l'assistenza</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica di Rimborso
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Spedizione
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Informativa sulla Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Termini di Servizio
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contatto
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} Versia Garden. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  )
}
