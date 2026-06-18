import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mode="admin" />
      <main className="min-w-0 flex-1">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
