/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildQuery } from "@/utils/helper/buildQuery";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | boolean>;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

function buildUrl(url: string, params?: FetchOptions["params"]) {
  if (!params) return url;
  const queries = buildQuery(params);
  return `${url}?${queries}`;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T | null> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const url = buildUrl(`${API_URL}${endpoint}`, options.params);

    const headers = new Headers(options.headers);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let body = options.body;
    if (body) {
      if (body instanceof FormData) {
        headers.delete("Content-Type");
      } else if (
        typeof body === "object" &&
        !(body instanceof Blob) &&
        !(body instanceof ArrayBuffer)
      ) {
        body = JSON.stringify(body);
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
      }
    }

    const requestInit: RequestInit = {
      method: options.method || "GET",
      headers,
      cache: options.cache,
      next: options.next,
      body: options.method === "GET" ? undefined : body,
    };

    console.log("Fetching URL:", url);

    let res = await fetch(url, requestInit);

    if (res.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        redirect("/auth/login");
      }

      const refreshText = await refreshRes.text();
      const data = refreshText ? JSON.parse(refreshText) : {};
      const newAccessToken = data?.accessToken;

      if (newAccessToken) {
        try {
          cookieStore.set("accessToken", newAccessToken, {
            httpOnly: false,
            secure: false,
            path: "/",
          });
        } catch (cookieError) {
          console.warn("cant set cookie");
        }

        const retryHeaders = new Headers(requestInit.headers);
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

        res = await fetch(url, {
          ...requestInit,
          headers: retryHeaders,
        });
      } else {
        redirect("/auth/login");
      }
    }

    if (!res.ok) {
      const text = await res.text();
      console.log("API ERROR:", {
        url,
        status: res.status,
        body: text,
      });

      return null;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error: any) {
    if (
      error?.digest === "NEXT_REDIRECT" ||
      error?.message === "NEXT_REDIRECT"
    ) {
      throw error;
    }

    console.error("Fetch Wrapper Error:", error);
    return null;
  }
}
