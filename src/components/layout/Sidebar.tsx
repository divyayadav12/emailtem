import Link from "next/link";

const mailboxLinks = [
  ["Inbox", "/mailbox/inbox"],
  ["Sent", "/mailbox/sent"],
  ["Compose", "/mailbox/compose"],
  ["Settings", "/mailbox/settings"],
];

const adminLinks = [
  ["Domains", "/admin/domains"],
  ["Logs", "/admin/logs"],
  ["Accounts", "/manager/accounts"],
  ["Quotas", "/manager/quotas"],
];

type SidebarProps = {
  mode?: "mailbox" | "admin";
};

export function Sidebar({ mode = "mailbox" }: SidebarProps) {
  const links = mode === "admin" ? adminLinks : mailboxLinks;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#dfe3ea] bg-white p-4 md:block">
      <div className="mb-5 rounded-xl bg-[#e8f0fe] p-3">
        <p className="text-xs font-bold uppercase text-[#0b57d0]">
          {mode === "admin" ? "Admin Console" : "Mailbox"}
        </p>
        <p className="mt-1 text-sm font-semibold text-[#1f1f1f]">
          Enterprise Mail
        </p>
      </div>
      <nav className="space-y-1">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#3c4043] hover:bg-[#f1f4f9] hover:text-[#0b57d0]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
