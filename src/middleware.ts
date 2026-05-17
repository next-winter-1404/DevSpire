import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/fast-reserve/[id]/:path"];

  const pathnameWithoutLocale = pathname.replace(/^\/(fa|en)/, "") || "/";

  const isProtectedRoute = protectedPaths.some(
    (path) =>
      pathnameWithoutLocale === path ||
      pathnameWithoutLocale.startsWith(`${path}/`),
  );

  if (!isProtectedRoute) {
    return intlMiddleware(request);
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken) {
    return intlMiddleware(request);
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();

        request.cookies.set("accessToken", data.accessToken);

        const response = intlMiddleware(request);

        response.cookies.set({
          name: "accessToken",
          value: data.accessToken,
          httpOnly: false,
          secure: false,
          path: "/",
        });
        return response;
      }
    } catch (error) {
      console.log("Refresh token failed:", error);
    }
  }

  const loginUrl = new URL(
    pathname.startsWith("/en") ? "/en/auth/login" : "/fa/auth/login",
    request.url,
  );
  const response = NextResponse.redirect(loginUrl);

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
