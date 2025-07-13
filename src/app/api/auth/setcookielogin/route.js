import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ message: "username is required." }, { status: 400 });
    }

    const cookieStore = cookies(); // ✅ no await here
    cookieStore.set("loggedInUser", username, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: "Cookie set successfully." }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: err.message || "Invalid credentials" }, { status: 500 });
  }
}
