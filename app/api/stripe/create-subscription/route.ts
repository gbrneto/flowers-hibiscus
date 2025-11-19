import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

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

    try {
      console.log("[v0] Updating order in Supabase for Upsell 1...")
      
      // First fetch the existing items to append to them
      const { data: existingOrder, error: fetchError } = await supabaseAdmin
        .from("hibiscus_orders")
        .select("items")
        .eq("stripe_customer_id", customerId)
        .single()

      if (fetchError) {
        console.error("[v0] Error fetching existing order:", fetchError)
      } else {
        const currentItems = existingOrder?.items || []
        const newItem = { name: "Gardening Course", type: "upsell1", price: 0 }
        
        const { error: updateError } = await supabaseAdmin
          .from("hibiscus_orders")
          .update({
            upsell1_status: "accepted",
            items: [...currentItems, newItem],
          })
          .eq("stripe_customer_id", customerId)

        if (updateError) {
          console.error("[v0] Supabase update error:", updateError)
        } else {
          console.log("[v0] Order updated in Supabase successfully")
        }
      }
    } catch (dbError) {
      console.error("[v0] Failed to update order in Supabase:", dbError)
    }

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
