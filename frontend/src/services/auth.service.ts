import { api } from "@/services/api";
import type { AuthSession } from "@/types";

export const authService = {
  login(email: string, password: string) {
    return api.request<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  register(name: string, email: string, password: string, role: string, token?: string | null) {
    return api.request<AuthSession>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
      token: token || undefined,
    });
  },
  logout() {
    return Promise.resolve({ success: true });
  },
};
