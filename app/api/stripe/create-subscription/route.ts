import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Configuration error." }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })
    const { customerId, priceId } = await request.json()

    if (!customerId || !priceId) {
      return NextResponse.json({ error: "Missing required parameters: customerId or priceId" }, { status: 400 })
    }

    console.log("[v0] Creating upsell subscription for customer:", customerId)

    // Create subscription with 1-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 1,
    })

    console.log("[v0] Upsell subscription created:", subscription.id, "Status:", subscription.status)

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
    })
  } catch (error) {
    console.error("[v0] Subscription creation error:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
