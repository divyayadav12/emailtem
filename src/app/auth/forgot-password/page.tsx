"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";

type Step = "REQUEST_TOKEN" | "RESET_PASSWORD" | "SUCCESS";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("REQUEST_TOKEN");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestToken(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await api.request<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });
      
      setStep("RESET_PASSWORD");
    } catch (err: any) {
      setError(err.message || "Failed to request reset token.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!resetToken) {
      setError("Please enter the reset token.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await api.request<{ message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ reset_token: resetToken.trim(), new_password: newPassword }),
      });
      
      setStep("SUCCESS");
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Token might be invalid or expired.");
    } finally {
      setLoading(false);
    }
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

        {step === "REQUEST_TOKEN" && (
          <form
            className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8"
            onSubmit={handleRequestToken}
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
              <h2 className="text-lg font-bold text-[#111827] sm:text-xl">Forgot Password</h2>
              <p className="mt-1 text-sm text-[#4b5563]">Enter your email to receive a secure OTP.</p>
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
                    required
                  />
                </span>
              </label>

              {error && (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{error}</p>
              )}

              {/* Submit */}
              <button
                disabled={loading}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] disabled:opacity-70 sm:h-12"
                type="submit"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>

            <div className="mt-6 border-t border-[#e5e7eb] pt-5 text-center">
              <Link href="/auth/login" className="text-sm font-bold text-[#243ea7] hover:text-[#162b78]">
                ← Back to Login
              </Link>
            </div>
          </form>
        )}

        {step === "RESET_PASSWORD" && (
          <form
            className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8"
            onSubmit={handleResetPassword}
          >
            <div className="mb-6 sm:mb-7">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff]">
                <svg className="h-5 w-5 text-[#243ea7]" fill="none" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#111827] sm:text-xl">Reset Password</h2>
              <p className="mt-1 text-sm text-[#4b5563]">Enter the 6-digit OTP sent to your email and your new password.</p>
            </div>

            <div className="mb-5 rounded-md bg-[#eff6ff] p-3 text-xs font-semibold text-[#1d4ed8]">
              <p>An OTP has been sent to your email. Please check your inbox and spam folder.</p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#374151]">Verification Code (OTP)</span>
                <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                  <input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                    placeholder="000000"
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    required
                  />
                </span>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#374151]">New Password</span>
                <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                  <input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                    placeholder="••••••••"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </span>
              </label>

              {error && (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{error}</p>
              )}

              <button
                disabled={loading}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] disabled:opacity-70 sm:h-12"
                type="submit"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
            
            <div className="mt-6 border-t border-[#e5e7eb] pt-5 text-center">
              <button onClick={() => setStep("REQUEST_TOKEN")} type="button" className="text-sm font-bold text-[#243ea7] hover:text-[#162b78]">
                ← Back
              </button>
            </div>
          </form>
        )}

        {step === "SUCCESS" && (
          <div className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecfdf5] sm:h-16 sm:w-16">
                <svg className="h-7 w-7 text-[#16a34a] sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#111827] sm:text-xl">Password Reset Successful</h2>
              <p className="mt-2 text-sm text-[#4b5563]">
                Your password has been successfully updated. You can now use your new password to log in.
              </p>

              <div className="mt-6 w-full">
                <Link
                  href="/auth/login"
                  className="flex h-11 w-full items-center justify-center rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] sm:h-12"
                >
                  Go to Login
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
