"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
      busyRef.current = false;
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex items-center justify-center px-4 py-12 overflow-x-hidden">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div style={{ animation: "fadeUp .5s ease-out both" }} className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-teal-600 flex items-center justify-center shadow-md">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }} className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to <span className="text-teal-600 dark:text-teal-400">KUK Tech Notes</span>
          </h1>
          <p style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }} className="text-slate-600 dark:text-slate-400 mt-2">
            Login to access your study resources
          </p>
        </div>

        <div style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.3s" }} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={handleGoogleSignIn}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full py-3 font-semibold text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {busy ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>By signing in, you agree to our Terms & Conditions</p>
          </div>
        </div>

        <p style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.4s" }} className="text-center mt-6">
          <Link href="/" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
}