import { NextResponse } from "next/server";
import crypto from "crypto";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 30 * 60 * 1000; // Reset counter after 30 minutes of clean window

interface AttemptRecord {
  count: number;
  firstFailedAt: number;
  lockedUntil: number | null;
}

// Persist rate-limit map across hot-reloads / warm serverless invocations
const globalForAuth = globalThis as unknown as {
  __lsAdminAttemptTracker?: Map<string, AttemptRecord>;
};

const attemptTracker =
  globalForAuth.__lsAdminAttemptTracker || new Map<string, AttemptRecord>();
globalForAuth.__lsAdminAttemptTracker = attemptTracker;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown-ip";
}

function constantTimeCompare(input: string, secret: string): boolean {
  const inputHash = crypto.createHash("sha256").update(input).digest();
  const secretHash = crypto.createHash("sha256").update(secret).digest();
  return crypto.timingSafeEqual(inputHash, secretHash);
}

/**
 * Validates the `x-admin-passcode` header with:
 * - Constant-time SHA-256 verification (prevents timing attacks)
 * - Brute-force rate-limiting (5 failed attempts -> 15-minute IP lockout)
 * Returns `null` if authorized, or a `NextResponse` (401/429) if unauthorized/locked.
 */
export function verifyAdminRequest(request: Request): NextResponse | null {
  const ip = getClientIp(request);
  const now = Date.now();
  const record = attemptTracker.get(ip);

  // 1. Check active lockout
  if (record?.lockedUntil && now < record.lockedUntil) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return NextResponse.json(
      {
        success: false,
        lockedOut: true,
        retryAfterSeconds,
        attemptsRemaining: 0,
        error: `Too many failed attempts. Portal access is temporarily locked for ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  // Clear expired lockout or stale attempt window
  if (
    record &&
    ((record.lockedUntil && now >= record.lockedUntil) ||
      now - record.firstFailedAt > ATTEMPT_WINDOW_MS)
  ) {
    attemptTracker.delete(ip);
  }

  const passcode = (request.headers.get("x-admin-passcode") || "").trim();
  const validPasscode = (process.env.ADMIN_PASSCODE || "LIBERTY2026").trim();

  // 2. Constant-time verification
  if (!passcode || !constantTimeCompare(passcode, validPasscode)) {
    const current = attemptTracker.get(ip) || {
      count: 0,
      firstFailedAt: now,
      lockedUntil: null,
    };

    const nextCount = current.count + 1;

    if (nextCount >= MAX_FAILED_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION_MS;
      attemptTracker.set(ip, {
        count: nextCount,
        firstFailedAt: current.firstFailedAt,
        lockedUntil,
      });
      const retryAfterSeconds = Math.ceil(LOCKOUT_DURATION_MS / 1000);
      return NextResponse.json(
        {
          success: false,
          lockedOut: true,
          retryAfterSeconds,
          attemptsRemaining: 0,
          error:
            "Maximum login attempts exceeded. Access locked for 15 minutes for security.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    attemptTracker.set(ip, {
      count: nextCount,
      firstFailedAt: current.firstFailedAt,
      lockedUntil: null,
    });

    const attemptsRemaining = MAX_FAILED_ATTEMPTS - nextCount;

    return NextResponse.json(
      {
        success: false,
        lockedOut: false,
        attemptsRemaining,
        error: `Invalid access key. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining before 15-minute lockout.`,
      },
      { status: 401 }
    );
  }

  // 3. Successful authentication clears any prior failed attempts for this IP
  attemptTracker.delete(ip);
  return null;
}
