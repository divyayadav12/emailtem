import { Button } from "@/components/common/Button";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function AccountsPage() {
  return (
    <ThemeShell title="Mailbox generation" description="Mailbox generation console window.">
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-[#dfe3ea] p-4">
          <p className="font-bold text-[#1f1f1f]">new.user@enterprise.test</p>
          <p className="text-sm text-[#5f6368]">Ready for provisioning</p>
        </div>
        <Button type="button">Create mailbox</Button>
      </div>
    </ThemeShell>
  );
}
