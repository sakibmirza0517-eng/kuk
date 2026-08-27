"use client";

import { useState } from "react";
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
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setMobileOpen(false);
    setBranchesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400">
          KUK Tech Notes
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5">
          <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">
            Home
          </Link>

          {/* Branches Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBranchesOpen(!branchesOpen)}
              className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors cursor-pointer"
            >
              Branches
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {branchesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                {branches.map((b) => (
                  <Link
                    key={b.id}
                    href={`/${b.id}`}
                    onClick={() => setBranchesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">
            Contact
          </Link>

          <ThemeToggle />

          {/* 👇 LOGIN STATE KE HISAAB SE */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors"
              >
                Dashboard
              </Link>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  className="w-8 h-8 rounded-full border-2 border-teal-500"
                />
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              Login / Register
            </Link>
          )}
        </nav>

        {/* Mobile: Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block text-slate-700 dark:text-slate-300 font-medium hover:text-teal-600 dark:hover:text-teal-400">
            Home
          </Link>

          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Branches</p>
            <div className="grid grid-cols-2 gap-2">
              {branches.map((b) => (
                <Link
                  key={b.id}
                  href={`/${b.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-center"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-slate-700 dark:text-slate-300 font-medium hover:text-teal-600 dark:hover:text-teal-400">
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
            >
              Login / Register
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}