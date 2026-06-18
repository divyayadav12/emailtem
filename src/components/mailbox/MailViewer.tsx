"use client";

import type { Message } from "@/types";

type Props = { message: Message | undefined; onBack?: () => void };

export function MailViewer({ message, onBack }: Props) {
  if (!message) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#f9fafb] text-sm text-[#9ca3af]">
        Select an email to read
      </div>
    );
  }

  const senderName = message.from.split(" <")[0];
  const senderEmail = message.from.match(/<(.+)>/)?.[1] ?? message.from;
  const initials = senderName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-1 flex-col bg-white overflow-y-auto">
      {/* Viewer toolbar */}
      <div className="flex items-center justify-between border-b border-[#e2e6ef] px-3 py-3 md:px-5">
        <div className="flex items-center gap-1 md:gap-2">
          {/* Back button — mobile only */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6] md:hidden"
              title="Back"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {/* Archive */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Archive">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Mark unread */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Mark unread">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
          {/* Delete */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Delete">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Move */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Move">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Snooze */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Snooze">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Reply */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Reply">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M9 17L4 12l5-5M4 12h11a5 5 0 010 10h-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Reply all */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Reply all">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M7 17L2 12l5-5M12 17L7 12l5-5M7 12h10a5 5 0 010 10h-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Forward */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="Forward">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path d="M15 17l5-5-5-5M20 12H9a5 5 0 000 10h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* More */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] hover:bg-[#f3f4f6]" title="More">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" />
              <circle cx="12" cy="19" r="1.2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 px-4 py-4 md:px-6 md:py-5">
        {/* Subject + star */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-base font-bold text-[#111827] leading-snug md:text-xl">{message.subject}</h1>
          <button className="mt-0.5 shrink-0 text-[#d1d5db] hover:text-[#f59e0b] transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Sender meta */}
        <div className="mt-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#243ea7] text-xs font-bold text-white">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#111827]">{senderName}</span>
              <span className="text-xs text-[#6b7280]">&lt;{senderEmail}&gt;</span>
              {/* Verified badge */}
              <svg className="h-4 w-4 text-[#16a34a]" fill="none" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-0.5 text-xs text-[#9ca3af]">
              to me ({message.to}) • {message.receivedAt} (2 hours ago)
            </p>
          </div>
        </div>

        {/* Encrypted notice */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#e2e6ef] bg-[#f9fafb] px-4 py-3 text-sm text-[#6b7280]">
          <svg className="h-4 w-4 text-[#243ea7]" fill="none" viewBox="0 0 24 24">
            <path d="M12 3.5l6 2.2v5.1c0 4-2.4 7.6-6 9.1-3.6-1.5-6-5.1-6-9.1V5.7l6-2.2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            <strong className="text-[#374151]">End-to-End Encrypted Message</strong> — This email was sent using SecureMail Enterprise PGP. All attachments are scanned and verified clean.
          </span>
        </div>

        {/* Body */}
        <div className="mt-5 text-sm leading-7 text-[#374151] space-y-4">
          <p>Dear Administrator,</p>
          <p>
            This is a mandatory notification regarding the deployment of{" "}
            <strong>Security Protocol v4.2</strong>. This update addresses critical vulnerabilities identified
            in the legacy domain filtering system and introduces enhanced encryption for internal cross-regional
            communications.
          </p>

          {/* Action required box */}
          <div className="rounded-lg border border-[#e2e6ef] bg-[#f9fafb] px-4 py-4">
            <p className="text-sm font-semibold text-[#111827] mb-2">Action Required:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#374151]">
              <li>Log in to the Enterprise Admin console.</li>
              <li>Verify that all primary domains are listed under the &ldquo;Secured&rdquo; status.</li>
              <li>Update the TLS certificates for the &ldquo;dev-ops.internal&rdquo; sub-domain.</li>
            </ul>
          </div>

          <p>
            Failure to comply with these updates by Friday, 12:00 PM UTC may result in temporary service
            interruptions for external mail routing.
          </p>
          <p>Regards,<br /><strong>System Security Operations Team</strong></p>
        </div>
      </div>
    </div>
  );
}
