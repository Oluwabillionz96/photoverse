// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/folders", "/photos", "/favourites", "/trash"];

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (accessToken && (pathname.startsWith("/auth") || pathname === "/")) {
    return NextResponse.redirect(new URL("/folders", request.url));
  }

  return NextResponse.next();
}
