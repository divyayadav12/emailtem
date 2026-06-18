import Link from "next/link";

export function Topbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-[#dfe3ea] bg-white px-6">
      <div>
        <p className="text-xs font-bold uppercase text-[#0b57d0]">Workspace</p>
        <p className="text-base font-bold text-[#1f1f1f]">admin@enterprise.test</p>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Link className="font-semibold text-[#5f6368] hover:text-[#0b57d0]" href="/mailbox/settings">
          Settings
        </Link>
        <Link className="rounded-lg bg-[#0b57d0] px-3 py-2 font-semibold text-white hover:bg-[#0842a0]" href="/mailbox/compose">
          Compose
        </Link>
      </div>
    </div>
  );
}
