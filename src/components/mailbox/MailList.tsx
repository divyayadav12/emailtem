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
  {
    id: "msg-2",
    folder: "inbox",
    from: "billing@enterprise.test",
    to: "admin@enterprise.test",
    subject: "Quota usage alert",
    body: "The operations mailbox is nearing its configured storage limit.",
    receivedAt: "Yesterday",
    read: true,
  },
];

export function MailList() {
  return (
    <div className="grid gap-3">
      {messages.map((message) => (
        <article
          key={message.id}
          className="rounded-xl border border-[#dfe3ea] bg-white p-4 transition hover:border-[#0b57d0]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-[#1f1f1f]">{message.subject}</h2>
              <p className="mt-1 text-xs text-[#5f6368]">
                {message.from} to {message.to}
              </p>
            </div>
            <span className="text-xs font-medium text-[#5f6368]">
              {message.receivedAt}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#3c4043]">{message.body}</p>
        </article>
      ))}
    </div>
  );
}
