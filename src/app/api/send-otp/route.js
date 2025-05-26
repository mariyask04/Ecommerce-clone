import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/sendotp";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await sendOTP(email);
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP API error:", error);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}
