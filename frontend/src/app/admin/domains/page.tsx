"use client";

import { useState, useEffect } from "react";
import { domainService } from "@/services/domain.service";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-[#dcfce7] text-[#166534]",
  VERIFIED: "bg-[#dcfce7] text-[#166534]",
  PENDING: "bg-[#fef3c7] text-[#92400e]",
  INACTIVE: "bg-[#f3f4f6] text-[#6b7280]",
};

const recordColor = (val: string) => {
  if (val === "Verified" || val === "Aligned") return "text-[#16a34a]";
  if (val === "Pending" || val === "Review") return "text-[#d97706]";
  return "text-[#9ca3af]";
};

export default function DomainsPage() {
  const [domains, setDomains] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDomains();
  }, []);

  async function fetchDomains() {
    try {
      setLoading(true);
      const data = await domainService.getDomains();
      setDomains(data || []);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch domains");
    } finally {
      setLoading(false);
    }
  }

  async function addDomain() {
    if (!newDomain.trim()) return;
    try {
      setLoading(true);
      setError("");
      const res = await domainService.addDomain(newDomain.trim());
      if (res.error) {
        setError(res.error);
        return;
      }
      setNewDomain("");
      setShowAdd(false);
      await fetchDomains();
    } catch (err: any) {
      console.error(err);
      setError("Failed to add domain");
    } finally {
      setLoading(false);
    }
  }

  async function verifyDomain(id: number) {
    try {
      setLoading(true);
      setError("");
      await domainService.verifyDomain(id);
      await fetchDomains();
    } catch (err: any) {
      console.error(err);
      setError("Failed to verify domain");
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Add domain inline */}
        {showAdd && (
          <div className="mb-4 flex gap-2 rounded-xl border border-[#e2e6ef] bg-white p-4">
            <input
              autoFocus
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="newdomain.com"
              onKeyDown={(e) => e.key === "Enter" && addDomain()}
              disabled={loading}
              className="flex-1 rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff] disabled:opacity-50"
            />
            <button disabled={loading} onClick={addDomain} className="rounded-lg bg-[#243ea7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition disabled:opacity-50">
              Add
            </button>
            <button disabled={loading} onClick={() => { setShowAdd(false); setError(""); }} className="rounded-lg border border-[#e2e6ef] px-4 py-2 text-sm font-semibold text-[#374151] hover:bg-[#f3f4f6] transition disabled:opacity-50">
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
                <th className="px-4 py-3">Verification Token</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {loading && domains.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#6b7280]">Loading domains...</td>
                </tr>
              ) : domains.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#6b7280]">No domains found.</td>
                </tr>
              ) : (
                domains.map((d) => (
                  <tr key={d.id} className="hover:bg-[#f9fafb] transition">
                    <td className="px-5 py-3 font-semibold text-[#111827]">{d.domain_name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#6b7280] max-w-[200px] truncate" title={d.verification_token}>
                      {d.verification_token}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColors[d.status?.toUpperCase()] || statusColors.PENDING}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {d.status?.toUpperCase() !== "VERIFIED" && d.status?.toUpperCase() !== "ACTIVE" ? (
                        <button
                          disabled={loading}
                          onClick={() => verifyDomain(d.id)}
                          className="text-xs font-semibold text-[#243ea7] hover:underline disabled:opacity-50"
                        >
                          Verify Now
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-[#16a34a]">Verified</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div className="mt-4 rounded-xl border border-[#dbeafe] bg-[#eff6ff] px-4 py-3 text-xs text-[#1e40af]">
          <strong>Tip:</strong> New domains may take up to 48 hours for MX propagation. Verify SPF and DKIM records in your DNS provider after adding a domain. To verify ownership, place the verification token in a TXT record.
        </div>
      </div>
    </div>
  );
}
