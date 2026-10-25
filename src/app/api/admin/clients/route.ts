import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const passcode = request.headers.get("x-admin-passcode");
    const validPasscode = process.env.ADMIN_PASSCODE || "LIBERTY2026";

    if (!passcode || passcode !== validPasscode) {
      return NextResponse.json(
        { success: false, error: "Invalid master authorization passcode." },
        { status: 401 }
      );
    }

    const { data: clients, error } = await supabaseAdmin
      .from("practice_clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, clients: clients || [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const {
      id,
      name,
      email,
      phone,
      retainer_program,
      monthly_fee,
      status,
      start_date,
      primary_focus,
      delivery_mode,
      clinical_notes,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    const payload: any = {
      name: name.trim(),
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      retainer_program: retainer_program || "Signature Advisory Retainer",
      monthly_fee: parseFloat(monthly_fee) || 0,
      status: status || "active",
      start_date: start_date || new Date().toISOString().slice(0, 10),
      primary_focus: primary_focus ? primary_focus.trim() : null,
      delivery_mode: delivery_mode || "virtual",
      clinical_notes: clinical_notes ? clinical_notes.trim() : null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (id) {
      // Update existing client
      result = await supabaseAdmin
        .from("practice_clients")
        .update(payload)
        .eq("id", id)
        .select();
    } else {
      // Create new client
      payload.created_at = new Date().toISOString();
      result = await supabaseAdmin
        .from("practice_clients")
        .insert([payload])
        .select();
    }

    if (result.error) {
      console.error("Client mutation error:", result.error);
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: id ? "Client updated successfully." : "New client enrolled successfully.",
      client: result.data?.[0],
    });
  } catch (error: any) {
    console.error("Client API error:", error);
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
      return NextResponse.json({ success: false, error: "Client ID required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("practice_clients")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Client deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
