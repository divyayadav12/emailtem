"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I reset my enterprise password?",
    a: "Go to Settings → Security → Change Password. If you're locked out, contact your domain admin or use the MFA recovery flow on the login page.",
  },
  {
    q: "Why is my mailbox showing a quota warning?",
    a: "Your mailbox has reached 80% of its allocated storage. Archive older emails or ask your admin to increase the quota limit under Manager → Quotas.",
  },
  {
    q: "How do I add a new domain to the enterprise?",
    a: "Navigate to Admin → Domains and click 'Add Domain'. You'll need to verify ownership via MX and SPF records before emails can route through.",
  },
  {
    q: "Can I export my emails?",
    a: "Yes. Go to Settings → Data Export and select a date range. A download link will be emailed to your account within a few minutes.",
  },
];

const tickets = [
  { id: "TKT-1042", subject: "MX records not propagating for new sub-domain", status: "Open", updated: "Today" },
  { id: "TKT-0998", subject: "Login page MFA timeout too short", status: "Resolved", updated: "Aug 14" },
  { id: "TKT-0971", subject: "Bulk account import failing on row 47", status: "Closed", updated: "Aug 10" },
];

const statusColors: Record<string, string> = {
  Open: "bg-[#fef3c7] text-[#92400e]",
  Resolved: "bg-[#dcfce7] text-[#166534]",
  Closed: "bg-[#f3f4f6] text-[#6b7280]",
};

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#243ea7]">Help Center</p>
          <h1 className="mt-1 text-2xl font-bold text-[#111827]">Support</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Find answers or open a ticket — our team typically responds within 2 business hours.</p>
        </div>

        {/* FAQ */}
        <div className="rounded-xl border border-[#e2e6ef] bg-white">
          <div className="border-b border-[#e2e6ef] px-5 py-4">
            <h2 className="text-sm font-bold text-[#111827]">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-[#f0f2f5]">
            {faqs.map((faq, i) => (
              <div key={i} className="px-5 py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-semibold text-[#111827]">{faq.q}</span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-[#6b7280] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-sm leading-6 text-[#6b7280]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Open a ticket */}
          <div className="rounded-xl border border-[#e2e6ef] bg-white">
            <div className="border-b border-[#e2e6ef] px-5 py-4">
              <h2 className="text-sm font-bold text-[#111827]">Open a Ticket</h2>
            </div>
            <div className="p-5">
              {submitted ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                    <svg className="h-5 w-5 text-[#16a34a]" fill="none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#111827]">Ticket submitted!</p>
                  <p className="mt-1 text-xs text-[#6b7280]">We&apos;ll follow up to your enterprise email shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ subject: "", message: "" }); }}
                    className="mt-4 text-xs font-semibold text-[#243ea7] hover:underline"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#374151]">Subject</label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="Brief description of the issue"
                      className="w-full rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#374151]">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Describe what happened and what you expected..."
                      rows={5}
                      className="w-full rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#243ea7] py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition"
                  >
                    Submit Ticket
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* My Tickets */}
          <div className="rounded-xl border border-[#e2e6ef] bg-white">
            <div className="border-b border-[#e2e6ef] px-5 py-4">
              <h2 className="text-sm font-bold text-[#111827]">My Tickets</h2>
            </div>
            <div className="divide-y divide-[#f0f2f5]">
              {tickets.map((t) => (
                <div key={t.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#9ca3af]">{t.id}</span>
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${statusColors[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#374151]">{t.subject}</p>
                  <p className="mt-0.5 text-xs text-[#9ca3af]">Updated {t.updated}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex gap-4 text-sm">
          <Link href="/mailbox/inbox" className="font-semibold text-[#243ea7] hover:underline">← Back to Inbox</Link>
          <Link href="/admin/domains" className="font-semibold text-[#243ea7] hover:underline">Admin Console</Link>
        </div>
      </div>
    </div>
  );
}
