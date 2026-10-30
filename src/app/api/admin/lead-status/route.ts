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

    const { id, status, recommended_program } = await request.json();

    if (!id || (!status && !recommended_program)) {
      return NextResponse.json(
        { success: false, error: "Missing candidate ID or update fields." },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, string> = {};

    if (status) {
      const allowedStatuses = ["new", "scheduled", "enrolled", "archived"];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
          },
          { status: 400 }
        );
      }
      updatePayload.status = status;
    }

    if (recommended_program) {
      updatePayload.recommended_program = recommended_program;
    }

    const { error } = await supabaseAdmin
      .from("assessment_leads")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("Failed to update lead:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Candidate record updated.",
    });
  } catch (error: any) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
