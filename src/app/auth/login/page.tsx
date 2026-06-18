"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const dummyUser = {
  id: "user-1",
  name: "Enterprise Admin",
  email: "username@enterprise.com",
  role: "super_admin" as const,
};

const dummyPassword = "password123";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(dummyUser.email);
  const [password, setPassword] = useState(dummyPassword);
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === dummyUser.email && password === dummyPassword) {
      login(dummyUser);
      router.push("/mailbox/inbox");
      return;
    }

    setError("Invalid dummy credentials. Use username@enterprise.com and password123.");
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

        <form
          className="w-full max-w-[460px] rounded-lg border border-[#d9dee8] bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
          onSubmit={handleLogin}
        >
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Secure Login</h2>
              <p className="mt-1 text-sm text-[#4b5563]">
                Enter your enterprise credentials to continue.
              </p>
            </div>
            <span className="rounded-full bg-[#45a282] px-3 py-1 text-[11px] font-bold uppercase text-white">
              Encrypted
            </span>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">
                Enterprise Email
              </span>
              <span className="flex h-12 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff]">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-[#6b7280]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 7.5h16v10H4v-10z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M4.5 8l7.5 5 7.5-5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>
                <input
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                  placeholder="username@enterprise.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#374151]">
                Password
              </span>
              <span className="flex h-12 items-center gap-3 rounded-md border border-[#cfd5df] bg-white px-3 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff]">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-[#6b7280]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10h10v9H7v-9z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M9 10V8a3 3 0 016 0v2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>
                <input
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#8a93a3]"
                  placeholder="************"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-[#6b7280]"
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
              </span>
              <div className="flex justify-end">
                <Link
                  className="text-sm font-bold text-[#243ea7] hover:text-[#162b78]"
                  href="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-[#4b5563]">
              <input
                className="h-4 w-4 rounded border-[#cfd5df] accent-[#243ea7]"
                type="checkbox"
              />
              Remember this device for 30 days
            </label>

            {error ? (
              <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">
                {error}
              </p>
            ) : (
              <p className="rounded-md bg-[#eff6ff] px-3 py-2 text-xs font-semibold text-[#1d4ed8]">
                Dummy login: username@enterprise.com / password123
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
                <path
                  d="M15 5h3a2 2 0 012 2v10a2 2 0 01-2 2h-3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Authenticate &amp; Login
            </button>
          </div>

          <div className="mt-8 border-t border-[#e5e7eb] pt-6 text-center">
            <p className="text-xs font-semibold text-[#8a93a3]">
              Hardware Token Enabled
            </p>
          </div>
        </form>
      </section>

      <footer className="flex flex-wrap justify-center gap-8 pb-2 text-xs font-medium text-[#4b5563]">
        <Link href="/auth/login">Security Standards</Link>
        <Link href="/auth/login">Privacy Policy</Link>
        <Link href="/auth/login">Support</Link>
      </footer>
    </main>
  );
}
