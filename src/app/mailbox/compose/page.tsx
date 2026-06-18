import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ThemeShell } from "@/components/common/ThemeShell";

export default function ComposePage() {
  return (
    <ThemeShell title="Compose mail" description="Rich text editor pane integrated with AI assistance hooks.">
      <div className="grid gap-4">
        <Input placeholder="To" />
        <Input placeholder="Subject" />
        <textarea className="min-h-48 rounded-xl border border-[#d0d7de] p-3 text-sm outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#d3e3fd]" placeholder="Write message" />
        <div className="rounded-xl bg-[#e8f0fe] p-4 text-sm font-medium text-[#174ea6]">
          AI assistance hooks ready for rewrite, summary, and tone adjustment.
        </div>
        <Button type="button">Send message</Button>
      </div>
    </ThemeShell>
  );
}
