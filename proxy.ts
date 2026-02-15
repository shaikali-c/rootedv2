import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub as string;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    const res = NextResponse.next();
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/notes/:path*", "/note/:path*"],
};
