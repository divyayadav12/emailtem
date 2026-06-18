"use client";

import { useState } from "react";

const sentMessages = [
  {
    id: "s-1",
    to: "finance-team@enterprise.com",
    subject: "Re: Q3 Infrastructure Budget Approval",
    preview: "Thanks for the quick turnaround. I've approved the proposed figures and sent them to procurement.",
    sentAt: "Today, 10:05 AM",
  },
  {
    id: "s-2",
    to: "security@enterprise.sec",
    subject: "Acknowledged: Security Protocol Update v4.2",
    preview: "Confirming receipt. All TLS certificates have been updated on the dev-ops.internal sub-domain.",
    sentAt: "Today, 9:50 AM",
  },
  {
    id: "s-3",
    to: "hr@enterprise.com",
    subject: "Onboarding dates confirmed",
    preview: "Hi Sarah, the three new engineers will start on Monday the 19th. I've arranged building access.",
    sentAt: "Yesterday, 4:30 PM",
  },
  {
    id: "s-4",
    to: "aws-billing@amazon.com",
    subject: "Invoice query — July billing cycle",
    preview: "Could you clarify the $340 charge listed under Reserved Instances? We don't have that tier active.",
    sentAt: "Aug 12",
  },
];

export default function SentPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedItem = sentMessages.find((m) => m.id === selected);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#f9fafb]">
      {/* List */}
      <div className="w-[300px] shrink-0 border-r border-[#e2e6ef] bg-white overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#e2e6ef] px-4 py-3">
          <span className="text-sm font-bold text-[#111827]">Sent</span>
          <span className="text-xs text-[#9ca3af]">{sentMessages.length} messages</span>
        </div>
        {sentMessages.map((msg) => (
          <button
            key={msg.id}
            onClick={() => setSelected(msg.id)}
            className={`w-full text-left border-b border-[#f0f2f5] px-4 py-3 transition ${
              selected === msg.id ? "bg-[#eef2ff]" : "hover:bg-[#f9fafb]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-[#374151]">{msg.subject}</span>
              <span className="shrink-0 text-[10px] text-[#9ca3af]">{msg.sentAt}</span>
            </div>
            <p className="mt-0.5 truncate text-xs text-[#6b7280]">To: {msg.to}</p>
            <p className="mt-0.5 truncate text-xs text-[#9ca3af]">{msg.preview}</p>
          </button>
        ))}
      </div>

      {/* Viewer */}
      <div className="flex flex-1 flex-col bg-white">
        {selectedItem ? (
          <div className="p-6">
            <h1 className="text-lg font-bold text-[#111827]">{selectedItem.subject}</h1>
            <div className="mt-2 flex items-center gap-4 text-xs text-[#9ca3af]">
              <span>To: <span className="text-[#374151] font-medium">{selectedItem.to}</span></span>
              <span>Sent {selectedItem.sentAt}</span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#374151]">{selectedItem.preview}</p>
            <div className="mt-6 flex gap-2">
              <button className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] transition">
                Forward
              </button>
              <button className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-3 text-sm text-[#6b7280]">Select a message to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
