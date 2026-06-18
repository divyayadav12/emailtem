import { api } from "@/services/api";
import type { AuthSession } from "@/types";

export const authService = {
  login(email: string, password: string) {
    return api.request<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  logout() {
    return Promise.resolve({ success: true });
  },
};
