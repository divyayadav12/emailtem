"use client";

import { createContext, useMemo, useState } from "react";
import type { AuthSession, AuthUser } from "@/types";

type AuthContextValue = AuthSession & {
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      tokens: user
        ? { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" }
        : null,
      authenticated: Boolean(user),
      login: setUser,
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
