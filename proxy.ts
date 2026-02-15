import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub as string | undefined;
    const username = payload.username as string | undefined;

    if (!userId) {
      throw new Error("Invalid token payload");
    }

    // clone headers only when needed
    const headers = new Headers(req.headers);
    headers.set("x-user-id", userId);
    if (username) headers.set("x-username", username);

    return NextResponse.next({
      request: { headers },
    });
  } catch {
    // invalid / expired token → clear cookie + redirect
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/notes/:path*", "/note/:path*"],
};
