"use client";

import { useState } from "react";

const allLogs = [
  { id: 1, time: "09:42 AM", level: "INFO", category: "Auth", message: "Admin login from 192.168.1.101 — browser: Chrome 126, OS: Windows 11" },
  { id: 2, time: "09:38 AM", level: "WARN", category: "Domain", message: "dev-ops.internal MX record not propagated after 24 hours — retry scheduled" },
  { id: 3, time: "09:21 AM", level: "INFO", category: "Mail", message: "Outbound email delivered: admin@securemail.com → finance-team@enterprise.com" },
  { id: 4, time: "08:55 AM", level: "INFO", category: "Auth", message: "MFA verified for account admin@securemail.com using TOTP" },
  { id: 5, time: "08:30 AM", level: "ERROR", category: "Mail", message: "SMTP relay rejected message to legacy@partner.org — TLS handshake timeout" },
  { id: 6, time: "Yesterday", level: "INFO", category: "Domain", message: "Domain enterprise.com DKIM record validated successfully" },
  { id: 7, time: "Yesterday", level: "WARN", category: "Quota", message: "Mailbox ops@enterprise.com at 91% storage capacity — warning threshold exceeded" },
  { id: 8, time: "Yesterday", level: "INFO", category: "Auth", message: "New login session created for admin@securemail.com from Berlin, Germany" },
  { id: 9, time: "Aug 14", level: "INFO", category: "System", message: "Scheduled log rotation completed — 2.3 GB freed on node-03" },
  { id: 10, time: "Aug 14", level: "ERROR", category: "System", message: "Disk usage spike on node-03 detected — 97% utilization before rotation" },
];

const levelStyles: Record<string, string> = {
  INFO: "bg-[#dbeafe] text-[#1e40af]",
  WARN: "bg-[#fef3c7] text-[#92400e]",
  ERROR: "bg-[#fee2e2] text-[#dc2626]",
};

export default function LogsPage() {
  const [filter, setFilter] = useState<"ALL" | "INFO" | "WARN" | "ERROR">("ALL");
  const [search, setSearch] = useState("");

  const logs = allLogs.filter((l) => {
    const matchesLevel = filter === "ALL" || l.level === filter;
    const matchesSearch =
      l.message.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#243ea7]">Enterprise Admin</p>
          <h1 className="mt-1 text-xl font-bold text-[#111827]">System Logs</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Real-time audit trail for auth, mail delivery, domain events, and system activity.</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          {/* Level filter */}
          <div className="flex gap-1 rounded-lg border border-[#e2e6ef] bg-white p-1">
            {(["ALL", "INFO", "WARN", "ERROR"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  filter === lvl ? "bg-[#243ea7] text-white" : "text-[#6b7280] hover:text-[#111827]"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="flex items-center gap-2 rounded-lg border border-[#e2e6ef] bg-white px-3 py-2 flex-1 max-w-sm">
            <svg className="h-3.5 w-3.5 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs..."
              className="flex-1 bg-transparent text-xs text-[#374151] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
          <span className="text-xs text-[#9ca3af]">{logs.length} entries</span>
        </div>

        {/* Log table */}
        <div className="rounded-xl border border-[#e2e6ef] bg-white overflow-hidden">
          {logs.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-[#9ca3af]">No logs match your filter.</p>
          ) : (
            <div className="divide-y divide-[#f0f2f5]">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 px-5 py-3 hover:bg-[#f9fafb] transition">
                  <span className="mt-0.5 w-16 shrink-0 text-xs text-[#9ca3af]">{log.time}</span>
                  <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${levelStyles[log.level]}`}>
                    {log.level}
                  </span>
                  <span className="mt-0.5 w-14 shrink-0 text-xs font-semibold text-[#6b7280]">{log.category}</span>
                  <span className="text-sm text-[#374151]">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
