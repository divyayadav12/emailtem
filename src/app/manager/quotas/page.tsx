import { ThemeShell } from "@/components/common/ThemeShell";

export default function QuotasPage() {
  return (
    <ThemeShell title="Resource quotas" description="Real-time resource size limits modifying surface.">
      <div className="grid gap-4">
        {["Operations", "Support"].map((name) => (
          <div key={name} className="rounded-xl border border-[#dfe3ea] p-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>{name}</span>
              <span>68%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#e8eaed]">
              <div className="h-2 w-2/3 rounded-full bg-[#0b57d0]" />
            </div>
          </div>
        ))}
      </div>
    </ThemeShell>
  );
}
