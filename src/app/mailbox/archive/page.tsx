"use client";

import { useState } from "react";

const archived = [
  {
    id: "a-1",
    from: "Global Security Council",
    subject: "Security Protocol Update v4.1 — Completed",
    preview: "All nodes have been updated to v4.1. No further action required from your end.",
    archivedAt: "Aug 10",
    tag: { label: "RESOLVED", color: "bg-[#dcfce7] text-[#166534]" },
  },
  {
    id: "a-2",
    from: "Amazon Web Services",
    subject: "Invoice #INV-2024-0812",
    preview: "Your AWS invoice for the billing period July 1 – July 31 is now available for download.",
    archivedAt: "Aug 5",
    tag: { label: "BILLING", color: "bg-[#ede9fe] text-[#5b21b6]" },
  },
  {
    id: "a-3",
    from: "Jane Doe (Finance)",
    subject: "Q2 Budget — Final Approval",
    preview: "Happy to confirm that the Q2 infrastructure budget has been approved. Please proceed with procurement.",
    archivedAt: "Jul 28",
    tag: { label: "APPROVED", color: "bg-[#dbeafe] text-[#1e40af]" },
  },
  {
    id: "a-4",
    from: "System Logs Bot",
    subject: "Monthly Uptime Report — July",
    preview: "Total uptime: 99.97%. Three minor incidents were recorded, all resolved within SLA.",
    archivedAt: "Jul 31",
    tag: null,
  },
];

export default function ArchivePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = archived.filter(
    (a) =>
      a.subject.toLowerCase().includes(search.toLowerCase()) ||
      a.from.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedItem = archived.find((a) => a.id === selected);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#f9fafb]">
      {/* List */}
      <div className="w-[300px] shrink-0 border-r border-[#e2e6ef] bg-white flex flex-col overflow-hidden">
        <div className="border-b border-[#e2e6ef] px-4 py-3">
          <span className="text-sm font-bold text-[#111827]">Archive</span>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#e2e6ef] bg-[#f3f4f6] px-3 py-1.5">
            <svg className="h-3.5 w-3.5 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search archive..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-xs text-[#374151] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[#9ca3af]">No results found.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left border-b border-[#f0f2f5] px-4 py-3 transition ${
                  selected === item.id ? "bg-[#eef2ff]" : "hover:bg-[#f9fafb]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-[#374151]">{item.from}</span>
                  <span className="shrink-0 text-[10px] text-[#9ca3af]">{item.archivedAt}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-[#374151]">{item.subject}</p>
                <p className="mt-0.5 truncate text-xs text-[#9ca3af]">{item.preview}</p>
                {item.tag && (
                  <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${item.tag.color}`}>
                    {item.tag.label}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Viewer */}
      <div className="flex flex-1 flex-col bg-white">
        {selectedItem ? (
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-bold text-[#111827]">{selectedItem.subject}</h1>
              {selectedItem.tag && (
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${selectedItem.tag.color}`}>
                  {selectedItem.tag.label}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-[#9ca3af]">
              From: {selectedItem.from} · Archived {selectedItem.archivedAt}
            </p>
            <p className="mt-5 text-sm leading-7 text-[#374151]">{selectedItem.preview}</p>
            <button className="mt-6 rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#243ea7] hover:bg-[#eef2ff] transition">
              Move to Inbox
            </button>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24">
                <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-3 text-sm text-[#6b7280]">Select an archived email to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
