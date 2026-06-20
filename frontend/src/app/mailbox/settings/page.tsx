"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: "Enterprise Admin", email: "admin@securemail.com" });
  const [signature, setSignature] = useState("Regards,\nEnterprise Admin\nSecureMail Enterprise");
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"profile" | "security" | "notifications">("profile");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#111827]">Settings</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Manage your profile, security, and notification preferences.</p>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-lg border border-[#e2e6ef] bg-white p-1 w-fit">
          {(["profile", "security", "notifications"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold capitalize transition ${
                tab === t ? "bg-[#243ea7] text-white" : "text-[#6b7280] hover:text-[#111827]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="rounded-xl border border-[#e2e6ef] bg-white p-5">
              <h2 className="mb-4 text-sm font-bold text-[#111827]">Profile Information</h2>

              {/* Avatar */}
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#243ea7] text-lg font-bold text-white">
                  EA
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{profile.name}</p>
                  <p className="text-xs text-[#6b7280]">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#374151]">Display Name</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#374151]">Enterprise Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e2e6ef] bg-white p-5">
              <h2 className="mb-3 text-sm font-bold text-[#111827]">Email Signature</h2>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-lg border border-[#e2e6ef] px-3 py-2 text-sm text-[#374151] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#eef2ff]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-lg bg-[#243ea7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1e2f8a] transition"
              >
                Save Changes
              </button>
              {saved && (
                <span className="text-xs font-semibold text-[#16a34a]">Changes saved!</span>
              )}
            </div>
          </form>
        )}

        {tab === "security" && (
          <div className="rounded-xl border border-[#e2e6ef] bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#111827]">Security Settings</h2>
            <div className="flex items-center justify-between py-2 border-b border-[#f0f2f5]">
              <div>
                <p className="text-sm font-semibold text-[#111827]">Two-Factor Authentication</p>
                <p className="text-xs text-[#6b7280]">Authenticator app is currently active</p>
              </div>
              <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-bold text-[#166534]">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#f0f2f5]">
              <div>
                <p className="text-sm font-semibold text-[#111827]">Login Sessions</p>
                <p className="text-xs text-[#6b7280]">2 active sessions (this device + Berlin)</p>
              </div>
              <button className="text-xs font-semibold text-[#dc2626] hover:underline">Revoke all</button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold text-[#111827]">Change Password</p>
                <p className="text-xs text-[#6b7280]">Last changed 45 days ago</p>
              </div>
              <button className="rounded-lg border border-[#e2e6ef] px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] transition">
                Update
              </button>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div className="rounded-xl border border-[#e2e6ef] bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#111827]">Notification Preferences</h2>
            {[
              { label: "New email alerts", sub: "Push notification for every new message", on: true },
              { label: "Security alerts", sub: "Notify on new device logins or suspicious activity", on: true },
              { label: "Weekly digest", sub: "Summary of inbox activity every Monday morning", on: false },
              { label: "System announcements", sub: "Platform updates and maintenance windows", on: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[#f0f2f5] pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                  <p className="text-xs text-[#6b7280]">{item.sub}</p>
                </div>
                <div className={`h-5 w-9 rounded-full transition ${item.on ? "bg-[#243ea7]" : "bg-[#d1d5db]"} cursor-pointer`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
