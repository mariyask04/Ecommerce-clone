import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.set("Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly");
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed", error: error.message }, { status: 500 });
  }
}
