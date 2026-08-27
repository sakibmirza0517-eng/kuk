"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onValue, ref as dbRef } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Reveal from "@/components/Reveal";

const ADMIN_EMAIL = "sakibmirza.05.17@gmail.com";

interface TrackedUser {
  uid: string;
  name: string;
  email: string;
  photo: string;
  lastActive: number;
}

const timeAgo = (ts: number) => {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const statusOf = (lastActive: number) => {
  const diff = Date.now() - lastActive;
  if (diff < 10 * 60000)
    return { label: "● Online", cls: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800" };
  if (diff < 24 * 60 * 60000)
    return { label: "Active", cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800" };
  return { label: "Idle", cls: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700" };
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<TrackedUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const unsub = onValue(dbRef(database, "users"), (snap) => {
      const data = snap.val() || {};
      const list = (Object.values(data) as TrackedUser[]).sort(
        (a, b) => (b.lastActive || 0) - (a.lastActive || 0)
      );
      setUsers(list);
      setLoadingUsers(false);
    });
    return () => unsub();
  }, [isAdmin]);

  // 🔄 Firebase ke SAARE users sync karo (Admin SDK se)
  const handleSync = async () => {
    if (!user) return;
    setSyncing(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/admin/sync-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(`✅ ${data.synced} users sync ho gaye!`);
    } catch (e) {
      alert("Sync failed: " + String(e));
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 max-w-md">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Ye page sirf admin ke liye hai.</p>
          <Link href="/" className="inline-block px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const now = Date.now();
  const online = users.filter((u) => now - u.lastActive < 10 * 60000).length;
  const activeToday = users.filter((u) => now - u.lastActive < 24 * 60 * 60000).length;
  const activeWeek = users.filter((u) => now - u.lastActive < 7 * 24 * 60 * 60000).length;

  const stats = [
    { label: "Total Users", value: users.length, emoji: "👥" },
    { label: "Online Now", value: online, emoji: "🟢" },
    { label: "Active Today", value: activeToday, emoji: "📅" },
    { label: "Active This Week", value: activeWeek, emoji: "📈" },
  ];

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <section className="relative py-12 md:py-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/dashboard"
            style={{ animation: "fadeUp .5s ease-out both" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          <h1
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Admin <span className="text-teal-600 dark:text-teal-400">Panel</span>
          </h1>
          <p
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }}
            className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg"
          >
            Live user analytics — data real-time update hota hai.
          </p>

          {/* 🔄 SYNC BUTTON */}
          <div style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.3s" }}>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? "Syncing..." : "🔄 Sync Firebase Users"}
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-10 md:py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="h-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 h-full hover:border-teal-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <p className="text-2xl mb-2">{s.emoji}</p>
                <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{loadingUsers ? "–" : s.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== USERS LIST ===== */}
      <section className="pb-16 md:pb-24 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">All Users</h2>
          </Reveal>

          {loadingUsers ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-4xl mb-3">👻</p>
              <p className="text-slate-600 dark:text-slate-400">Abhi koi user nahi hai. Upar Sync button dabao.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((u, i) => {
                const status = statusOf(u.lastActive);
                return (
                  <Reveal key={u.uid} delay={i * 60}>
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 hover:border-teal-500 transition-all">
                      {u.photo ? (
                        <img src={u.photo} alt="" className="w-11 h-11 rounded-full border-2 border-teal-500 shrink-0" />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                          {(u.name || "U").charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-grow">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{u.name}</p>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">{u.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${status.cls}`}>
                          {status.label}
                        </span>
                        <p className="text-xs text-slate-400 mt-1.5">{timeAgo(u.lastActive)}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} KUK Tech Notes — Admin Panel</p>
      </footer>
    </main>
  );
}