import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
export const resend = new Resend(resendApiKey);

// Resend sender configuration
// Uses the verified domain if configured; falls back safely to onboarding@resend.dev during testing
export const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Liberty Science Coaching <advisory@libertysciencecoaching.com>";
export const SENDER_FALLBACK = "Liberty Science Coaching <onboarding@resend.dev>";

// Primary notification recipients (Vera Shury + Admin)
export const NOTIFICATION_RECIPIENT =
  process.env.NOTIFICATION_EMAIL || "vera@libertyscience.com";

export interface ContactNotificationPayload {
  fullName: string;
  email: string;
  phone?: string | null;
  domain?: string | null;
  notes?: string | null;
}

export interface AssessmentNotificationPayload {
  fullName: string;
  email: string;
  phone?: string | null;
  score: number;
  tier: string;
  recommendedProgram?: string | null;
  investment?: string | null;
  primaryDomain?: string | null;
  urgencyPriority?: string | null;
  coreGap?: string | null;
  targetOutcome?: string | null;
}

/**
 * High-end, minimal editorial HTML email styling
 */
function emailLayout(content: string, preheader: string = ""): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liberty Science Advisory</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.55;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 40px 16px;
      box-sizing: border-box;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    }
    .header {
      padding: 32px 36px 24px;
      border-bottom: 1px solid #f1f5f9;
      background-color: #ffffff;
    }
    .brand-eyebrow {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #b8860b;
      margin: 0 0 6px 0;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .body-content {
      padding: 32px 36px;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .value {
      font-size: 14px;
      color: #0f172a;
      font-weight: 500;
      margin-bottom: 18px;
    }
    .card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 20px 0;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border-radius: 9999px;
      background-color: #e0f2fe;
      color: #0369a1;
      margin-bottom: 12px;
    }
    .btn {
      display: inline-block;
      background-color: #0f172a;
      color: #ffffff !important;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-decoration: none;
      padding: 12px 22px;
      border-radius: 6px;
      margin-top: 12px;
    }
    .footer {
      padding: 24px 36px;
      background-color: #f8fafc;
      border-top: 1px solid #f1f5f9;
      font-size: 11px;
      color: #94a3b8;
      text-align: left;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0px; overflow: hidden;">${preheader}</div>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="brand-eyebrow">Practice Alert &middot; Direct Dispatch</div>
        <div class="brand-title">Liberty Science Coaching</div>
      </div>
      <div class="body-content">
        ${content}
      </div>
      <div class="footer">
        <strong>Liberty Science Coaching</strong> &middot; Vera Shury, MS<br>
        ACE Health Coach #W54776 &middot; PWR!Moves Certified &middot; HeartMath Coach<br>
        Healthcare Taxonomy Code: <code>71400000X</code> &middot; Tucson, AZ 85737
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Dispatch an email to Vera when someone fills out the contact form
 */
export async function sendContactInquiryNotification(payload: ContactNotificationPayload) {
  const content = `
    <span class="badge">New Contact Inquiry</span>
    <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; color: #0f172a;">
      New consultation request from ${payload.fullName}
    </h2>

    <div class="card">
      <div class="label">Client Name</div>
      <div class="value">${payload.fullName}</div>

      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a></div>

      ${
        payload.phone
          ? `
          <div class="label">Phone</div>
          <div class="value"><a href="tel:${payload.phone}" style="color: #0f172a; text-decoration: none;">${payload.phone}</a></div>
        `
          : ""
      }

      <div class="label">Primary Domain Interest</div>
      <div class="value">${payload.domain || "General Consultation"}</div>

      ${
        payload.notes
          ? `
          <div class="label">Client Notes & Inquiries</div>
          <div class="value" style="font-weight: 400; color: #334155; white-space: pre-line;">${payload.notes}</div>
        `
          : ""
      }
    </div>

    <a href="mailto:${payload.email}?subject=Regarding%20Your%20Inquiry%20to%20Liberty%20Science%20Coaching" class="btn">
      Reply to ${payload.fullName}
    </a>
  `;

  const html = emailLayout(
    content,
    `New consultation inquiry from ${payload.fullName} (${payload.domain || "General Consultation"})`
  );

  return sendResendEmail({
    subject: `New Client Inquiry: ${payload.fullName} · ${payload.domain || "Consultation"}`,
    html,
  });
}

/**
 * Dispatch an email to Vera when someone completes the Metabolic Readiness Assessment
 */
export async function sendAssessmentNotification(payload: AssessmentNotificationPayload) {
  const content = `
    <span class="badge" style="background-color: #ecfdf5; color: #047857;">New Assessment Completed</span>
    <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; color: #0f172a;">
      ${payload.fullName} has submitted a Metabolic Assessment
    </h2>

    <div class="card">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <div class="label">Readiness Score</div>
          <div style="font-size: 24px; font-weight: 800; color: #0f172a;">${payload.score}<span style="font-size: 13px; color: #64748b; font-weight: normal;"> / 100</span></div>
        </div>
        <div style="text-align: right;">
          <div class="label">Readiness Tier</div>
          <div style="font-size: 14px; font-weight: 700; color: #047857;">${payload.tier}</div>
        </div>
      </div>

      <div class="label">Client Name</div>
      <div class="value">${payload.fullName}</div>

      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a></div>

      ${
        payload.phone
          ? `
          <div class="label">Phone</div>
          <div class="value"><a href="tel:${payload.phone}" style="color: #0f172a; text-decoration: none;">${payload.phone}</a></div>
        `
          : ""
      }

      <div class="label">Matched Advisory Tier</div>
      <div class="value" style="font-weight: 700; color: #0f172a;">${payload.recommendedProgram || "Executive Advisory"} &middot; <span style="color: #b8860b;">${payload.investment || "Custom Scope"}</span></div>

      <div class="label">Primary Domain / Focus Area</div>
      <div class="value">${payload.primaryDomain || "Metabolic Neuroplasticity"}</div>

      ${
        payload.coreGap
          ? `
          <div class="label">Identified Operational Gap</div>
          <div class="value" style="font-weight: 400; color: #dc2626;">${payload.coreGap}</div>
        `
          : ""
      }

      ${
        payload.targetOutcome
          ? `
          <div class="label">Desired Target Outcome</div>
          <div class="value" style="font-weight: 400; color: #047857;">${payload.targetOutcome}</div>
        `
          : ""
      }
    </div>

    <a href="mailto:${payload.email}?subject=Your%20Metabolic%20Neuroplasticity%20Assessment%20Results" class="btn">
      Review with ${payload.fullName}
    </a>
  `;

  const html = emailLayout(
    content,
    `New Assessment from ${payload.fullName} (Score: ${payload.score}/100 · Tier: ${payload.tier})`
  );

  return sendResendEmail({
    subject: `Assessment Lead: ${payload.fullName} (Score: ${payload.score}/100 · ${payload.recommendedProgram || payload.tier})`,
    html,
  });
}

/**
 * Robust email delivery with automatic fallback handling
 */
async function sendResendEmail(options: { subject: string; html: string }) {
  const recipients = [NOTIFICATION_RECIPIENT];

  // Try verified domain first
  try {
    const res = await resend.emails.send({
      from: SENDER_EMAIL,
      to: recipients,
      subject: options.subject,
      html: options.html,
    });

    if (res.error) {
      // If domain not verified yet, fallback to onboarding@resend.dev safely
      if (res.error.message.includes("not verified")) {
        console.warn("Resend domain libertysciencecoaching.com pending DNS verification. Falling back to sandbox sender.");
        const fallbackRes = await resend.emails.send({
          from: SENDER_FALLBACK,
          to: recipients,
          subject: options.subject,
          html: options.html,
        });
        return fallbackRes;
      }
      console.error("Resend error:", res.error);
      return res;
    }

    return res;
  } catch (err) {
    console.error("Resend unexpected failure:", err);
    return { data: null, error: err };
  }
}
