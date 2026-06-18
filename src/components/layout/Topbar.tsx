"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type TopbarProps = { onMenuClick?: () => void };

export function Topbar({ onMenuClick }: TopbarProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b border-[#e2e6ef] bg-white px-3 md:px-4">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition md:hidden"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Search */}
      <div className="flex flex-1 items-center gap-2 rounded-full border border-[#e2e6ef] bg-[#f3f4f6] px-3 py-2 md:px-4 md:max-w-md min-w-0">
        <svg className="h-4 w-4 shrink-0 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search…"
          className="flex-1 min-w-0 bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
        />
      </div>

      {/* Right icons */}
      <div className="flex shrink-0 items-center gap-1 ml-auto">
        {/* Bell */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-[#d9dee8] bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2e6ef] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fef2f2]">
                  <svg className="h-4 w-4 text-[#dc2626]" fill="none" viewBox="0 0 24 24">
                    <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">Sign Out</h3>
                  <p className="text-xs text-[#6b7280]">End your current session</p>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6] transition"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              <div className="mb-5 rounded-lg bg-[#fef2f2] px-4 py-3">
                <p className="text-sm font-semibold text-[#b42318]">
                  Are you sure you want to sign out? You will need to log in again to access your mailbox.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex h-11 flex-1 items-center justify-center rounded-lg border border-[#e2e6ef] text-sm font-semibold text-[#374151] hover:bg-[#f3f4f6] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#dc2626] text-sm font-bold text-white shadow-[0_4px_14px_rgba(220,38,38,0.28)] hover:bg-[#b91c1c] transition"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
