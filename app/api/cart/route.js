//src/app/api/cart/route.js:
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ cartItems: [] });
    }

    return NextResponse.json({ cartItems: user.cartItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { email, cartItems: rawItems } = await request.json();

    if (!email || !Array.isArray(rawItems)) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    const cartItems = rawItems.map(item => {
      const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
      const quantity = item.quantity || 1;
      const totalPrice = price * quantity;

      return {
        name: item.name,
        price,
        quantity,
        totalPrice
      };
    });

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, cartItems });
    } else {
      user.cartItems = cartItems;
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart API POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
