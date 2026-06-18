"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ComposePage() {
  const router = useRouter();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => router.push("/mailbox/inbox"), 1800);
  }

  if (sent) {
    return (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dcfce7]">
            <svg className="h-6 w-6 text-[#16a34a]" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-semibold text-[#111827]">Message sent!</p>
          <p className="mt-1 text-xs text-[#6b7280]">Redirecting to inbox...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-[#f9fafb]">
      <div className="flex items-center justify-between border-b border-[#e2e6ef] bg-white px-5 py-3">
        <h1 className="text-sm font-bold text-[#111827]">New Message</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] transition"
          >
            Discard
          </button>
          <button
            form="compose-form"
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-[#243ea7] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1e2f8a] transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Send
          </button>
        </div>
      </div>

      <form id="compose-form" onSubmit={handleSend} className="flex flex-1 flex-col bg-white mx-auto w-full max-w-3xl border-x border-[#e2e6ef]">
        {/* To */}
        <div className="flex items-center gap-3 border-b border-[#f0f2f5] px-5 py-3">
          <span className="w-12 text-xs font-semibold text-[#6b7280]">To</span>
          <input
            required
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@enterprise.com"
            className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </div>
        {/* CC */}
        <div className="flex items-center gap-3 border-b border-[#f0f2f5] px-5 py-3">
          <span className="w-12 text-xs font-semibold text-[#6b7280]">Cc</span>
          <input
            type="email"
            placeholder="cc@enterprise.com"
            className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </div>
        {/* Subject */}
        <div className="flex items-center gap-3 border-b border-[#f0f2f5] px-5 py-3">
          <span className="w-12 text-xs font-semibold text-[#6b7280]">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="flex-1 bg-transparent text-sm font-semibold text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </div>
        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message here..."
          className="flex-1 resize-none px-5 py-4 text-sm leading-7 text-[#374151] outline-none placeholder:text-[#9ca3af]"
        />
        {/* AI hint */}
        <div className="border-t border-[#f0f2f5] bg-[#f9fafb] px-5 py-3">
          <p className="text-xs text-[#9ca3af]">
            AI writing assistance available — tone adjust, rewrite, and summary tools coming soon.
          </p>
        </div>
      </form>
    </div>
  );
}
