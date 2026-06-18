export type Folder = "inbox" | "sent" | "compose" | "settings";

export type Message = {
  id: string;
  folder: Folder;
  from: string;
  to: string;
  subject: string;
  body: string;
  receivedAt: string;
  read: boolean;
};
