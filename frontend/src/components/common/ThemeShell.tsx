type ThemeShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ThemeShell({
  eyebrow = "Enterprise Email",
  title,
  description,
  children,
}: ThemeShellProps) {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#f8fafd] p-6 text-[#1f1f1f]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#0b57d0]">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-[#1f1f1f]">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5f6368]">
            {description}
          </p>
        </div>
        <div className="rounded-xl border border-[#dfe3ea] bg-white p-5 shadow-[0_1px_2px_rgba(60,64,67,0.12)]">
          {children}
        </div>
      </div>
    </section>
  );
}
