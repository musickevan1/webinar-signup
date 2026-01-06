import { NextRequest, NextResponse } from "next/server";

const SHEETDB_API_URL = process.env.SHEETDB_API_URL;

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationData = await request.json();

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
