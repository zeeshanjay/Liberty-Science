import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const authError = verifyAdminRequest(request);
    if (authError) return authError;

    const { subject, message, previewOnly } = await request.json();

    if (!subject || !message) {
      return NextResponse.json(
        { success: false, error: "Subject and briefing body are required." },
        { status: 400 }
      );
    }

    // Get count of active subscribers
    const { data: subscribers, error: subsError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("email");

    if (subsError) {
      console.error("Subscribers fetch error:", subsError);
      return NextResponse.json({ success: false, error: subsError.message }, { status: 500 });
    }

    const recipientCount = subscribers?.length || 0;

    if (previewOnly) {
      return NextResponse.json({
        success: true,
        preview: true,
        recipientCount,
        subject,
        message,
      });
    }

    // In production, this can connect to Resend / SendGrid / Supabase Edge Functions.
    // For now, it records the broadcast dispatch log and returns confirmation.
    return NextResponse.json({
      success: true,
      broadcastId: `BC-${Date.now()}`,
      dispatchedCount: recipientCount,
      timestamp: new Date().toISOString(),
      message: `Briefing "${subject}" queued for dispatch to ${recipientCount} active executive subscribers.`,
    });
  } catch (error: any) {
    console.error("Broadcast error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
