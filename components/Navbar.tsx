"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const branches = [
  { id: "cse", name: "CSE" },
  { id: "mechanical", name: "ME" },
  { id: "electrical", name: "EE" },
  { id: "civil", name: "CE" },
  { id: "electronics", name: "ECE" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logOut();
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b transition-all duration-300 ${
        scrolled ? "border-slate-200 dark:border-slate-800 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">KUK Tech Notes</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>

          <div className="relative">
            <button onClick={() => setBranchesOpen(!branchesOpen)} className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Branches
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {branchesOpen && (
              <div className="absolute left-0 mt-3 w-44 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                {branches.map((b) => (
                  <Link key={b.id} href={`/${b.id}`} onClick={() => setBranchesOpen(false)} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>

          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Dashboard</Link>
              {user.photoURL && <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-teal-500" />}
              <button onClick={handleLogout} className="px-4 py-2 rounded-full border-2 border-slate-900 dark:border-white text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all cursor-pointer">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:-translate-y-0.5">
              Get Started
            </Link>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" className="text-slate-700 dark:text-slate-300 cursor-pointer">
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block font-medium text-slate-700 dark:text-slate-300">Home</Link>
          <div className="grid grid-cols-2 gap-2">
            {branches.map((b) => (
              <Link key={b.id} href={`/${b.id}`} onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 text-center">
                {b.name}
              </Link>
            ))}
          </div>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block font-medium text-slate-700 dark:text-slate-300">Contact</Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-full bg-teal-600 text-white font-semibold">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-center px-4 py-2.5 rounded-full border-2 border-slate-900 dark:border-white font-semibold text-slate-900 dark:text-white cursor-pointer">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold">Get Started</Link>
          )}
        </nav>
      )}
    </header>
  );
}