"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type NavItem = { label: string; href: string; badge?: number; icon: React.ReactNode };

const mailboxNav: NavItem[] = [
  {
    label: "Inbox",
    href: "/mailbox/inbox",
    badge: 2,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Sent",
    href: "/mailbox/sent",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Drafts",
    href: "/mailbox/drafts",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Trash",
    href: "/mailbox/trash",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Archive",
    href: "/mailbox/archive",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const adminNav: NavItem[] = [
  {
    label: "Domains",
    href: "/admin/domains",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Accounts",
    href: "/manager/accounts",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "System Logs",
    href: "/admin/logs",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const managerNav: NavItem[] = [
  {
    label: "Accounts",
    href: "/manager/accounts",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Quotas",
    href: "/manager/quotas",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const bottomNav: NavItem[] = [
  {
    label: "Support",
    href: "/support",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

type SidebarProps = {
  mode?: "mailbox" | "admin" | "manager";
  open?: boolean;
  onClose?: () => void;
};

function NavLink({ href, icon, label, badge, onClose, pathname }: NavItem & { onClose?: () => void; pathname: string }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active ? "bg-[#eef2ff] text-[#243ea7]" : "text-[#374151] hover:bg-[#f3f4f6] hover:text-[#243ea7]"
      }`}
    >
      <span className={active ? "text-[#243ea7]" : "text-[#6b7280]"}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-full bg-[#243ea7] px-1.5 py-0.5 text-[10px] font-bold text-white">{badge}</span>
      ) : null}
    </Link>
  );
}

export function Sidebar({ mode: modeProp, open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Derive mode from user role if not explicitly passed
  const mode = modeProp ?? (
    user?.role === "super_admin" ? "admin" :
    user?.role === "manager" ? "manager" : "mailbox"
  );

  const inner = (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-[#e2e6ef] bg-white">
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#243ea7]">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <path d="M4 7.5h16v10H4v-10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 8l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#1d348f]">SecureMail</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6] md:hidden">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable nav area */}
      <div className="flex flex-1 flex-col overflow-y-auto">

        {/* Compose button */}
        <div className="px-4 pb-4">
          <Link
            href="/mailbox/compose"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-[#243ea7] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#243ea7]/30 hover:bg-[#1e2f8a] transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Compose
          </Link>
        </div>

        {/* Mailbox section — always visible */}
        <div className="px-3">
          <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Mailbox</p>
          <nav className="space-y-0.5">
            {mailboxNav.map((item) => (
              <NavLink key={item.href} {...item} onClose={onClose} pathname={pathname} />
            ))}
          </nav>
        </div>

        {/* Admin section */}
        {mode === "admin" && (
          <div className="mt-5 px-3">
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Enterprise Admin</p>
            <nav className="space-y-0.5">
              {adminNav.map((item) => (
                <NavLink key={item.href} {...item} onClose={onClose} pathname={pathname} />
              ))}
            </nav>
          </div>
        )}

        {/* Manager section */}
        {mode === "manager" && (
          <div className="mt-5 px-3">
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Management</p>
            <nav className="space-y-0.5">
              {managerNav.map((item) => (
                <NavLink key={item.href} {...item} onClose={onClose} pathname={pathname} />
              ))}
            </nav>
          </div>
        )}

      </div>{/* end scrollable nav area */}

      {/* Support — always at bottom */}
      <div className="border-t border-[#e2e6ef] px-3 py-3 shrink-0">
        {bottomNav.map((item) => (
          <NavLink key={item.href} {...item} onClose={onClose} pathname={pathname} />
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        {inner}
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative z-10 h-full shadow-xl">
            {inner}
          </div>
        </div>
      )}
    </>
  );
}
