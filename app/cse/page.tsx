import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CSEPage() {
  const yearsData = [
    { id: "first-year", name: "First Year", comingSoon: false },
    { id: "second-year", name: "Second Year", comingSoon: true },
    { id: "third-year", name: "Third Year", comingSoon: true },
    { id: "fourth-year", name: "Fourth Year", comingSoon: true },
  ];

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <section className="relative py-12 md:py-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            style={{ animation: "fadeUp .5s ease-out both" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <h1
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Computer Science <span className="text-teal-600 dark:text-teal-400">&</span> Engineering
          </h1>
          <p
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }}
            className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg"
          >
            Select Your Year — resources semester-wise organized.
          </p>
        </div>
      </section>

      {/* ===== YEARS GRID ===== */}
      <section className="py-12 md:py-20 px-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {yearsData.map((year, i) => (
              <Reveal key={year.id} delay={i * 100} className="h-full">
                {year.comingSoon ? (
                  <div className="bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-400 dark:text-slate-600">{year.name}</h3>
                      <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-500">
                      Resources for this year will be added soon.
                    </p>
                  </div>
                ) : (
                  <Link
                    href="/first-year"
                    className="group block bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{year.name}</h3>
                      <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                        <svg className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-5">
                      Semester 1 & Semester 2 resources available
                    </p>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold group-hover:bg-teal-600 group-hover:text-white transition-all">
                      View Semesters
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} KUK Tech Notes — built by Sakib.
        </p>
      </footer>
    </main>
  );
}