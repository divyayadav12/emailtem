import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function SettingsPage() {
  return (
    <ThemeShell title="Local preferences" description="Local preferences configuration engine.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="grid gap-3">
          <Input defaultValue="Admin User" />
          <Input defaultValue="admin@enterprise.test" />
          <Button type="button">Save profile</Button>
        </div>
        <textarea className="min-h-32 rounded-xl border border-[#d0d7de] p-3 text-sm outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#d3e3fd]" defaultValue={"Regards,\nAdmin User"} />
      </div>
    </ThemeShell>
  );
}
