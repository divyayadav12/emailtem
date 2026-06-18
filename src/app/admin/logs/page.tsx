import { ThemeShell } from "@/components/common/ThemeShell";

const logs = [
  "Domain enterprise.test validated",
  "Mailbox ops@enterprise.test quota updated",
  "MFA policy changed for managers",
];

export default function LogsPage() {
  return (
    <ThemeShell title="System log stream" description="Global system log stream collector dashboard.">
      <div className="divide-y divide-[#dfe3ea] rounded-xl border border-[#dfe3ea]">
        {logs.map((log) => (
          <p key={log} className="p-4 text-sm font-medium text-[#3c4043]">
            {log}
          </p>
        ))}
      </div>
    </ThemeShell>
  );
}
