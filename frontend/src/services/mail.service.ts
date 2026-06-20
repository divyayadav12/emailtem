import { api } from "@/services/api";
import type { Message } from "@/types";

export const mailService = {
  list(folder: string) {
    return api.request<Message[]>(`/mail/${folder}`);
  },
  draft(payload: Pick<Message, "to" | "subject" | "body">) {
    return api.request<Message>("/mail/drafts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
