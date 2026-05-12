import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const protectedRoutes = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  // if is not protected continue
  if (!isProtectedRoute) {
    return intlMiddleware(request);
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  // continue if have accessToken
  if (accessToken) {
    return intlMiddleware(request);
  }
  // get new accessToken
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();

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
      console.error("Refresh token failed:", error);
    }
  }

  const response = NextResponse.redirect(new URL("/auth/login", request.url));

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
