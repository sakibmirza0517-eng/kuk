"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Reveal from "@/components/Reveal";

export default function DashboardPage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xl text-slate-600 dark:text-slate-400">Please login to access dashboard...</p>
      </main>
    );
  }

  const quickLinks = [
    { href: "/semester/sem1", title: "Semester 1", desc: "English, Math-1, PPS, SP, UHV", emoji: "📚" },
    { href: "/semester/sem2", title: "Semester 2", desc: "BEEE, Biology, Chemistry, EGD, Math-2", emoji: "📖" },
    { href: "/cse", title: "CSE Branch", desc: "All years & semesters explore karo", emoji: "💻" },
    { href: "/contact", title: "Share Resources", desc: "Notes ya PYQs contribute karo", emoji: "🤝" },
  ];

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <section className="relative py-12 md:py-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span
              style={{ animation: "fadeUp .5s ease-out both" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-xs md:text-sm font-medium text-teal-700 dark:text-teal-300 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Student Dashboard
            </span>
            <h1
              style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Welcome back, <span className="text-teal-600 dark:text-teal-400">{user.displayName?.split(" ")[0] || "Student"}</span>
            </h1>
            <p
              style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }}
              className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg"
            >
              Apni study resources ek click par.
            </p>
          </div>

          {/* Profile Card */}
          <div style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.3s" }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 shadow-sm w-full md:w-auto">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full border-2 border-teal-500" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                {(user.displayName || "S").charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-slate-900 dark:text-white truncate">{user.displayName || "Student"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 md:ml-4 px-4 py-2 rounded-full border-2 border-slate-900 dark:border-white text-sm font-semibold text-slate-900 dark:text-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-all cursor-pointer shrink-0"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* ===== QUICK LINKS ===== */}
      <section className="py-12 md:py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">Quick Access</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((item, i) => (
              <Reveal key={item.href} delay={i * 100} className="h-full">
                <Link
                  href={item.href}
                  className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full hover:border-teal-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="text-3xl mb-4">{item.emoji}</p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all">
                    Open
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} KUK Tech Notes — built by Sakib
        </p>
      </footer>
    </main>
  );
}