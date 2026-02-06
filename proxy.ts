import { NextRequest, NextResponse } from "next/server";
import rateLimit from "next-rate-limit";

const limiter = rateLimit({
  interval: 10 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/v1")) {
    try {
      const headers = await limiter.checkNext(request, 50);
      return NextResponse.next({ headers });
    } catch {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/v1/:path*",
};
