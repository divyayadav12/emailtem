import { MailList } from "@/components/mailbox/MailList";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function SentPage() {
  return (
    <ThemeShell title="Outgoing transactions" description="Outgoing transaction tracking table interface.">
      <MailList />
    </ThemeShell>
  );
}
