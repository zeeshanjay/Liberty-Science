import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, fullName, source, downloadedResource } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const payload: Record<string, any> = {
      email: email.trim(),
      source: source || "website",
      status: "active",
    };

    if (fullName && fullName.trim()) {
      payload.full_name = fullName.trim();
    }

    if (downloadedResource && downloadedResource.trim()) {
      payload.downloaded_resource = downloadedResource.trim();
    }

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(payload, { onConflict: "email" });

    if (error) {
      console.error("Supabase newsletter insert error:", error);
    } else {
      console.log("✓ Successfully saved subscriber/PDF lead to Supabase:", email, downloadedResource || "");
    }

    return NextResponse.json({ success: true, message: "Registered successfully" });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
