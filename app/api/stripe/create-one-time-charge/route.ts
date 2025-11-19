import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { customerId, priceId, amountInCents, currency } = await request.json()

    if (!customerId || !priceId) {
      return NextResponse.json(
        { error: "Missing required fields: customerId or priceId" },
        { status: 400 }
      )
    }

    if (!amountInCents || !currency) {
      return NextResponse.json(
        { error: "Missing required fields: amountInCents or currency" },
        { status: 400 }
      )
    }

    // List the customer's payment methods
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    })

    if (!paymentMethods.data || paymentMethods.data.length === 0) {
      return NextResponse.json(
        { error: "No payment method found for this customer" },
        { status: 400 }
      )
    }

    const paymentMethodId = paymentMethods.data[0].id

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      description: "Upsell 2 - Hibiscus Plant Kit (4-Color)",
      metadata: {
        upsell_type: "hibiscus_kit",
        price_id: priceId,
      },
    })

    try {
      console.log("[v0] Updating order in Supabase for Upsell 2...")
      
      // First fetch the existing items and total_amount to update them
      const { data: existingOrder, error: fetchError } = await supabaseAdmin
        .from("hibiscus_orders")
        .select("items, total_amount_cents")
        .eq("stripe_customer_id", customerId)
        .single()

      if (fetchError) {
        console.error("[v0] Error fetching existing order:", fetchError)
      } else {
        const currentItems = existingOrder?.items || []
        const currentTotal = existingOrder?.total_amount_cents || 0
        
        const newItem = { name: "Extra Hibiscus Kit", type: "upsell2", price: amountInCents }
        
        const { error: updateError } = await supabaseAdmin
          .from("hibiscus_orders")
          .update({
            upsell2_status: "accepted",
            items: [...currentItems, newItem],
            total_amount_cents: currentTotal + amountInCents,
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
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    })
  } catch (error: any) {
    console.error("[v0] Create one-time charge error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 }
    )
  }
}
