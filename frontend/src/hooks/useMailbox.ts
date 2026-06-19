"use client";

import type { Message } from "@/types";

const messages: Message[] = [
  {
    id: "msg-1",
    folder: "inbox",
    from: "security@enterprise.test",
    to: "admin@enterprise.test",
    subject: "MX validation completed",
    body: "Domain mail exchange validation completed successfully.",
    receivedAt: "Today 10:24",
    read: false,
  },
];

export function useMailbox() {
  return {
    folders: ["inbox", "sent", "compose", "settings"],
    messages,
    refreshThreads: () => messages,
  };
}
