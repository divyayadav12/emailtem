"use client";

import { useState } from "react";

const initialDomains = [
  { id: 1, domain: "enterprise.com", mx: "Verified", spf: "Aligned", dkim: "Verified", status: "Active", added: "Jan 12, 2024" },
  { id: 2, domain: "sales.enterprise.com", mx: "Verified", spf: "Aligned", dkim: "Pending", status: "Active", added: "Mar 5, 2024" },
  { id: 3, domain: "dev-ops.internal", mx: "Pending", spf: "Review", dkim: "Not set", status: "Pending", added: "Aug 10, 2024" },
  { id: 4, domain: "legacy.enterprise.com", mx: "Verified", spf: "Aligned", dkim: "Verified", status: "Inactive", added: "Nov 3, 2023" },
];

const statusColors: Record<string, string> = {
  Active: "bg-[#dcfce7] text-[#166534]",
  Pending: "bg-[#fef3c7] text-[#92400e]",
  Inactive: "bg-[#f3f4f6] text-[#6b7280]",
};

const recordColor = (val: string) => {
  if (val === "Verified" || val === "Aligned") return "text-[#16a34a]";
  if (val === "Pending" || val === "Review") return "text-[#d97706]";
  return "text-[#9ca3af]";
};

export default function DomainsPage() {
  const [domains, setDomains] = useState(initialDomains);
  const [showAdd, setShowAdd] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  function addDomain() {
    if (!newDomain.trim()) return;
    setDomains((prev) => [
      ...prev,
      {
        id: Date.now(),
        domain: newDomain.trim(),
        mx: "Pending",
        spf: "Pending",
        dkim: "Not set",
        status: "Pending",
        added: "Today",
      },
    ]);
    setNewDomain("");
    setShowAdd(false);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#243ea7]">Enterprise Admin</p>
            <h1 className="mt-1 text-xl font-bold text-[#111827]">Domains</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Manage domain onboarding, MX records, and SPF/DKIM alignment.</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#243ea7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Domain
          </button>
        </div>

        {/* Add domain inline */}
        {showAdd && (
          <div className="mb-4 flex gap-2 rounded-xl border border-[#e2e6ef] bg-white p-4">
            <input
              autoFocus
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="newdomain.com"
              onKeyDown={(e) => e.key === "Enter" && addDomain()}
              className="flex-1 rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff]"
            />
            <button onClick={addDomain} className="rounded-lg bg-[#243ea7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition">
              Add
            </button>
            <button onClick={() => setShowAdd(false)} className="rounded-lg border border-[#e2e6ef] px-4 py-2 text-sm font-semibold text-[#374151] hover:bg-[#f3f4f6] transition">
              Cancel
            </button>
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-[#e2e6ef] bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e6ef] bg-[#f9fafb] text-left text-xs font-bold text-[#6b7280]">
                <th className="px-5 py-3">Domain</th>
                <th className="px-4 py-3">MX</th>
                <th className="px-4 py-3">SPF</th>
                <th className="px-4 py-3">DKIM</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {domains.map((d) => (
                <tr key={d.id} className="hover:bg-[#f9fafb] transition">
                  <td className="px-5 py-3 font-semibold text-[#111827]">{d.domain}</td>
                  <td className={`px-4 py-3 font-medium ${recordColor(d.mx)}`}>{d.mx}</td>
                  <td className={`px-4 py-3 font-medium ${recordColor(d.spf)}`}>{d.spf}</td>
                  <td className={`px-4 py-3 font-medium ${recordColor(d.dkim)}`}>{d.dkim}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColors[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#9ca3af]">{d.added}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDomains((prev) => prev.filter((x) => x.id !== d.id))}
                      className="text-xs font-semibold text-[#dc2626] hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div className="mt-4 rounded-xl border border-[#dbeafe] bg-[#eff6ff] px-4 py-3 text-xs text-[#1e40af]">
          <strong>Tip:</strong> New domains may take up to 48 hours for MX propagation. Verify SPF and DKIM records in your DNS provider after adding a domain.
        </div>
      </div>
    </div>
  );
}
