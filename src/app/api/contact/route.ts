import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, notes, domain } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const message = notes ? `[Domain: ${domain || "Unspecified"}] ${notes}` : `Domain interest: ${domain || "Unspecified"}`;

    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name: fullName,
      email,
      phone: phone || null,
      message,
    });

    if (error) {
      console.error("Supabase contact insert error:", error);
    } else {
      console.log("✓ Successfully saved contact inquiry to Supabase:", email);
    }

    return NextResponse.json({ success: true, message: "Inquiry registered successfully" });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
