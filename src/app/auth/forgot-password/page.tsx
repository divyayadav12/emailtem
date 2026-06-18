"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[radial-gradient(circle_at_top_right,#eef2ff_0,#f8fafc_36%,#f7fafc_100%)] px-4 py-6 text-[#111827] sm:py-8">
      <section className="flex w-full flex-1 flex-col items-center justify-center">

        {/* Brand */}
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#243ea7] shadow-sm sm:h-12 sm:w-12">
            <svg aria-hidden="true" className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
              <path d="M12 3.5l6 2.2v5.1c0 4-2.4 7.6-6 9.1-3.6-1.5-6-5.1-6-9.1V5.7l6-2.2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              <path d="M10.4 12.1l1.1 1.2 2.4-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-[#1d348f] sm:mt-5 sm:text-2xl">SecureMail Enterprise</h1>
          <p className="mt-1.5 text-sm font-medium text-[#6b7280]">Precision Security Workspace</p>
        </div>

        {!submitted ? (
          <form
            className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8"
            onSubmit={handleSubmit}
          >
            {/* Header */}
            <div className="mb-6 sm:mb-7">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff]">
                <svg className="h-5 w-5 text-[#243ea7]" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10h10v9H7v-9z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 10V8a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#111827] sm:text-xl">Reset Password</h2>
              <p className="mt-1 text-sm text-[#4b5563]">Enter your email to receive a secure password reset link.</p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {/* Email field */}
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#374151]">Enterprise Email</span>
                <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                  <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                    <path d="M4 7.5h16v10H4v-10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 8l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                    placeholder="username@enterprise.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
              </label>

              {/* Error / hint */}
              {error ? (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{error}</p>
              ) : (
                <p className="rounded-md bg-[#eff6ff] px-3 py-2 text-xs font-semibold text-[#1d4ed8]">
                  We'll send a secure reset link valid for 24 hours.
                </p>
              )}

              {/* Submit */}
              <button
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] sm:h-12"
                type="submit"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Send Reset Link
              </button>
            </div>

            <div className="mt-6 border-t border-[#e5e7eb] pt-5 text-center">
              <Link href="/auth/login" className="text-sm font-bold text-[#243ea7] hover:text-[#162b78]">
                ← Back to Login
              </Link>
            </div>
          </form>

        ) : (
          <div className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex flex-col items-center text-center">
              {/* Success icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecfdf5] sm:h-16 sm:w-16">
                <svg className="h-7 w-7 text-[#16a34a] sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#111827] sm:text-xl">Check Your Email</h2>
              <p className="mt-2 text-sm text-[#4b5563]">
                We sent a reset link to{" "}
                <span className="font-semibold text-[#111827] break-all">{email}</span>
              </p>

              <div className="mt-5 w-full rounded-lg bg-[#f0fdf4] px-4 py-3 text-left space-y-1.5">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reset link valid for 24 hours
                </p>
                <p className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Check your spam folder if you don't see it
                </p>
              </div>

              <button
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="mt-5 flex h-11 w-full items-center justify-center rounded-md border border-[#e2e6ef] text-sm font-semibold text-[#374151] transition hover:bg-[#f3f4f6] sm:h-12"
              >
                Try a different email
              </button>

              <div className="mt-5 border-t border-[#e5e7eb] pt-4 w-full text-center">
                <Link href="/auth/login" className="text-sm font-bold text-[#243ea7] hover:text-[#162b78]">
                  ← Back to Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="flex flex-wrap justify-center gap-4 px-4 py-4 text-xs font-medium text-[#4b5563] sm:gap-8 sm:px-6 sm:py-6">
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/auth/login">Privacy Policy</Link>
        <Link href="/support">Support</Link>
      </footer>
    </main>
  );
}
