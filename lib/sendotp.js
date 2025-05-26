// lib/sendotp.js
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongoose"; // ✅ use your existing connection file
import Otp from "@/models/Otp";

export async function sendOTP(email) {
  await dbConnect();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  // Upsert OTP using Mongoose
  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
}
