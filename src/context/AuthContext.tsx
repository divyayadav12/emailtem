"use client";

import { createContext, useMemo, useState, useEffect } from "react";
import type { AuthUser } from "@/types";

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  authenticated: boolean;
  login: (user: AuthUser) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      const savedToken = localStorage.getItem("access_token");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setAccessToken(savedToken);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const loginUser = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const saveToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  const logoutUser = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      authenticated: Boolean(user && accessToken),
      login: loginUser,
      setAccessToken: saveToken,
      logout: logoutUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
