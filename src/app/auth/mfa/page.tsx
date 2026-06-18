"use client";

import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { Shield, Check } from "lucide-react";

export default function MfaPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!code) {
      setError("Please enter the 6-digit code from your authenticator app.");
      return;
    }

    if (code.length !== 6) {
      setError("Code must be 6 digits.");
      return;
    }

    if (!/^\d+$/.test(code)) {
      setError("Code must contain only numbers.");
      return;
    }

    // Simulate verification
    if (code === "123456" || code === "000000") {
      setVerified(true);
      setTimeout(() => {
        // In a real app, this would redirect to dashboard
        window.location.href = "/mailbox/inbox";
      }, 2000);
    } else {
      setError("Invalid code. Please check and try again.");
      setCode("");
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[radial-gradient(circle_at_top_right,#eef2ff_0,#f8fafc_36%,#f7fafc_100%)] px-4 py-8 text-[#111827]">
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#243ea7] shadow-sm">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3.5l6 2.2v5.1c0 4-2.4 7.6-6 9.1-3.6-1.5-6-5.1-6-9.1V5.7l6-2.2z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M10.4 12.1l1.1 1.2 2.4-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <h1 className="mt-5 text-2xl font-bold text-[#1d348f]">
            SecureMail Enterprise
          </h1>
          <p className="mt-2 text-sm font-medium text-[#6b7280]">
            Precision Security Workspace
          </p>
        </div>

        {!verified ? (
          <form
            className="w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white shadow-sm mx-auto px-5 sm:px-6 md:px-8 py-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-[#111827]">
                  Two-Factor Authentication
                </h2>
                <span className="rounded-full bg-[#243ea7] px-3 py-1 text-[11px] font-bold uppercase text-white">
                  Secure
                </span>
              </div>
              <p className="text-sm text-[#4b5563]">
                Enter the 6-digit code from your authenticator app.
              </p>
            </div>

            <div className="space-y-6">
              <label className="space-y-3">
                <span className="text-sm font-semibold text-[#374151]">
                  Authenticator Code
                </span>
                <span className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-4 w-full focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff]">
                  <Shield className="h-5 w-5 text-[#6b7280] flex-shrink-0" />
                  <input
                    className="w-full border-0 bg-transparent text-center text-2xl font-bold tracking-widest text-[#111827] outline-none placeholder:text-[#8a93a3]"
                    placeholder="000000"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={handleCodeChange}
                    maxLength={6}
                  />
                </span>
              </label>

              <div className="mt-4 rounded-xl bg-[#f3f4f6] px-4 py-3">
                <p className="text-xs font-semibold text-[#6b7280]">
                  Code expires in: <span className="text-[#243ea7] font-bold">{timeLeft}s</span>
                </p>
              </div>

              {error && (
                <p className="rounded-xl bg-[#fef2f2] p-4 text-sm font-semibold text-[#b42318]">
                  {error}
                </p>
              )}

              {!error && (
                <p className="rounded-xl bg-[#eff6ff] p-4 text-xs font-semibold text-[#1d4ed8]">
                  📱 Open your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)
                </p>
              )}

              <button
                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] mt-6"
                type="submit"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 7l5 5-5 5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 12H4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Verify Code
              </button>
            </div>

            <div className="mt-8 mb-6 border-t border-[#e5e7eb] pt-6">
              <div className="space-y-2 text-xs font-semibold text-[#6b7280]">
                <p>💡 Don't have your code?</p>
                <p>
                  <Link
                    href="/auth/backup-codes"
                    className="text-[#243ea7] hover:text-[#162b78]"
                  >
                    Use a backup code
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white shadow-sm mx-auto px-5 sm:px-6 md:px-8 py-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5]">
                <Check className="h-8 w-8 text-[#45a282]" />
              </div>

              <h2 className="text-xl font-bold text-[#111827]">
                Verified Successfully
              </h2>
              <p className="text-sm text-[#4b5563]">
                Your two-factor authentication has been verified. You will be redirected to your mailbox shortly.
              </p>

              <div className="w-full rounded-xl bg-[#f0fdf4] p-4 space-y-2">
                <p className="text-xs font-semibold text-[#166534]">
                  ✓ Authentication successful
                </p>
                <p className="text-xs font-semibold text-[#166534]">
                  ✓ Redirecting to dashboard...
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 mt-8 pb-2 text-xs font-medium text-[#4b5563]">
        <Link href="/auth/login">Back to Login</Link>
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/auth/login">Support</Link>
      </footer>
    </main>
  );
}
