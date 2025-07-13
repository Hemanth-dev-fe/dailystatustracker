// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const cookieUser = req.cookies.get("loggedInUser")?.value;
  const urlUserName = pathname.split('/')[2]?.toLowerCase();

  if (pathname.startsWith("/form")) {
    console.log("🔍 [FORM] Cookie:", cookieUser);
    if (!cookieUser || cookieUser !== urlUserName) {
      return NextResponse.redirect(new URL("/UsersPage", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    console.log("🔍 [ADMIN] Cookie:", cookieUser);
    if (!cookieUser || cookieUser !== urlUserName) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/form/:username*', '/admin/:username*'], // ✅ combined in one array
};
