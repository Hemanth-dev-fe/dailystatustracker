import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  // Delete the cookie by setting it with maxAge 0
  cookieStore.set("loggedInUser", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
