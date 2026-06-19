"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Attachment = { name: string; size: number };

export default function ComposePage() {
  const router = useRouter();
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sent, setSent] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function format(cmd: string, value?: string) {
    bodyRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function handleAttach(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setAttachments((prev) => [
      ...prev,
      ...files.map((f) => ({ name: f.name, size: f.size })),
    ]);
    e.target.value = "";
  }

  function removeAttachment(idx: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => router.push("/mailbox/inbox"), 2000);
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (sent) {
    return (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center bg-[#f9fafb]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7]">
            <svg className="h-7 w-7 text-[#16a34a]" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-base font-bold text-[#111827]">Message sent!</p>
          <p className="text-sm text-[#6b7280]">Redirecting to inbox…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-white">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#e2e6ef] px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-[#111827]">New Message</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-[#e2e6ef] px-4 py-1.5 text-sm font-semibold text-[#374151] hover:bg-[#f3f4f6] transition"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center gap-2 rounded-lg bg-[#243ea7] px-5 py-1.5 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Send
          </button>
        </div>
      </div>

      {/* Form area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* To */}
        <div className="flex items-center border-b border-[#f0f2f5] px-6 py-3">
          <span className="w-14 shrink-0 text-sm font-semibold text-[#6b7280]">To</span>
          <input
            required
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipients"
            className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
          <div className="flex items-center gap-3">
            {!showCc && (
              <button type="button" onClick={() => setShowCc(true)}
                className="text-xs font-bold text-[#6b7280] hover:text-[#243ea7] transition">
                Cc
              </button>
            )}
            {!showBcc && (
              <button type="button" onClick={() => setShowBcc(true)}
                className="text-xs font-bold text-[#6b7280] hover:text-[#243ea7] transition">
                Bcc
              </button>
            )}
          </div>
        </div>

        {/* Cc */}
        {showCc && (
          <div className="flex items-center border-b border-[#f0f2f5] px-6 py-3">
            <span className="w-14 shrink-0 text-sm font-semibold text-[#6b7280]">Cc</span>
            <input
              type="email"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="Cc recipients"
              className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
        )}

        {/* Bcc */}
        {showBcc && (
          <div className="flex items-center border-b border-[#f0f2f5] px-6 py-3">
            <span className="w-14 shrink-0 text-sm font-semibold text-[#6b7280]">Bcc</span>
            <input
              type="email"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
              placeholder="Bcc recipients"
              className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
        )}

        {/* Subject */}
        <div className="flex items-center border-b border-[#f0f2f5] px-6 py-3">
          <span className="w-14 shrink-0 text-sm font-semibold text-[#6b7280]">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="flex-1 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </div>

        {/* Body — contenteditable for real formatting */}
        <div
          ref={bodyRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Compose your message…"
          className="
            flex-1 overflow-y-auto px-6 py-4 text-sm leading-7 text-[#374151] outline-none
            empty:before:pointer-events-none empty:before:text-[#9ca3af] empty:before:content-[attr(data-placeholder)]
          "
        />

        {/* Attachments list */}
        {attachments.length > 0 && (
          <div className="border-t border-[#f0f2f5] px-6 py-3">
            <div className="flex flex-wrap gap-2">
              {attachments.map((a, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-[#e2e6ef] bg-[#f9fafb] px-3 py-1.5">
                  <svg className="h-4 w-4 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="max-w-40 truncate text-xs font-semibold text-[#374151]">{a.name}</span>
                  <span className="text-[10px] text-[#9ca3af]">{formatBytes(a.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(i)}
                    className="ml-1 text-[#9ca3af] hover:text-[#dc2626] transition"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formatting toolbar */}
        <div className="flex items-center gap-1 border-t border-[#e2e6ef] bg-[#f9fafb] px-4 py-2">
          {/* Bold */}
          <button type="button" onClick={() => format("bold")} title="Bold (Ctrl+B)"
            className="flex h-8 w-8 items-center justify-center rounded text-[#374151] hover:bg-[#e5e7eb] transition font-bold text-sm">
            B
          </button>
          {/* Italic */}
          <button type="button" onClick={() => format("italic")} title="Italic (Ctrl+I)"
            className="flex h-8 w-8 items-center justify-center rounded text-[#374151] hover:bg-[#e5e7eb] transition italic text-sm">
            I
          </button>
          {/* Underline */}
          <button type="button" onClick={() => format("underline")} title="Underline (Ctrl+U)"
            className="flex h-8 w-8 items-center justify-center rounded text-[#374151] hover:bg-[#e5e7eb] transition underline text-sm">
            U
          </button>

          <div className="mx-1 h-5 w-px bg-[#d1d5db]" />

          {/* Bullet list */}
          <button type="button" onClick={() => format("insertUnorderedList")} title="Bullet list"
            className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#e5e7eb] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          {/* Ordered list */}
          <button type="button" onClick={() => format("insertOrderedList")} title="Numbered list"
            className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#e5e7eb] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M10 6h11M10 12h11M10 18h11M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="mx-1 h-5 w-px bg-[#d1d5db]" />

          {/* Link */}
          <button type="button" title="Insert link"
            onClick={() => {
              const url = window.prompt("Enter URL:");
              if (url) format("createLink", url);
            }}
            className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#e5e7eb] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Attachment */}
          <button type="button" title="Attach file" onClick={() => fileRef.current?.click()}
            className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#e5e7eb] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={handleAttach} />

          {/* Emoji */}
          <button type="button" title="Emoji"
            className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#e5e7eb] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8.5 14s1 2 3.5 2 3.5-2 3.5-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex-1" />

          {/* Send shortcut hint */}
          <span className="text-xs text-[#9ca3af]">Ctrl+Enter to send</span>
        </div>
      </div>
    </div>
  );
}
