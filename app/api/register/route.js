// src/app/api/register/route.js
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    cartItems: [],
  });

  await user.save();

  return NextResponse.json({ message: "User registered successfully" });
}
