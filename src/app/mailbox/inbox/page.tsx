import { MailList } from "@/components/mailbox/MailList";
import { MailViewer } from "@/components/mailbox/MailViewer";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function InboxPage() {
  return (
    <ThemeShell title="Incoming mail stream" description="Async multi-threaded incoming mail stream display surface.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <MailList />
        <MailViewer />
      </div>
    </ThemeShell>
  );
}
