"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type CreateForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function UsersPage() {
  const { user, accessToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState<CreateForm>({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  // Fetch users
  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await api.request<User[]>("/users/", { token: accessToken || undefined });
      setUsers(data);
    } catch {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (accessToken) fetchUsers();
  }, [accessToken]);

  // Create user
  async function handleCreateUser() {
    setCreateError("");
    setCreateSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setCreateError("All fields are required.");
      return;
    }

    setCreateLoading(true);
    try {
      await api.request("/users/create", {
        method: "POST",
        body: JSON.stringify(form),
        token: accessToken || undefined,
      });
      setCreateSuccess("User created successfully!");
      setForm({ name: "", email: "", password: "", role: "EMPLOYEE" });
      fetchUsers();
      setTimeout(() => {
        setShowCreateModal(false);
        setCreateSuccess("");
      }, 1500);
    } catch {
      setCreateError("Failed to create user. Email may already exist.");
    } finally {
      setCreateLoading(false);
    }
  }

  // Delete (disable) user
  async function handleDisableUser(userId: number) {
    if (!confirm("Are you sure you want to disable this user?")) return;
    try {
      await api.request(`/users/${userId}`, { method: "DELETE", token: accessToken || undefined });
      fetchUsers();
    } catch {
      alert("Failed to disable user.");
    }
  }

  // Role badge color
  function getRoleBadge(role: string) {
    switch (role.toUpperCase()) {
      case "SUPER_ADMIN":
        return { bg: "bg-[#eef2ff]", text: "text-[#243ea7]", label: "Admin" };
      case "ADMIN":
        return { bg: "bg-[#eef2ff]", text: "text-[#243ea7]", label: "Admin" };
      case "MANAGER":
        return { bg: "bg-[#f0fdf4]", text: "text-[#0f766e]", label: "Manager" };
      case "USER":
        return { bg: "bg-[#f5f3ff]", text: "text-[#7c3aed]", label: "Employee" };
      default:
        return { bg: "bg-[#f3f4f6]", text: "text-[#374151]", label: role };
    }
  }

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Restrict non-admin
  if (user?.role?.toLowerCase() !== "admin") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
            <svg className="h-8 w-8 text-[#b42318]" fill="none" viewBox="0 0 24 24">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#111827]">Access Denied</h2>
          <p className="mt-1 text-sm text-[#6b7280]">Only administrators can manage users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827] sm:text-2xl">User Management</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Manage all users across the enterprise platform.{" "}
            <span className="font-semibold text-[#243ea7]">{users.length} total users</span>
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateModal(true);
            setCreateError("");
            setCreateSuccess("");
          }}
          className="flex items-center gap-2 rounded-lg bg-[#243ea7] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#243ea7]/25 transition hover:bg-[#1e2f8a]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Create User
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="flex h-11 max-w-md items-center gap-3 rounded-lg border border-[#cfd5df] bg-white px-4 focus-within:border-[#243ea7] focus-within:ring-2 focus-within:ring-[#dbe5ff]">
          <svg className="h-4 w-4 shrink-0 text-[#9ca3af]" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#9ca3af]"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="h-8 w-8 animate-spin text-[#243ea7]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e2e6ef] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e6ef] bg-[#f9fafb]">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                    ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                    User
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                    Role
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#9ca3af]">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const badge = getRoleBadge(u.role);
                    return (
                      <tr key={u.id} className="border-b border-[#f3f4f6] transition hover:bg-[#f9fafb]">
                        <td className="px-5 py-3.5 text-sm font-medium text-[#6b7280]">#{u.id}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#243ea7] text-xs font-bold text-white">
                              {u.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </div>
                            <span className="text-sm font-semibold text-[#111827]">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-[#4b5563]">{u.email}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${badge.bg} ${badge.text}`}
                          >
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDisableUser(u.id)}
                            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#b42318] transition hover:bg-[#fef2f2]"
                          >
                            Disable
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-[#d9dee8] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#111827]">Create New User</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] transition hover:bg-[#f3f4f6]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid gap-4">
              {/* Name */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-[#374151]">Full Name</span>
                <input
                  className="h-11 rounded-md border border-[#cfd5df] bg-white px-3 text-sm font-medium text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#dbe5ff]"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              {/* Email */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-[#374151]">Email</span>
                <input
                  className="h-11 rounded-md border border-[#cfd5df] bg-white px-3 text-sm font-medium text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#dbe5ff]"
                  placeholder="user@enterprise.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              {/* Password */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-[#374151]">Password</span>
                <input
                  className="h-11 rounded-md border border-[#cfd5df] bg-white px-3 text-sm font-medium text-[#111827] outline-none focus:border-[#243ea7] focus:ring-2 focus:ring-[#dbe5ff]"
                  placeholder="············"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>

              {/* Role */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-[#374151]">Role</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "ADMIN", label: "Admin", color: "bg-[#243ea7]" },
                    { value: "MANAGER", label: "Manager", color: "bg-[#0f766e]" },
                    { value: "EMPLOYEE", label: "Employee", color: "bg-[#7c3aed]" },
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: r.value })}
                      className={`flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-bold transition ${
                        form.role === r.value
                          ? "border-[#243ea7] bg-[#eef2ff] text-[#243ea7]"
                          : "border-[#e2e6ef] text-[#4b5563] hover:border-[#243ea7]"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${r.color}`} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </label>

              {/* Error */}
              {createError && (
                <p className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b42318]">{createError}</p>
              )}

              {/* Success */}
              {createSuccess && (
                <p className="rounded-md bg-[#f0fdf4] px-3 py-2 text-sm font-semibold text-[#15803d]">{createSuccess}</p>
              )}

              <button
                onClick={handleCreateUser}
                disabled={createLoading}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#243ea7] text-sm font-bold text-white shadow-md shadow-[#243ea7]/25 transition hover:bg-[#1e2f8a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
