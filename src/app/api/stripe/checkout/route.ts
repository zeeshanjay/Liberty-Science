import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const body = await req.json();
    const {
      programName = "Executive Advisory Retainer",
      totalCents = 127500,
      months = 12, // 1 (full), 3, 6, or 12
    } = body;

    const origin =
      req.headers.get("origin") || "https://libertysciencecoaching.com";

    const numMonths = Number(months) || 1;

    if (numMonths === 1) {
      // One-time full payment
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: totalCents,
              product_data: {
                name: `${programName} — Full Retainer`,
                description:
                  "Liberty Science Coaching · Taxonomy Code 71400000X",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/about?payment=success&plan=full`,
        cancel_url: `${origin}/#programs`,
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Monthly installment subscription (3, 6, or 12 months)
      const monthlyCents = Math.round(totalCents / numMonths);
      const totalFormatted = (totalCents / 100).toLocaleString();

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: monthlyCents,
              recurring: {
                interval: "month",
                interval_count: 1,
              },
              product_data: {
                name: `${programName} (${numMonths}-Month Installment Plan)`,
                description: `${numMonths} monthly payments of $${(
                  monthlyCents / 100
                ).toFixed(2)} ($${totalFormatted} total) · Taxonomy 71400000X`,
              },
            },
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            installment_plan_months: String(numMonths),
            total_retainer_cents: String(totalCents),
            program_name: programName,
          },
        },
        success_url: `${origin}/about?payment=success&plan=${numMonths}mo`,
        cancel_url: `${origin}/#programs`,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to initialize Stripe checkout." },
      { status: 500 }
    );
  }
}
