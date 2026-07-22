export async function fetchClient<T>(
  path: string,
  options?: {
    params?: Record<string, string | number | boolean | undefined | null>;
    headers?: HeadersInit;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
  },
): Promise<T> {
  const { params, headers, method = "GET", body } = options || {};

  // Build the full URL with query parameters
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const url = new URL(path, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value.toString());
      }
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${res.status}`,
    );
  }

  return res.json() as Promise<T>;
}
