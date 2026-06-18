import { ThemeShell } from "@/components/common/ThemeShell";

const domains = [
  { domain: "enterprise.test", mx: "Verified", spf: "Aligned" },
  { domain: "sales.enterprise.test", mx: "Pending", spf: "Review" },
];

export default function DomainsPage() {
  return (
    <ThemeShell title="Domain onboarding" description="Domain onboarding interface with MX/SPF validation elements.">
      <div className="grid gap-3">
        {domains.map((domain) => (
          <div key={domain.domain} className="rounded-xl border border-[#dfe3ea] p-4">
            <p className="font-bold text-[#1f1f1f]">{domain.domain}</p>
            <p className="mt-1 text-sm text-[#5f6368]">
              MX: {domain.mx} · SPF: {domain.spf}
            </p>
          </div>
        ))}
      </div>
    </ThemeShell>
  );
}
