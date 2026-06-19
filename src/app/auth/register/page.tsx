"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/services/auth.service";

const roles = [
  {
    value: "admin",
    label: "Admin",
    sub: "Full platform access",
    color: "bg-[#243ea7]",
    borderColor: "border-[#243ea7]",
    initials: "AD",
  },
  {
    value: "manager",
    label: "Manager",
    sub: "Team & quota management",
    color: "bg-[#0f766e]",
    borderColor: "border-[#0f766e]",
    initials: "MG",
  },
  {
    value: "employee",
    label: "Employee",
    sub: "Personal mailbox access",
    color: "bg-[#7c3aed]",
    borderColor: "border-[#7c3aed]",
    initials: "EM",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await authService.register(name.trim(), email.trim(), password, role);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch {
      setError("Registration failed. Please try again or use a different email.");
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
          <p className="mt-1.5 text-sm font-medium text-[#6b7280]">Create your enterprise account</p>
        </div>

        {/* Register form */}
        <form
          className="w-full max-w-115 rounded-xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8"
          onSubmit={handleRegister}
        >
          <div className="mb-5 sm:mb-7">
            <h2 className="text-lg font-bold text-[#111827] sm:text-xl">Create Account</h2>
            <p className="mt-1 text-sm text-[#4b5563]">Fill in your details to register on the platform.</p>
          </div>

          <div className="grid gap-4 sm:gap-5">

            {/* Role Selector */}
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">Select Role</span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`group relative flex flex-col items-center gap-1.5 rounded-xl border-2 bg-white px-2 py-3 text-center transition hover:shadow-md sm:gap-2 sm:px-3 sm:py-4 ${
                      role === r.value ? `${r.borderColor} shadow-md` : "border-[#e2e6ef] hover:border-[#243ea7]"
                    }`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm ${r.color}`}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827] sm:text-sm">{r.label}</p>
                      <p className="mt-0.5 hidden text-[10px] text-[#6b7280] sm:block">{r.sub}</p>
                    </div>
                    {role === r.value && (
                      <span className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full ${r.color}`}>
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">Full Name</span>
              <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  <path d="M20 21a8 8 0 00-16 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
                <input
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
            </label>

            {/* Email */}
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">Enterprise Email</span>
              <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                  <path d="M4 7.5h16v10H4v-10z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  <path d="M4.5 8l7.5 5 7.5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
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

            {/* Password */}
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">Password</span>
              <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10h10v9H7v-9z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  <path d="M9 10V8a3 3 0 016 0v2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
                <input
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                  placeholder="············"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" aria-label="Toggle password" className="text-[#6b7280] hover:text-[#243ea7]" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  )}
                </button>
              </span>
            </label>

            {/* Confirm Password */}
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">Confirm Password</span>
              <span className="flex h-11 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff] sm:h-12">
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6b7280]" fill="none" viewBox="0 0 24 24">
                  <path d="M7 10h10v9H7v-9z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  <path d="M9 10V8a3 3 0 016 0v2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
                <input
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                  placeholder="············"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" aria-label="Toggle confirm password" className="text-[#6b7280] hover:text-[#243ea7]" onClick={() => setShowConfirmPassword(v => !v)}>
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  )}
                </button>
              </span>
            </label>

            {/* Error */}
            {error && (
              <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{error}</p>
            )}

            {/* Success */}
            {success && (
              <p className="rounded-md bg-[#f0fdf4] px-3 py-2 text-sm font-semibold text-[#15803d]">{success}</p>
            )}

            <button
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#283da8] text-sm font-bold text-white shadow-[0_8px_18px_rgba(40,61,168,0.28)] transition hover:bg-[#1e2f8a] disabled:opacity-60 disabled:cursor-not-allowed sm:h-12"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-5 text-center text-sm text-[#4b5563]">
            Already have an account?{" "}
            <Link className="font-bold text-[#243ea7] hover:text-[#162b78] hover:underline" href="/auth/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>

      <footer className="flex flex-wrap justify-center gap-4 px-4 py-4 text-xs font-medium text-[#4b5563] sm:gap-8 sm:px-6 sm:py-6">
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/auth/login">Privacy Policy</Link>
        <Link href="/support">Support</Link>
      </footer>
    </main>
  );
}
