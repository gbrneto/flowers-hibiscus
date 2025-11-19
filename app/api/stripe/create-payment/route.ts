import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

// --- PRICE CONFIGURATION AREA ---
const PRICE_IDS = {
  GBP: {
    oneTime: "price_1SDSeHCNWzvB3NegK5C4yyUn",
    subscription: "price_1SDSgcCNWzvB3Neg0YVKPGmB",
  },
  EUR: {
    oneTime: "price_1SDShyCNWzvB3Negz4rxJVjE",
    subscription: "price_1SDSiiCNWzvB3NegN4flj6I1",
  },
}
// --- END PRICE CONFIGURATION AREA ---

export async function POST(request: NextRequest) {
  let locale = 'en'
  
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    console.log("[v0] App URL from env:", appUrl)

    if (!appUrl.startsWith("http://") && !appUrl.startsWith("https://")) {
      console.error("[v0] CRITICAL: NEXT_PUBLIC_APP_URL must include protocol (https://)")
      return NextResponse.json(
        { error: "Server configuration error: Invalid app URL. Please contact support." },
        { status: 500 },
      )
    }

    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Configuration error." }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })
    const body = await request.json()
    locale = body.locale || 'en'
    const { paymentMethodId, customerData, amountInCents, currency } = body

    console.log("[v0] Payment request:", {
      currency,
      amountInCents,
      customerEmail: customerData.email,
      country: customerData.country,
      locale,
    })

    const currencyKey = currency.toUpperCase() as keyof typeof PRICE_IDS
    if (!PRICE_IDS[currencyKey]) {
      return NextResponse.json({ error: `Currency ${currency} not supported.` }, { status: 400 })
    }

    console.log("[v0] Creating Stripe customer...")
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: `${customerData.firstName} ${customerData.lastName}`,
      address: {
        line1: customerData.address,
        city: customerData.city,
        postal_code: customerData.postcode,
        country: customerData.country,
      },
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
    })
    console.log("[v0] Customer created:", customer.id)

    const currentPrices = PRICE_IDS[currencyKey]

    console.log("[v0] Creating subscription with price:", currentPrices.subscription)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: currentPrices.subscription }],
      trial_period_days: 29,
    })
    console.log("[v0] Subscription created:", subscription.id, "Status:", subscription.status)

    if (amountInCents > 0) {
      console.log("[v0] Creating one-time payment:", amountInCents, currency)

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: currency.toLowerCase(),
        customer: customer.id,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        description: "Versia Garden Kit - Shipping fee",
        metadata: {
          type: "one-time-shipping",
          subscription_id: subscription.id,
        },
      })
      console.log("[v0] PaymentIntent created:", paymentIntent.id, "Status:", paymentIntent.status)

      if (paymentIntent.status !== "succeeded") {
        console.error("[v0] Payment failed:", paymentIntent.status)
        return NextResponse.json(
          { error: `Payment failed with status: ${paymentIntent.status}`, success: false },
          { status: 400 },
        )
      }
    } else {
      console.log("[v0] Skipping one-time payment (amount is 0)")
    }

    try {
      console.log("[v0] Logging order to Supabase...")
      const { error: supabaseError } = await supabaseAdmin.from("hibiscus_orders").insert({
        stripe_customer_id: customer.id,
        customer_email: customerData.email,
        customer_name: `${customerData.firstName} ${customerData.lastName}`,
        customer_phone: customerData.phone || null,
        shipping_address: {
          line1: customerData.address,
          city: customerData.city,
          postal_code: customerData.postcode,
          country: customerData.country,
        },
        items: [
          {
            name: "Hibiscus Kit",
            type: "main",
            price: amountInCents,
          },
        ],
        total_amount_cents: amountInCents,
        currency: currency,
      })

      if (supabaseError) {
        console.error("[v0] Supabase insert error:", supabaseError)
      } else {
        console.log("[v0] Order logged to Supabase successfully")
      }
    } catch (dbError) {
      console.error("[v0] Failed to log order to Supabase:", dbError)
    }

    const upsellPath = locale === 'it' ? '/it/upsell1' : '/upsell1'
    const redirectUrl = `${appUrl}${upsellPath}?email=${encodeURIComponent(customerData.email)}&customer=${customer.id}`
    console.log("[v0] Success! Redirecting to:", redirectUrl)

    return NextResponse.json({
      success: true,
      redirectUrl,
    })
  } catch (error: any) {
    console.error("[v0] Stripe payment error:", error)
    
    const errorMap: Record<string, { en: string; it: string }> = {
      card_declined: {
        en: "Your card was declined.",
        it: "La tua carta è stata rifiutata.",
      },
      insufficient_funds: {
        en: "Insufficient funds.",
        it: "Fondi insufficienti.",
      },
      expired_card: {
        en: "Your card has expired.",
        it: "La tua carta è scaduta.",
      },
      incorrect_cvc: {
        en: "Incorrect CVC.",
        it: "CVC non corretto.",
      },
      processing_error: {
        en: "An error occurred while processing your card.",
        it: "Si è verificato un errore durante l'elaborazione della carta.",
      },
      incorrect_number: {
        en: "The card number is incorrect.",
        it: "Il numero della carta non è corretto.",
      },
    }

    const defaultError = {
      en: "An error occurred while processing your payment.",
      it: "Si è verificato un errore durante l'elaborazione del pagamento.",
    }

    const currentLocale = (locale === 'it' ? 'it' : 'en') as 'it' | 'en'
    let errorMessage = defaultError[currentLocale]

    if (error?.code && errorMap[error.code]) {
      errorMessage = errorMap[error.code][currentLocale]
    }

    return NextResponse.json({ error: errorMessage, success: false }, { status: 400 })
  }
}
