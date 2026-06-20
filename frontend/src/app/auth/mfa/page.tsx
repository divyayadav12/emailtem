"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

export default function MfaPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const { login, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev === null || prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!code) { setError("Please enter the 6-digit code sent to your email."); return; }
    if (code.length !== 6) { setError("Code must be exactly 6 digits."); return; }

    const userIdStr = localStorage.getItem("mfa_user_id");
    const email = localStorage.getItem("mfa_email") || "";
    if (!userIdStr) {
      setError("Session expired. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.request<{ message: string; access_token: string; role: string }>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ user_id: parseInt(userIdStr, 10), otp: code }),
      });

      setAccessToken(res.access_token);
      login({
        id: userIdStr,
        name: email.split("@")[0], // Fallback name
        email: email,
        role: res.role.toLowerCase() as any, // role is SUPER_ADMIN, etc.
      });

      setVerified(true);
      setTimeout(() => {
        const role = res.role.toLowerCase();
        if (role === "super_admin" || role === "admin") {
          router.push("/admin/users");
        } else if (role === "manager") {
          router.push("/manager/accounts");
        } else {
          router.push("/mailbox/inbox");
        }
      }, 1500);
    } catch {
      setError("Invalid or expired OTP code.");
      setCode("");
    } finally {
      setLoading(false);
    }
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
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

        {!verified ? (
          <form
            className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-5 sm:mb-7">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#111827] sm:text-xl">Two-Factor Authentication</h2>
                <span className="shrink-0 rounded-full bg-[#243ea7] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Secure</span>
              </div>
              <p className="text-sm text-[#4b5563]">Enter the 6-digit code sent to your email.</p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {/* Code input */}
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#374151]">Verification Code</span>
                <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                  <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                    <path d="M12 3.5l6 2.2v5.1c0 4-2.4 7.6-6 9.1-3.6-1.5-6-5.1-6-9.1V5.7l6-2.2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    <path d="M10.4 12.1l1.1 1.2 2.4-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  </svg>
                  <input
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-center text-lg font-bold tracking-[0.4em] text-[#111827] outline-none placeholder:text-[#c8cdd8] placeholder:tracking-[0.4em]"
                    placeholder="000000"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={handleCodeChange}
                    maxLength={6}
                    autoFocus
                  />
                </span>
              </label>

              {/* Timer */}
              <div className="flex items-center gap-2 rounded-md bg-[#f3f4f6] px-3 py-2.5">
                <svg className="h-4 w-4 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-xs font-semibold text-[#6b7280]">
                  Code expires in: <span className="text-[#243ea7]">{timeLeft ?? 30}s</span>
                </p>
                {/* Progress bar */}
                <div className="ml-auto h-1.5 w-16 rounded-full bg-[#e2e6ef] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#243ea7] transition-all duration-1000"
                    style={{ width: `${((timeLeft ?? 30) / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Error or hint */}
              {error ? (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{error}</p>
              ) : (
                <p className="rounded-md bg-[#eff6ff] px-3 py-2 text-xs font-semibold text-[#1d4ed8]">
                  Please check your inbox. The OTP is valid for 5 minutes.
                </p>
              )}

              <button
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] sm:h-12"
                type="submit"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M12 3.5l6 2.2v5.1c0 4-2.4 7.6-6 9.1-3.6-1.5-6-5.1-6-9.1V5.7l6-2.2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  <path d="M10.4 12.1l1.1 1.2 2.4-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
                Verify Code
              </button>

              <p className="text-center text-sm text-[#6b7280]">
                Lost access?{" "}
                <Link href="/auth/backup-codes" className="font-bold text-[#243ea7] hover:text-[#162b78] transition">
                  Use a backup code
                </Link>
              </p>
            </div>
          </form>
        ) : (
          /* Success state */
          <div className="w-full max-w-[460px] rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7]">
                <svg className="h-7 w-7 text-[#16a34a]" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-[#111827]">Verified Successfully</p>
                <p className="mt-1 text-sm text-[#6b7280]">Redirecting to your mailbox…</p>
              </div>
              <div className="w-full rounded-md bg-[#f0fdf4] px-4 py-3 text-left space-y-1">
                <p className="text-xs font-semibold text-[#166534]">✓ Authentication successful</p>
                <p className="text-xs font-semibold text-[#166534]">✓ Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="flex flex-wrap justify-center gap-4 px-4 py-4 text-xs font-medium text-[#4b5563] sm:gap-8 sm:px-6 sm:py-6">
        <Link href="/auth/login">Back to Login</Link>
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/support">Support</Link>
      </footer>
    </main>
  );
}
