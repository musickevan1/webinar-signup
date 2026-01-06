import { NextRequest, NextResponse } from "next/server";

const SHEETDB_API_URL = process.env.SHEETDB_API_URL;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  recaptchaToken?: string;
}

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn("RECAPTCHA_SECRET_KEY not configured, skipping verification");
    return { success: true };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();
    return { success: data.success, score: data.score };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationData = await request.json();

    // Verify reCAPTCHA token
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
      
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }

      // Score threshold (0.0 - 1.0, higher is more likely human)
      // 0.5 is a reasonable threshold
      if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
        return NextResponse.json(
          { error: "Suspicious activity detected. Please try again." },
          { status: 400 }
        );
      }
    } else if (RECAPTCHA_SECRET_KEY) {
      // If reCAPTCHA is configured but no token provided, reject
      return NextResponse.json(
        { error: "reCAPTCHA verification required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.consent) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!SHEETDB_API_URL) {
      console.error("SHEETDB_API_URL is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send to Sheetdb.io
    const timestamp = new Date().toISOString();
    const response = await fetch(SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            "Time Stamp": timestamp,
            "Name": body.name,
            "Email": body.email,
            "Phone #": body.phone,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sheetdb.io error:", errorText);
      return NextResponse.json(
        { error: "Failed to register. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Registration successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
