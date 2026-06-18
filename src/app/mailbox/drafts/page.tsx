"use client";

import { useState } from "react";

const drafts = [
  {
    id: "d-1",
    to: "finance-team@enterprise.com",
    subject: "Q3 Budget Review — Draft",
    preview: "Hi team, I wanted to share a few thoughts on the proposed Q3 budget before our Thursday meeting...",
    savedAt: "Today, 11:20 AM",
  },
  {
    id: "d-2",
    to: "hr@enterprise.com",
    subject: "Onboarding Schedule for New Hires",
    preview: "Please find below the tentative onboarding schedule for the three new engineers joining next Monday...",
    savedAt: "Yesterday, 3:45 PM",
  },
  {
    id: "d-3",
    to: "",
    subject: "(No subject)",
    preview: "Just a quick reminder about the server maintenance window scheduled for this weekend...",
    savedAt: "Aug 12, 9:00 AM",
  },
];

export default function DraftsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#f9fafb]">
      {/* List */}
      <div className="w-[300px] shrink-0 border-r border-[#e2e6ef] bg-white overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#e2e6ef] px-4 py-3">
          <span className="text-sm font-bold text-[#111827]">Drafts</span>
          <span className="rounded-full bg-[#fef3c7] px-2 py-0.5 text-xs font-bold text-[#92400e]">
            {drafts.length}
          </span>
        </div>
        {drafts.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={`w-full text-left border-b border-[#f0f2f5] px-4 py-3 transition ${
              selected === d.id ? "bg-[#eef2ff]" : "hover:bg-[#f9fafb]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="truncate text-sm font-semibold text-[#111827]">
                {d.subject}
              </span>
            </div>
            {d.to && (
              <p className="mt-0.5 truncate text-xs text-[#6b7280]">To: {d.to}</p>
            )}
            <p className="mt-0.5 truncate text-xs text-[#9ca3af]">{d.preview}</p>
            <p className="mt-1 text-[10px] text-[#d1d5db]">{d.savedAt}</p>
          </button>
        ))}
      </div>

      {/* Editor / preview */}
      <div className="flex flex-1 flex-col">
        {selected ? (
          (() => {
            const draft = drafts.find((d) => d.id === selected)!;
            return (
              <div className="flex flex-1 flex-col bg-white">
                <div className="flex items-center justify-between border-b border-[#e2e6ef] px-5 py-3">
                  <h2 className="text-sm font-bold text-[#111827]">Edit Draft</h2>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] transition">
                      Discard
                    </button>
                    <button className="rounded-lg bg-[#243ea7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1e2f8a] transition">
                      Send
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#f0f2f5] pb-3">
                    <span className="w-14 text-xs font-semibold text-[#6b7280]">To</span>
                    <input
                      className="flex-1 bg-transparent text-sm text-[#111827] outline-none"
                      defaultValue={draft.to}
                      placeholder="recipient@enterprise.com"
                    />
                  </div>
                  <div className="flex items-center gap-3 border-b border-[#f0f2f5] pb-3">
                    <span className="w-14 text-xs font-semibold text-[#6b7280]">Subject</span>
                    <input
                      className="flex-1 bg-transparent text-sm font-semibold text-[#111827] outline-none"
                      defaultValue={draft.subject === "(No subject)" ? "" : draft.subject}
                      placeholder="Subject"
                    />
                  </div>
                  <textarea
                    className="w-full flex-1 resize-none bg-transparent text-sm leading-7 text-[#374151] outline-none"
                    rows={12}
                    defaultValue={draft.preview}
                  />
                </div>
              </div>
            );
          })()
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-3 text-sm text-[#6b7280]">Select a draft to continue editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
