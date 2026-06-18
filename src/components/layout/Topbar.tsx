"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Topbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  return (
    <div className="flex h-14 items-center gap-3 border-b border-[#e2e6ef] bg-white px-4">
      {/* Search */}
      <div className="flex flex-1 items-center gap-2 rounded-full border border-[#e2e6ef] bg-[#f3f4f6] px-4 py-2 max-w-md">
        <svg className="h-4 w-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search emails, domains, or logs..."
          className="flex-1 bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Bell */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
        {/* Settings */}
        <Link href="/mailbox/settings" className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </Link>
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#243ea7] text-xs font-bold text-white">
          EA
        </div>
        {/* Logout */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          title="Logout"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#fee2e2] hover:text-[#dc2626] transition"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-[#111827]">Logout</h3>
            <p className="mt-2 text-sm text-[#6b7280]">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg border border-[#e5e7eb] text-[#374151] font-medium hover:bg-[#f3f4f6] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#dc2626] text-white font-medium hover:bg-[#991b1b] transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
