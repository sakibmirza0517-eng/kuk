import Link from "next/link";
import Reveal from "@/components/Reveal";

const branchesData = [
  { id: "cse", name: "CSE", fullName: "Computer Science & Engineering" },
  { id: "mechanical", name: "ME", fullName: "Mechanical Engineering" },
  { id: "electrical", name: "EE", fullName: "Electrical Engineering" },
  { id: "civil", name: "CE", fullName: "Civil Engineering" },
  { id: "electronics", name: "ECE", fullName: "Electronics & Communication" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span style={{ animation: "fadeUp .6s ease-out both" }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-xs md:text-sm font-medium text-teal-700 dark:text-teal-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Kurukshetra University B.Tech Resources
            </span>

            <h1 style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }} className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
              Ace Your Semesters, <span className="text-teal-600 dark:text-teal-400">Stress-Free.</span>
            </h1>

            <p style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }} className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-8 max-w-lg">
              Handwritten notes, PYQs, syllabus , etc.
            </p>

            <div style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.3s" }} className="flex flex-col sm:flex-row gap-4">
              <a href="#branches" className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 transition-all hover:-translate-y-0.5 shadow-sm">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                Share Resources
              </Link>
            </div>

            <div style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.4s" }} className="flex gap-8 md:gap-10 mt-10">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">5+</p>
                <p className="text-sm text-slate-500">Branches</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">8</p>
                <p className="text-sm text-slate-500">Semesters</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">100+</p>
                <p className="text-sm text-slate-500">Resources</p>
              </div>
            </div>
          </div>

          {/* Right: Floating illustration cards (Mobile + Desktop) */}
          <div className="relative h-64 sm:h-72 md:h-96">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 bg-teal-100 dark:bg-teal-900/40 rounded-full blur-3xl opacity-60"></div>

            <div className="absolute top-2 left-2 sm:left-4 -rotate-6">
              <div style={{ animation: "float 6s ease-in-out infinite" }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-3 sm:p-4 w-32 sm:w-40">
                <p className="text-xl sm:text-2xl mb-1">📝</p>
                <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Handwritten Notes</p>
                <p className="text-[10px] sm:text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">✓ Updated weekly</p>
              </div>
            </div>

            <div className="absolute top-10 sm:top-16 right-0 rotate-6">
              <div style={{ animation: "float 7s ease-in-out infinite", animationDelay: "1s" }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-3 sm:p-4 w-28 sm:w-36">
                <p className="text-xl sm:text-2xl mb-1">📄</p>
                <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">PYQs</p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">2019 – 2025</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -rotate-3">
              <div style={{ animation: "float 8s ease-in-out infinite", animationDelay: "0.5s" }} className="bg-slate-900 dark:bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-36 sm:w-44 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-teal-400 dark:text-teal-600">A+</p>
                <p className="text-[10px] sm:text-xs text-slate-300 dark:text-slate-600 font-medium mt-1">Result jo chahiye</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRANCHES ===== */}
      <section id="branches" className="py-16 md:py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-3">
              Select Your Branch
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12">First year is common for all branches.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {branchesData.map((branch, i) => (
              <Reveal key={branch.id} delay={i * 100} className="h-full">
                <Link
                  href={`/${branch.id}`}
                  className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                    <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{branch.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{branch.fullName}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all">
                    View Years
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

      {/* ===== WHY US ===== */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-3">
              Why KUK Tech Notes?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12">Sab kuch jo exam se pehle chahiye.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Reveal delay={0} className="h-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Handwritten Notes</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Toppers ke handwritten + printed notes, subject-wise organized.</p>
              </div>
            </Reveal>

            <Reveal delay={100} className="h-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Previous Year Papers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">PYQs with pattern analysis — exam se pehle real practice.</p>
              </div>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Updated Syllabus</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Latest KUK syllabus har semester ke liye, ek click par.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 px-4">
        <Reveal>
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Something <span className="text-teal-400">Amazing</span> coming soon !
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
              Hum notes, PYQs aur resources sab branches ke liye upload kar rahe hain. Apna contribution bhi bhejo!
            </p>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-teal-50 transition-all hover:-translate-y-0.5">
              Contribute Now
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center mt-auto">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} KUK Tech Notes - built by Sakib
        </p>
      </footer>
    </main>
  );
}