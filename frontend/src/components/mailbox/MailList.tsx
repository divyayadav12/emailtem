"use client";

import { useState } from "react";
import type { Message } from "@/types";

const messages: Message[] = [
  {
    id: "msg-1",
    folder: "inbox",
    from: "Global Security Council <security-updates@enterprise.sec>",
    to: "admin@securemail.com",
    subject: "Urgent: Security Protocol Update v4.2",
    body: "The latest enterprise security protocols have been updated to include advanced threat...",
    receivedAt: "09:42 AM",
    read: false,
  },
  {
    id: "msg-2",
    folder: "inbox",
    from: "Amazon Web Services",
    to: "admin@securemail.com",
    subject: "New Login to your Admin Console",
    body: "A new login was detected from a known device in Berlin, Germany. If this was not you...",
    receivedAt: "Yesterday",
    read: true,
  },
  {
    id: "msg-3",
    folder: "inbox",
    from: "Jane Doe (Finance)",
    to: "admin@securemail.com",
    subject: "Quarterly Infrastructure Budget Approval",
    body: "Hi Team, I've reviewed the proposed budget for the Q3 infrastructure expansion...",
    receivedAt: "Yesterday",
    read: true,
  },
  {
    id: "msg-4",
    folder: "inbox",
    from: "System Logs Bot",
    to: "admin@securemail.com",
    subject: "Weekly Performance Digest: North America",
    body: "Uptime remained at 99.98% over the last seven days. Incident response times...",
    receivedAt: "Aug 14",
    read: true,
  },
];

const avatarColors: Record<string, string> = {
  "msg-1": "bg-[#243ea7]",
  "msg-2": "bg-[#2d6a4f]",
  "msg-3": "bg-[#6b21a8]",
  "msg-4": "bg-[#92400e]",
};

const avatarLetters: Record<string, string> = {
  "msg-1": "GS",
  "msg-2": "AWS",
  "msg-3": "JD",
  "msg-4": "SL",
};

const tags: Record<string, { label: string; color: string }[]> = {
  "msg-1": [
    { label: "PRIORITY", color: "bg-[#fef3c7] text-[#92400e]" },
    { label: "INTERNAL", color: "bg-[#ede9fe] text-[#5b21b6]" },
  ],
  "msg-2": [{ label: "SECURITY", color: "bg-[#dcfce7] text-[#166534]" }],
};

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function MailList({ selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col border-r border-[#e2e6ef] bg-white" style={{ minWidth: 0 }}>
      {/* List header */}
      <div className="flex items-center justify-between border-b border-[#e2e6ef] px-4 py-3">
        <span className="text-sm font-bold text-[#111827]">Inbox</span>
        <div className="flex items-center gap-2">
          {/* Filter icon */}
          <button className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          {/* More icon */}
          <button className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="1.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" />
              <circle cx="19" cy="12" r="1.2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message rows */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => {
          const selected = msg.id === selectedId;
          return (
            <button
              key={msg.id}
              onClick={() => onSelect(msg.id)}
              className={`w-full text-left border-b border-[#f0f2f5] px-4 py-3 transition ${
                selected ? "bg-[#eef2ff]" : "hover:bg-[#f9fafb]"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[msg.id]}`}
                >
                  {avatarLetters[msg.id]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${msg.read ? "font-medium text-[#374151]" : "font-bold text-[#111827]"}`}>
                      {msg.from.split(" <")[0].split(" (")[0]}
                    </span>
                    <span className="shrink-0 text-xs text-[#9ca3af]">{msg.receivedAt}</span>
                  </div>
                  <p className={`mt-0.5 truncate text-sm ${msg.read ? "text-[#6b7280]" : "font-semibold text-[#243ea7]"}`}>
                    {msg.subject}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#9ca3af]">{msg.body}</p>
                  {tags[msg.id] && (
                    <div className="mt-1.5 flex gap-1.5">
                      {tags[msg.id].map((t) => (
                        <span key={t.label} className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${t.color}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Unread dot */}
                {!msg.read && (
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#243ea7]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { messages };
