import { Topbar } from "@/components/layout/Topbar";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Topbar />
      {children}
    </main>
  );
}
