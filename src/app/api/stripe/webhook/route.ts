import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    const eventType = event?.type || "";

    if (
      eventType === "checkout.session.completed" ||
      eventType === "invoice.payment_succeeded" ||
      eventType === "charge.succeeded"
    ) {
      const obj = event.data?.object || {};

      // Extract customer info & amount
      const amountCents =
        obj.amount_total ?? obj.amount_paid ?? obj.amount ?? 0;
      const amountDollars = Math.round(Number(amountCents) / 100);

      if (amountDollars <= 0) {
        return NextResponse.json({ received: true, skipped: "zero_amount" });
      }

      const customerEmail = (
        obj.customer_details?.email ||
        obj.customer_email ||
        obj.billing_details?.email ||
        obj.receipt_email ||
        ""
      )
        .trim()
        .toLowerCase();

      const customerName = (
        obj.customer_details?.name ||
        obj.customer_name ||
        obj.billing_details?.name ||
        (customerEmail ? customerEmail.split("@")[0] : "Stripe Client")
      ).trim();

      const customerPhone = (
        obj.customer_details?.phone ||
        obj.billing_details?.phone ||
        ""
      ).trim();

      const paymentRef = obj.id || event.id;
      const dateStr = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // Infer program name from amount
      let programLabel = "Signature Advisory Retainer";
      if (amountDollars === 75) programLabel = "Explorer Diagnostic Session";
      else if (amountDollars === 99 || amountDollars === 297)
        programLabel = "Basic Mini Program (5 Sessions)";
      else if (
        amountDollars === 106 ||
        amountDollars === 213 ||
        amountDollars === 425 ||
        amountDollars === 1275
      )
        programLabel = "90-Day Quickstart Retainer";
      else if (
        amountDollars === 200 ||
        amountDollars === 400 ||
        amountDollars === 800 ||
        amountDollars === 2400
      )
        programLabel = "6-Month Quality Goals Retainer";
      else if (amountDollars === 1600 || amountDollars === 4800)
        programLabel = "12-Month Beating Resistance Retainer";

      // Check if client already exists in practice_clients
      const { data: existingClients } = await supabaseAdmin
        .from("practice_clients")
        .select("*");

      const matchedClient = (existingClients || []).find(
        (c) =>
          (customerEmail &&
            c.email &&
            c.email.toLowerCase() === customerEmail) ||
          (customerName &&
            c.name &&
            c.name.toLowerCase() === customerName.toLowerCase()) ||
          // Also match if client is already marked with this paymentRef
          (c.clinical_notes && c.clinical_notes.includes(paymentRef))
      );

      // Avoid double-counting the exact same Stripe event/session
      if (
        matchedClient &&
        matchedClient.clinical_notes &&
        matchedClient.clinical_notes.includes(paymentRef)
      ) {
        return NextResponse.json({
          received: true,
          status: "already_recorded",
        });
      }

      const paymentNote = `✓ Verified Stripe Payment: $${amountDollars.toLocaleString()} on ${dateStr} (Ref: ${paymentRef})`;

      if (matchedClient) {
        await supabaseAdmin
          .from("practice_clients")
          .update({
            monthly_fee: Number(matchedClient.monthly_fee || 0) + amountDollars,
            status: "active",
            email: customerEmail || matchedClient.email,
            phone: customerPhone || matchedClient.phone,
            retainer_program:
              matchedClient.retainer_program || programLabel,
            clinical_notes: matchedClient.clinical_notes
              ? `${paymentNote} | ${matchedClient.clinical_notes}`
              : paymentNote,
            updated_at: new Date().toISOString(),
          })
          .eq("id", matchedClient.id);
      } else {
        await supabaseAdmin.from("practice_clients").insert({
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          retainer_program: programLabel,
          monthly_fee: amountDollars,
          status: "active",
          start_date: new Date().toISOString().slice(0, 10),
          primary_focus: "Metabolic Neuroplasticity™",
          delivery_mode: "virtual",
          clinical_notes: paymentNote,
        });
      }

      // Send email alert to Vera
      if (process.env.RESEND_API_KEY) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "Liberty Science Coaching <onboarding@resend.dev>",
            to:
              process.env.NOTIFICATION_EMAIL ||
              "vera@libertysciencecoaching.com",
            subject: `Stripe Payment Received: $${amountDollars.toLocaleString()} — ${customerName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
                <h2 style="color: #0f172a; margin-top: 0;">Stripe Payment Confirmed</h2>
                <p style="color: #475569;">A live Stripe payment has been received and automatically synced to your <strong>/admin</strong> client roster.</p>
                <ul style="color: #1e293b; line-height: 1.8;">
                  <li><strong>Client:</strong> ${customerName}</li>
                  <li><strong>Email:</strong> ${customerEmail || "N/A"}</li>
                  <li><strong>Amount Paid:</strong> $${amountDollars.toLocaleString()}</li>
                  <li><strong>Program:</strong> ${programLabel}</li>
                  <li><strong>Stripe Reference:</strong> ${paymentRef}</li>
                </ul>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Stripe webhook email error:", emailErr);
        }
      }

      return NextResponse.json({ received: true, synced: true });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json(
      { error: err?.message || "Webhook handler failed" },
      { status: 400 }
    );
  }
}
