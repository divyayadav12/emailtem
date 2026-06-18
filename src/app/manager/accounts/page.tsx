"use client";

import { useState } from "react";

const initialAccounts = [
  { id: 1, name: "Enterprise Admin", email: "admin@securemail.com", role: "Super Admin", status: "Active", created: "Jan 1, 2024" },
  { id: 2, name: "Sarah Mitchell", email: "sarah.m@enterprise.com", role: "Manager", status: "Active", created: "Mar 14, 2024" },
  { id: 3, name: "Dev Ops Bot", email: "ops@enterprise.com", role: "Service Account", status: "Active", created: "May 22, 2024" },
  { id: 4, name: "John Patel", email: "j.patel@enterprise.com", role: "User", status: "Suspended", created: "Jul 8, 2024" },
  { id: 5, name: "New User", email: "new.user@enterprise.com", role: "User", status: "Pending", created: "Aug 18, 2024" },
];

const statusColors: Record<string, string> = {
  Active: "bg-[#dcfce7] text-[#166534]",
  Suspended: "bg-[#fee2e2] text-[#dc2626]",
  Pending: "bg-[#fef3c7] text-[#92400e]",
};

const roleColors: Record<string, string> = {
  "Super Admin": "bg-[#ede9fe] text-[#5b21b6]",
  Manager: "bg-[#dbeafe] text-[#1e40af]",
  "Service Account": "bg-[#f0fdf4] text-[#166534]",
  User: "bg-[#f3f4f6] text-[#374151]",
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [search, setSearch] = useState("");

  const filtered = accounts.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleStatus(id: number) {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" }
          : a,
      ),
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#243ea7]">Enterprise Admin</p>
            <h1 className="mt-1 text-xl font-bold text-[#111827]">Accounts</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Manage mailbox accounts, roles, and access status.</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#243ea7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Create Account
          </button>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#e2e6ef] bg-white px-3 py-2 max-w-sm">
          <svg className="h-3.5 w-3.5 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            className="flex-1 bg-transparent text-xs text-[#374151] outline-none placeholder:text-[#9ca3af]"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[#e2e6ef] bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e6ef] bg-[#f9fafb] text-left text-xs font-bold text-[#6b7280]">
                <th className="px-5 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {filtered.map((acc) => (
                <tr key={acc.id} className="hover:bg-[#f9fafb] transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#243ea7] text-[10px] font-bold text-white">
                        {acc.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-semibold text-[#111827]">{acc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6b7280]">{acc.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${roleColors[acc.role]}`}>
                      {acc.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColors[acc.status]}`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#9ca3af]">{acc.created}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(acc.id)}
                      className="text-xs font-semibold text-[#243ea7] hover:underline"
                    >
                      {acc.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
