"use client";

import { createContext, useMemo } from "react";

type SocketContextValue = {
  connected: boolean;
  channel: string;
};

export const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(
    () => ({ connected: false, channel: "mail-events" }),
    [],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
