import { api } from "@/services/api";
import type { AuthSession } from "@/types";

export const authService = {
  login(email: string, password: string) {
    return api.request<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  register(name: string, email: string, password: string, role: string) {
    return api.request<AuthSession>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });
  },
  logout() {
    return Promise.resolve({ success: true });
  },
};
