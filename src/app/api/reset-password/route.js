import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, otp, newPassword } = await request.json();
  if (!email || !otp || !newPassword) {
    return NextResponse.json({ message: "Email, OTP, and new password are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("ecommerce");

  const normalizedEmail = email.trim().toLowerCase();
  const otpEntry = await db.collection("otps").findOne({ email: normalizedEmail });

  if (!otpEntry || otpEntry.otp !== otp || new Date() > new Date(otpEntry.expiresAt)) {
    return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.collection("users").updateOne({ email: normalizedEmail }, { $set: { password: hashedPassword } });
  await db.collection("otps").deleteOne({ email: normalizedEmail });

  return NextResponse.json({ message: "Password reset successfully" });
}
