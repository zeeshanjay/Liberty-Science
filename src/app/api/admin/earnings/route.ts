import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const passcode = request.headers.get("x-admin-passcode");
    const validPasscode = process.env.ADMIN_PASSCODE || "LIBERTY2026";

    if (!passcode || passcode !== validPasscode) {
      return NextResponse.json(
        { success: false, error: "Invalid master authorization passcode." },
        { status: 401 }
      );
    }

    const { monthYear, totalRevenue, activeClients, newClients, notes } = await request.json();

    if (!monthYear) {
      return NextResponse.json(
        { success: false, error: "Month and Year is required (e.g. October 2026)." },
        { status: 400 }
      );
    }

    const payload = {
      month_year: monthYear.trim(),
      total_revenue: parseFloat(totalRevenue) || 0,
      active_clients: parseInt(activeClients) || 0,
      new_clients: parseInt(newClients) || 0,
      notes: notes?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("practice_earnings")
      .upsert(payload, { onConflict: "month_year" })
      .select();

    if (error) {
      console.error("Failed to save client flow:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Monthly client flow for ${monthYear} saved successfully.`,
      entry: data?.[0],
    });
  } catch (error: any) {
    console.error("Save client flow route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const passcode = request.headers.get("x-admin-passcode");
    const validPasscode = process.env.ADMIN_PASSCODE || "LIBERTY2026";

    if (!passcode || passcode !== validPasscode) {
      return NextResponse.json(
        { success: false, error: "Invalid master authorization passcode." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("practice_earnings")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Entry deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
