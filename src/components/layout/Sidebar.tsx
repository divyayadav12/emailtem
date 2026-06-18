"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mailboxNav = [
  {
    label: "Inbox",
    href: "/mailbox/inbox",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M4 6h16M4 12h16M4 18h7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    badge: 2,
  },
  {
    label: "Sent",
    href: "/mailbox/sent",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Drafts",
    href: "/mailbox/drafts",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Trash",
    href: "/mailbox/trash",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const adminNav = [
  {
    label: "Domains",
    href: "/admin/domains",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M3 12h18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Accounts",
    href: "/manager/accounts",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "System Logs",
    href: "/admin/logs",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const bottomNav = [
  { label: "Support", href: "/support" },
  { label: "Archive", href: "/mailbox/archive" },
];

type SidebarProps = { mode?: "mailbox" | "admin" };

export function Sidebar({ mode = "mailbox" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-[220px] shrink-0 flex-col border-r border-[#e2e6ef] bg-white md:flex"
      style={{ minHeight: "100vh" }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-[#243ea7]">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <path
              d="M4 7.5h16v10H4v-10z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 8l7.5 5 7.5-5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-sm font-bold text-[#1d348f]">
          SecureMail Enterprise
        </span>
      </div>

      {/* Compose button */}
      <div className="px-4 pb-4">
        <Link
          href="/mailbox/compose"
          className="flex items-center justify-center gap-2 rounded-full bg-[#243ea7] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#243ea7]/30 hover:bg-[#1e2f8a] transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Compose
        </Link>
      </div>

      {/* MAILBOX section */}
      <div className="px-3">
        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
          Mailbox
        </p>
        <nav className="space-y-0.5">
          {mailboxNav.map(({ label, href, icon, badge }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#eef2ff] text-[#243ea7]"
                    : "text-[#374151] hover:bg-[#f3f4f6] hover:text-[#243ea7]"
                }`}
              >
                <span className={active ? "text-[#243ea7]" : "text-[#6b7280]"}>
                  {icon}
                </span>
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className="rounded-full bg-[#243ea7] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-5 px-3">
        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
          Enterprise Admin
        </p>
        <p className="mb-1 px-2 text-[10px] text-[#b0b7c3]">
          Precision Security
        </p>
        <nav className="space-y-0.5">
          {adminNav.map(({ label, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#eef2ff] text-[#243ea7]"
                    : "text-[#374151] hover:bg-[#f3f4f6] hover:text-[#243ea7]"
                }`}
              >
                <span className={active ? "text-[#243ea7]" : "text-[#6b7280]"}>
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom nav */}
      <div className="border-t border-[#e2e6ef] px-3 py-3">
        {bottomNav.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#243ea7] transition"
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
