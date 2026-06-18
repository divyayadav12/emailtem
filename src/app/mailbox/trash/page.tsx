"use client";

import { useState } from "react";

const trashItems = [
  {
    id: "t-1",
    from: "no-reply@newsletter.io",
    subject: "Your weekly digest is here!",
    preview: "This week in enterprise tech: cloud migrations, zero-trust frameworks, and the rise of...",
    deletedAt: "Today, 8:15 AM",
  },
  {
    id: "t-2",
    from: "alerts@monitorbot.internal",
    subject: "Resolved: Disk usage spike on node-03",
    preview: "Alert cleared. Disk usage on node-03 returned to normal levels after log rotation completed.",
    deletedAt: "Yesterday",
  },
  {
    id: "t-3",
    from: "signup@someservice.com",
    subject: "Confirm your email address",
    preview: "Click the link below to confirm your email address and activate your account...",
    deletedAt: "Aug 13",
  },
];

export default function TrashPage() {
  const [items, setItems] = useState(trashItems);
  const [selected, setSelected] = useState<string | null>(null);

  function deleteAll() {
    setItems([]);
    setSelected(null);
  }

  function restore(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelected(null);
  }

  const selectedItem = items.find((i) => i.id === selected);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#f9fafb]">
      {/* List */}
      <div className="w-[300px] shrink-0 border-r border-[#e2e6ef] bg-white overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#e2e6ef] px-4 py-3">
          <span className="text-sm font-bold text-[#111827]">Trash</span>
          {items.length > 0 && (
            <button
              onClick={deleteAll}
              className="text-xs font-semibold text-[#dc2626] hover:underline"
            >
              Empty trash
            </button>
          )}
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <svg className="h-10 w-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-3 text-sm text-[#6b7280]">Trash is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full text-left border-b border-[#f0f2f5] px-4 py-3 transition ${
                selected === item.id ? "bg-[#eef2ff]" : "hover:bg-[#f9fafb]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold text-[#374151]">
                  {item.from.split("@")[0].replace("no-reply", "Newsletter")}
                </span>
                <span className="shrink-0 text-[10px] text-[#9ca3af]">{item.deletedAt}</span>
              </div>
              <p className="mt-0.5 truncate text-xs text-[#6b7280]">{item.subject}</p>
              <p className="mt-0.5 truncate text-xs text-[#9ca3af]">{item.preview}</p>
            </button>
          ))
        )}
      </div>

      {/* Viewer */}
      <div className="flex flex-1 flex-col bg-white">
        {selectedItem ? (
          <>
            <div className="flex items-center justify-between border-b border-[#e2e6ef] px-5 py-3">
              <p className="text-xs text-[#9ca3af]">
                This message will be permanently deleted after 30 days.
              </p>
              <button
                onClick={() => restore(selectedItem.id)}
                className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#243ea7] hover:bg-[#eef2ff] transition"
              >
                Restore to Inbox
              </button>
            </div>
            <div className="p-6">
              <h1 className="text-lg font-bold text-[#111827]">{selectedItem.subject}</h1>
              <p className="mt-1 text-xs text-[#9ca3af]">From: {selectedItem.from}</p>
              <p className="mt-5 text-sm leading-7 text-[#374151]">{selectedItem.preview}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-3 text-sm text-[#6b7280]">Select an item to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
