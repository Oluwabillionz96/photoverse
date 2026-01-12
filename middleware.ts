// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For now, just log the request path
  console.log("Middleware running for:", request.nextUrl.pathname);

  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("Access token in cookie:", !!accessToken);

  if (!accessToken && request.nextUrl.pathname.startsWith("/folders")) {
    console.log("Redirecting to login - no access token");
    return NextResponse.redirect(new URL("/auth/register", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/folders"],
};
