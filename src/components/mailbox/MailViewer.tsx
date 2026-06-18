export function MailViewer() {
  const html =
    "<main style='font-family:Arial,sans-serif;padding:24px;line-height:1.6;color:#1f1f1f'><h1 style='font-size:22px'>MX validation completed</h1><p>Domain mail exchange validation completed successfully.</p></main>";

  return (
    <iframe
      className="min-h-80 w-full rounded-xl border border-[#dfe3ea] bg-white"
      sandbox=""
      srcDoc={html}
      title="Safe mail preview"
    />
  );
}
