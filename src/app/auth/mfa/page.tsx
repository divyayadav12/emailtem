import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function MfaPage() {
  return (
    <ThemeShell title="TOTP verification" description="Secondary token entry gateway surface.">
      <form className="grid max-w-md gap-4">
        <Input inputMode="numeric" placeholder="TOTP code" />
        <Button type="button">Verify token</Button>
      </form>
    </ThemeShell>
  );
}
