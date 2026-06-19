export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "manager" | "user";
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSession = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  authenticated: boolean;
};
