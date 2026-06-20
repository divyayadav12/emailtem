"use client";

import { useState } from "react";

const initialQuotas = [
  { id: 1, mailbox: "sarah.m@enterprise.com", used: 4.2, limit: 10, unit: "GB" },
  { id: 2, mailbox: "john.p@enterprise.com", used: 8.9, limit: 10, unit: "GB" },
  { id: 3, mailbox: "emily.c@enterprise.com", used: 2.1, limit: 5, unit: "GB" },
  { id: 4, mailbox: "michael.b@enterprise.com", used: 4.8, limit: 5, unit: "GB" },
  { id: 5, mailbox: "new.user@enterprise.com", used: 0.1, limit: 5, unit: "GB" },
];

function pct(used: number, limit: number) {
  return Math.round((used / limit) * 100);
}

function barColor(p: number) {
  if (p >= 90) return "bg-[#dc2626]";
  if (p >= 70) return "bg-[#d97706]";
  return "bg-[#243ea7]";
}

export default function QuotasPage() {
  const [quotas, setQuotas] = useState(initialQuotas);

  function increaseLimit(id: number) {
    setQuotas((prev) =>
      prev.map((q) => (q.id === id ? { ...q, limit: q.limit + 5 } : q)),
    );
  }

  const totalUsed = quotas.reduce((s, q) => s + q.used, 0);
  const totalLimit = quotas.reduce((s, q) => s + q.limit, 0);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#243ea7]">Manager Portal</p>
          <h1 className="mt-1 text-xl font-bold text-[#111827]">Storage Quotas</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Monitor and adjust team mailbox storage allocations.</p>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#e2e6ef] bg-white p-4">
            <p className="text-xs font-semibold text-[#6b7280]">Total Used</p>
            <p className="mt-1 text-xl font-bold text-[#111827]">{totalUsed.toFixed(1)} GB</p>
          </div>
          <div className="rounded-xl border border-[#e2e6ef] bg-white p-4">
            <p className="text-xs font-semibold text-[#6b7280]">Total Allocated</p>
            <p className="mt-1 text-xl font-bold text-[#111827]">{totalLimit} GB</p>
          </div>
          <div className="rounded-xl border border-[#e2e6ef] bg-white p-4">
            <p className="text-xs font-semibold text-[#6b7280]">Accounts at Risk</p>
            <p className="mt-1 text-xl font-bold text-[#dc2626]">
              {quotas.filter((q) => pct(q.used, q.limit) >= 80).length}
            </p>
          </div>
        </div>

        {/* Quota list */}
        <div className="rounded-xl border border-[#e2e6ef] bg-white divide-y divide-[#f0f2f5]">
          {quotas.map((q) => {
            const p = pct(q.used, q.limit);
            return (
              <div key={q.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="truncate text-sm font-semibold text-[#111827]">{q.mailbox}</span>
                      <span className={`text-xs font-bold ${p >= 90 ? "text-[#dc2626]" : p >= 70 ? "text-[#d97706]" : "text-[#374151]"}`}>
                        {q.used.toFixed(1)} / {q.limit} {q.unit} ({p}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e5e7eb]">
                      <div
                        className={`h-2 rounded-full transition-all ${barColor(p)}`}
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => increaseLimit(q.id)}
                    className="shrink-0 rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] transition"
                  >
                    +5 GB
                  </button>
                </div>
                {p >= 80 && (
                  <p className="mt-2 text-xs text-[#dc2626] font-medium">
                    Warning: mailbox is above {p >= 90 ? "90%" : "80%"} capacity.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
