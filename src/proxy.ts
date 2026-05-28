import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isTokenExpired } from "./utils/helper/IsTokenExpired";

const intlMiddleware = createMiddleware(routing);
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameWithoutLocale = pathname.replace(/^\/(fa|en)/, "") || "/";

  const isProtectedRoute =
    pathnameWithoutLocale === "/dashboard" ||
    pathnameWithoutLocale.startsWith("/dashboard/") ||
    pathnameWithoutLocale.startsWith("/fast-reserve/");

  let accessToken = request.cookies.get("accessToken")?.value as string;
  const refreshToken = request.cookies.get("refreshToken")?.value as string;
  let newAccessToken = null;
  const isNeedRefresh =
    refreshToken && (!accessToken || isTokenExpired(accessToken));

  if (isNeedRefresh) {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        accessToken = data.accessToken;
        newAccessToken = data.accessToken;
      }
    } catch (error) {
      console.log("Refresh token failed:", error);
    }
  }

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(
      pathname.startsWith("/en") ? "/en/auth/login" : "/fa/auth/login",
      request.url,
    );
    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  }

  const response = intlMiddleware(request);

  if (newAccessToken) {
    response.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: false,
      secure: false,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
