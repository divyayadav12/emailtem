const DOMAIN_API_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_API_BASE_URL ?? "http://127.0.0.1:8001";

import { api } from "./api";

// We'll use the existing api utility but override the base URL for domain requests
async function domainRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${DOMAIN_API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Domain API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const domainService = {
  getDomains() {
    return domainRequest<any[]>("/domains/");
  },

  addDomain(domainName: string) {
    return domainRequest<any>("/domains/", {
      method: "POST",
      body: JSON.stringify({ domain_name: domainName }),
    });
  },

  verifyDomain(domainId: number) {
    return domainRequest<any>(`/domains/${domainId}/verify`, {
      method: "POST",
    });
  },

  getDomainStatus(domainId: number) {
    return domainRequest<any>(`/domains/${domainId}/status`);
  },
};
