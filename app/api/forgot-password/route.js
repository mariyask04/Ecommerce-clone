// src/app/api/forgot-password/route.js
import clientPromise from "@/lib/mongodb";
import { sendOTP } from "@/lib/sendotp";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ecommerce");

    const user = await db.collection("users").findOne({ email: normalizedEmail });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    await sendOTP(normalizedEmail, db);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Forgot Password OTP error:", error);
    return NextResponse.json({ message: "Failed to send OTP", error: error.message }, { status: 500 });
  }
}
