import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminRequest } from "@/lib/adminAuth";
import Stripe from "stripe";

export async function GET(request: Request) {
  try {
    const authError = verifyAdminRequest(request);
    if (authError) return authError;

    // 0. Auto-sync live Stripe paid sessions into Supabase practice_clients
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      try {
        const stripe = new Stripe(stripeKey);
        const sessions = await stripe.checkout.sessions.list({ limit: 20 });
        const paidSessions = sessions.data.filter(
          (s) => s.payment_status === "paid" && (s.amount_total || 0) > 0
        );

        if (paidSessions.length > 0) {
          const { data: currentRoster } = await supabaseAdmin
            .from("practice_clients")
            .select("*");

          for (const sess of paidSessions) {
            const alreadySynced = (currentRoster || []).some(
              (c) => c.clinical_notes && c.clinical_notes.includes(sess.id)
            );
            if (alreadySynced) continue;

            const amountDollars = Math.round((sess.amount_total || 0) / 100);
            const email = (sess.customer_details?.email || "")
              .trim()
              .toLowerCase();
            const name = (
              sess.customer_details?.name ||
              (email ? email.split("@")[0] : "Stripe Client")
            ).trim();
            const phone = sess.customer_details?.phone || "";
            const dateStr = new Date(sess.created * 1000).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            );
            const paymentNote = `✓ Verified Stripe Payment: $${amountDollars.toLocaleString()} on ${dateStr} (Ref: ${sess.id})`;

            const matched = (currentRoster || []).find(
              (c) =>
                (email && c.email && c.email.toLowerCase() === email) ||
                (name && c.name && c.name.toLowerCase() === name.toLowerCase())
            );

            if (matched) {
              await supabaseAdmin
                .from("practice_clients")
                .update({
                  monthly_fee:
                    Number(matched.monthly_fee || 0) + amountDollars,
                  status: "active",
                  email: email || matched.email,
                  phone: phone || matched.phone,
                  clinical_notes: matched.clinical_notes
                    ? `${paymentNote} | ${matched.clinical_notes}`
                    : paymentNote,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", matched.id);
            } else {
              await supabaseAdmin.from("practice_clients").insert({
                name,
                email,
                phone,
                retainer_program: "90-Day Quickstart Retainer",
                monthly_fee: amountDollars,
                status: "active",
                start_date: new Date(sess.created * 1000)
                  .toISOString()
                  .slice(0, 10),
                primary_focus: "Metabolic Neuroplasticity™",
                delivery_mode: "virtual",
                clinical_notes: paymentNote,
              });
            }
          }
        }
      } catch (stripeSyncErr) {
        console.error("Admin Stripe live sync warning:", stripeSyncErr);
      }
    }

    // 1. Fetch Assessment Leads
    const { data: leads, error: leadsError } = await supabaseAdmin
      .from("assessment_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadsError) {
      console.error("Admin leads fetch error:", leadsError);
    }

    // 2. Fetch Newsletter Subscribers
    const { data: subscribers, error: subsError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (subsError) {
      console.error("Admin subscribers fetch error:", subsError);
    }

    // 3. Fetch Contact Inquiries
    const { data: inquiries, error: inqError } = await supabaseAdmin
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (inqError) {
      console.error("Admin inquiries fetch error:", inqError);
    }

    // 4. Fetch Real Practice Clients Roster
    const { data: clients, error: clientsError } = await supabaseAdmin
      .from("practice_clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (clientsError) {
      console.error("Admin clients fetch error:", clientsError);
    }

    // 5. Fetch Custom Monthly Ledger Entries
    const { data: earnings, error: earnError } = await supabaseAdmin
      .from("practice_earnings")
      .select("*")
      .order("updated_at", { ascending: false });

    if (earnError) {
      console.error("Admin earnings fetch error:", earnError);
    }

    const safeLeads = leads || [];
    const safeSubscribers = subscribers || [];
    const safeInquiries = inquiries || [];
    const safeClients = clients || [];
    const safeEarnings = earnings || [];

    const statusCounts = {
      new: 0,
      scheduled: 0,
      enrolled: 0,
      archived: 0,
    };

    for (const lead of safeLeads) {
      const status = (lead.status || "new") as keyof typeof statusCounts;
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
    }

    // Real client analytics
    const activeClientsList = safeClients.filter((c) => c.status === "active");
    const activeClientsRevenue = activeClientsList.reduce(
      (acc, c) => acc + (Number(c.monthly_fee) || 0),
      0
    );

    // If manual earnings entry exists for latest month, prioritize or combine with active clients
    const latestManualMonth = safeEarnings.length > 0 ? safeEarnings[0] : null;
    const currentMonthRevenue = activeClientsRevenue > 0
      ? activeClientsRevenue
      : (latestManualMonth ? Number(latestManualMonth.total_revenue) : 0);

    const totalActiveClients = activeClientsList.length > 0
      ? activeClientsList.length
      : (latestManualMonth ? Number(latestManualMonth.active_clients) : 0);

    // Calculate total historical revenue recorded
    const manualRevenueTotal = safeEarnings.reduce((acc, row) => acc + Number(row.total_revenue || 0), 0);
    const totalRecordedRevenue = Math.max(manualRevenueTotal, activeClientsRevenue);

    // Program breakdown
    const programBreakdown: Record<string, { count: number; revenue: number }> = {};
    for (const client of activeClientsList) {
      const prog = client.retainer_program || "Signature Advisory Retainer";
      if (!programBreakdown[prog]) {
        programBreakdown[prog] = { count: 0, revenue: 0 };
      }
      programBreakdown[prog].count += 1;
      programBreakdown[prog].revenue += Number(client.monthly_fee) || 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        leads: safeLeads,
        subscribers: safeSubscribers,
        inquiries: safeInquiries,
        clients: safeClients,
        earnings: safeEarnings,
        metrics: {
          totalLeads: safeLeads.length,
          currentMonthRevenue,
          totalRecordedRevenue,
          totalActiveClients,
          statusCounts,
          totalSubscribers: safeSubscribers.length,
          totalInquiries: safeInquiries.length,
          programBreakdown,
          lastSync: new Date().toISOString(),
        },
      },
    });
  } catch (error: any) {
    console.error("Admin data route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
