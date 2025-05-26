import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, cartItems } = await request.json();

    if (!email || !cartItems) {
      return NextResponse.json({ message: "Email and cartItems required" }, { status: 400 });
    }

    const updatedCartItems = cartItems.map(item => ({
      ...item,
      price: Number(item.price),
      totalPrice: Number(item.price) * item.quantity,
    }));

    const user = await User.findOneAndUpdate(
      { email },
      { cartItems: updatedCartItems },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ message: "Cart saved successfully", cartItems: user.cartItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
