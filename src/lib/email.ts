import { Resend } from "resend";

// Helper for lazy client instantiation so build-time static evaluation never fails if API key is not yet set
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return null;
  }
  try {
    return new Resend(apiKey.trim());
  } catch (err) {
    console.error("Failed to initialize Resend client:", err);
    return null;
  }
}

// Resend sender configuration - using a real name signals direct 1-to-1 communication to Gmail algorithms
export const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Vera Shury <vera@libertysciencecoaching.com>";
export const SENDER_FALLBACK = "Liberty Science Coaching <onboarding@resend.dev>";

// Primary notification recipients (Vera Shury / Practice Admin)
// Vera uses a designated Gmail label for vera@libertysciencecoaching.com
export const NOTIFICATION_RECIPIENT =
  process.env.NOTIFICATION_EMAIL || "vera@libertysciencecoaching.com";

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
 * Clean, established executive advisory layout
 * Designed to land in Gmail Primary Inbox (no bulk marketing tags, no zero-height hidden preheaders)
 */
function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Liberty Science Advisory</title>
</head>
<body style="margin: 0; padding: 28px 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; text-align: left; padding: 0 16px;">
          <!-- Top Clean Brand Line -->
          <tr>
            <td style="padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #4b5563;">
                      Liberty Science Coaching
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; color: #9ca3af;">
                      Advisory Dossier
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding-top: 28px;">
              ${content}
            </td>
          </tr>

          <!-- Established Executive Footer -->
          <tr>
            <td style="padding-top: 28px; border-top: 1px solid #e5e7eb; font-size: 11px; line-height: 1.6; color: #9ca3af;">
              <span style="font-weight: 600; color: #6b7280;">Liberty Science Coaching</span> &middot; Vera Shury, MS<br>
              ACE Certified Health Coach #W54776 &middot; Certified PWR!Moves &middot; HeartMath Coach<br>
              Healthcare Taxonomy Code: 71400000X &middot; Tucson, AZ 85737
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Dispatch an email to Vera when someone fills out the contact form
 */
export async function sendContactInquiryNotification(payload: ContactNotificationPayload) {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 20px 0; letter-spacing: -0.01em;">
      New consultation request from ${payload.fullName}
    </h1>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 140px; font-size: 12px; color: #6b7280; font-weight: 500;">
          Client
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">
          ${payload.fullName}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
          Email
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
          <a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a>
        </td>
      </tr>
      ${
        payload.phone
          ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
            Phone
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
            <a href="tel:${payload.phone}" style="color: #111827; text-decoration: none;">${payload.phone}</a>
          </td>
        </tr>
      `
          : ""
      }
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
          Advisory Focus
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #0f766e; font-weight: 600;">
          ${payload.domain || "General Advisory"}
        </td>
      </tr>
    </table>

    ${
      payload.notes
        ? `
      <div style="margin-bottom: 28px;">
        <div style="font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: 8px;">
          Client Inquiry
        </div>
        <div style="border-left: 2px solid #111827; padding: 4px 0 4px 16px; font-size: 14px; line-height: 1.6; color: #374151;">
          ${payload.notes}
        </div>
      </div>
    `
        : ""
    }

    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 36px;">
      <tr>
        <td style="background-color: #111827; border-radius: 6px;">
          <a href="mailto:${payload.email}?subject=Regarding%20Your%20Inquiry%20to%20Liberty%20Science%20Coaching" style="display: inline-block; padding: 11px 22px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: 0.01em;">
            Reply to ${payload.fullName}
          </a>
        </td>
      </tr>
    </table>
  `;

  return sendResendEmail({
    subject: `${payload.fullName} — Consultation Request`,
    replyTo: payload.email,
    html: emailLayout(content),
  });
}

/**
 * Dispatch an email to Vera when someone completes the Metabolic Readiness Assessment
 */
export async function sendAssessmentNotification(payload: AssessmentNotificationPayload) {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 20px 0; letter-spacing: -0.01em;">
      Assessment Completed &middot; ${payload.fullName} (${payload.score}/100)
    </h1>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 140px; font-size: 12px; color: #6b7280; font-weight: 500;">
          Client
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">
          ${payload.fullName}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
          Readiness
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #047857; font-weight: 700;">
          ${payload.score} / 100 &middot; ${payload.tier}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
          Matched Program
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">
          ${payload.recommendedProgram || "Executive Advisory"} &middot; <span style="color: #b8860b;">${payload.investment || "Custom Scope"}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
          Email
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
          <a href="mailto:${payload.email}" style="color: #2563eb; text-decoration: none;">${payload.email}</a>
        </td>
      </tr>
      ${
        payload.phone
          ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
            Phone
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
            <a href="tel:${payload.phone}" style="color: #111827; text-decoration: none;">${payload.phone}</a>
          </td>
        </tr>
      `
          : ""
      }
      ${
        payload.coreGap
          ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
            Identified Gap
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #b91c1c;">
            ${payload.coreGap}
          </td>
        </tr>
      `
          : ""
      }
      ${
        payload.targetOutcome
          ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 12px; color: #6b7280; font-weight: 500;">
            Target Outcome
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #047857;">
            ${payload.targetOutcome}
          </td>
        </tr>
      `
          : ""
      }
    </table>

    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 36px;">
      <tr>
        <td style="background-color: #111827; border-radius: 6px;">
          <a href="mailto:${payload.email}?subject=Your%20Metabolic%20Assessment%20Results%20&middot;%20Liberty%20Science" style="display: inline-block; padding: 11px 22px; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: 0.01em;">
            Review Dossier with ${payload.fullName}
          </a>
        </td>
      </tr>
    </table>
  `;

  return sendResendEmail({
    subject: `${payload.fullName} — Metabolic Assessment (${payload.score}/100)`,
    replyTo: payload.email,
    html: emailLayout(content),
  });
}

/**
 * Robust email delivery with verified domain & fallback handling
 */
async function sendResendEmail(options: { subject: string; html: string; replyTo?: string }) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend email dispatch skipped: RESEND_API_KEY is not configured.");
    return { data: null, error: null };
  }

  const recipients = [NOTIFICATION_RECIPIENT];

  try {
    const res = await resend.emails.send({
      from: SENDER_EMAIL,
      to: recipients,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      headers: {
        "X-Entity-Ref-ID": `lead-${Date.now()}`,
      },
    });

    if (res.error) {
      if (res.error.message.includes("not verified")) {
        console.warn("Resend domain pending DNS verification. Falling back to sandbox sender.");
        const fallbackRes = await resend.emails.send({
          from: SENDER_FALLBACK,
          to: recipients,
          replyTo: options.replyTo,
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
