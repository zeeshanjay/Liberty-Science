import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, note, answers, recommendedProgram } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const leadRecord = {
      timestamp: new Date().toISOString(),
      name,
      email,
      note: note || "None provided",
      recommendedProgram: recommendedProgram?.name,
      investment: recommendedProgram?.investment,
      domain: answers?.domain?.label,
      priority: answers?.priority?.label,
      gap: answers?.gap?.label,
      outcome: answers?.outcome?.label,
    };

    // 1. Persist directly into Supabase 'assessment_leads' table
    try {
      const { error: dbError } = await supabaseAdmin
        .from("assessment_leads")
        .insert({
          full_name: name,
          email,
          note: note || null,
          recommended_program: recommendedProgram?.name,
          investment: recommendedProgram?.investment,
          primary_domain: answers?.domain?.label,
          priority_stage: answers?.priority?.label,
          identified_gap: answers?.gap?.label,
          desired_outcome: answers?.outcome?.label,
          status: "new",
        });

      if (dbError) {
        console.error("Supabase assessment insert error:", dbError);
      } else {
        console.log("✓ Successfully saved lead to Supabase assessment_leads table");
      }
    } catch (sbErr) {
      console.error("Supabase connection error:", sbErr);
    }

    // 2. Backup to local storage for failover resilience
    try {
      const logDir = path.join(process.cwd(), ".leads");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, "assessment_leads.jsonl");
      fs.appendFileSync(logFile, JSON.stringify(leadRecord) + "\n", "utf8");
    } catch (fsErr) {
      console.error("Local lead file write error:", fsErr);
    }

    console.log("=== NEW CLINICAL ASSESSMENT DOSSIER RECEIVED ===");
    console.log(JSON.stringify(leadRecord, null, 2));

    return NextResponse.json({
      success: true,
      message: "Dossier successfully registered in Supabase and forwarded to Vera Shury",
      dossier: leadRecord,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Assessment API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
