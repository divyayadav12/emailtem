"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Check, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate sending reset link
    setSubmitted(true);
  }

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

        {!submitted ? (
          <form
            className="w-full max-w-[460px] rounded-lg border border-[#d9dee8] bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
            onSubmit={handleSubmit}
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">
                  Reset Password
                </h2>
                <p className="mt-1 text-sm text-[#4b5563]">
                  Enter your email to receive a password reset link.
                </p>
              </div>
 
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#374151]">
                  Enterprise Email
                </span>
                <span className="flex h-12 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff]">
                  <Mail className="h-5 w-5 text-[#6b7280]" />
                  <input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                    placeholder="username@enterprise.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </span>
              </label>

              {error && (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">
                  {error}
                </p>
              )}

              {!error && (
                <p className="rounded-md bg-[#eff6ff] px-3 py-2 text-xs font-semibold text-[#1d4ed8]">
                  We'll send a secure password reset link to your email address.
                </p>
              )}

              <button
                className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a]"
                type="submit"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Send Reset Link
              </button>
            </div>

            <div className="mt-8 border-t border-[#e5e7eb] pt-6 text-center">
              <p className="text-xs font-semibold text-[#8a93a3]">
                <Link
                  href="/auth/login"
                  className="text-[#243ea7] hover:text-[#162b78] font-bold"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-[460px] rounded-lg border border-[#d9dee8] bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5]">
                <Check className="h-8 w-8 text-[#45a282]" />
              </div>

              <h2 className="mt-6 text-xl font-bold text-[#111827]">
                Check Your Email
              </h2>
              <p className="mt-2 text-sm text-[#4b5563]">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-[#111827]">{email}</span>
              </p>

              <div className="mt-6 w-full rounded-md bg-[#f0fdf4] p-4">
                <p className="text-xs font-semibold text-[#166534]">
                  ✓ Reset link valid for 24 hours
                </p>
                <p className="mt-2 text-xs font-semibold text-[#166534]">
                  ✓ Check your spam folder if you don't see the email
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a]"
              >
                Try Another Email
              </button>

              <div className="mt-6 border-t border-[#e5e7eb] pt-6 w-full text-center">
                <p className="text-xs font-semibold text-[#8a93a3]">
                  <Link
                    href="/auth/login"
                    className="text-[#243ea7] hover:text-[#162b78] font-bold"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="flex flex-wrap justify-center gap-8 pb-2 text-xs font-medium text-[#4b5563]">
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/auth/login">Privacy Policy</Link>
        <Link href="/auth/login">Support</Link>
      </footer>
    </main>
  );
}
