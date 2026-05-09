/* eslint-disable @typescript-eslint/no-explicit-any */
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

const API_URL = process.env.NEXT_APP_BASE_URL;

function buildUrl(url: string, params?: FetchOptions["params"]) {
  if (!params) return url;

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    search.set(key, String(value));
  });

  return `${url}?${search.toString()}`;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const url = buildUrl(`${API_URL}${endpoint}`, options.params);

  const requestInit: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    cache: options.cache,
    next: options.next,
  };

  if (options.body) {
    requestInit.body = JSON.stringify(options.body);
  }

  let res = await fetch(url, requestInit);

  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      redirect("/auth/login");
    }

    const data = await refreshRes.json();
    const newAccessToken = data.accessToken;

    res = await fetch(url, {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
