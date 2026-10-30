import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let checkoutToken = "";
    let orderId = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      checkoutToken = body.checkout_token || "";
      orderId = body.order_id || "";
    } else {
      // Affirm often posts application/x-www-form-urlencoded when redirecting
      const formData = await request.formData();
      checkoutToken = (formData.get("checkout_token") as string) || "";
      orderId = (formData.get("order_id") as string) || "";
    }

    const origin = new URL(request.url).origin;

    if (!checkoutToken) {
      return NextResponse.redirect(
        `${origin}/about?payment_status=error&reason=missing_token`,
        303
      );
    }

    const publicKey =
      process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || "ITFCDUPSNUKREKNE";
    const privateKey =
      process.env.AFFIRM_PRIVATE_KEY || "7JZpnDe7ypxMevwD8hLAU7tQ5SrDWa4Y";

    const authHeader = Buffer.from(`${publicKey}:${privateKey}`).toString(
      "base64"
    );

    // 1. Authorize the Affirm transaction using v1/transactions (or v2/charges fallback)
    const authRes = await fetch("https://api.affirm.com/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        transaction_id: checkoutToken,
        order_id: orderId || `LSC-${Date.now()}`,
      }),
    });

    const authData = await authRes.json();

    if (authRes.ok && authData.id) {
      // 2. Capture the authorized Affirm transaction immediately
      await fetch(
        `https://api.affirm.com/api/v1/transactions/${authData.id}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authHeader}`,
          },
          body: JSON.stringify({
            order_id: orderId || authData.order_id || `LSC-${Date.now()}`,
          }),
        }
      );

      // 3. Record in Supabase practice_clients if possible
      try {
        const buyerName = authData.checkout?.billing?.name
          ? `${authData.checkout.billing.name.first || ""} ${
              authData.checkout.billing.name.last || ""
            }`.trim()
          : "Affirm Client";
        const buyerEmail =
          authData.checkout?.billing?.email ||
          "affirm.client@libertysciencecoaching.com";
        const amountDollars = authData.amount
          ? Math.round(authData.amount / 100)
          : 1275;

        await supabaseAdmin.from("practice_clients").insert([
          {
            name: buyerName || "Affirm Enrolled Client",
            email: buyerEmail,
            phone: authData.checkout?.billing?.phone_number || "",
            retainer_program: "Affirm Financed Advisory Retainer",
            monthly_fee: amountDollars,
            status: "active",
            start_date: new Date().toISOString().slice(0, 10),
            primary_focus: "Metabolic Neuroplasticity™",
            delivery_mode: "virtual",
            clinical_notes: `Paid via Affirm Installments (Transaction ID: ${authData.id}).`,
          },
        ]);
      } catch {
        // Non-blocking DB log
      }

      return NextResponse.redirect(
        `${origin}/about?payment_status=affirm_success&tx=${encodeURIComponent(
          authData.id
        )}`,
        303
      );
    }

    // Fallback to v2/charges if merchant account is configured on v2
    const chargeRes = await fetch("https://api.affirm.com/api/v2/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        checkout_token: checkoutToken,
      }),
    });

    const chargeData = await chargeRes.json();

    if (chargeRes.ok && chargeData.id) {
      await fetch(
        `https://api.affirm.com/api/v2/charges/${chargeData.id}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authHeader}`,
          },
        }
      );

      return NextResponse.redirect(
        `${origin}/about?payment_status=affirm_success&tx=${encodeURIComponent(
          chargeData.id
        )}`,
        303
      );
    }

    return NextResponse.redirect(
      `${origin}/about?payment_status=error&reason=auth_failed`,
      303
    );
  } catch (error) {
    console.error("Affirm confirmation error:", error);
    const origin = new URL(request.url).origin;
    return NextResponse.redirect(
      `${origin}/about?payment_status=error`,
      303
    );
  }
}
