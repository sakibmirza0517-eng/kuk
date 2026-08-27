import Link from "next/link";

export default function CSEPage() {
  const yearsData = [
    { id: "first-year", name: "First Year", comingSoon: false },
    { id: "second-year", name: "Second Year", comingSoon: true },
    { id: "third-year", name: "Third Year", comingSoon: true },
    { id: "fourth-year", name: "Fourth Year", comingSoon: true },
  ];

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      <section className="w-full bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-900 text-white py-10 md:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm mb-3 md:mb-4 hover:underline opacity-90 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">Computer Science & Engineering</h1>
          <p className="text-teal-100 mt-2 text-base md:text-lg">Select Your Year</p>
        </div>
      </section>

      <section className="w-full py-10 md:py-16 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {yearsData.map((year) => (
              <div key={year.id} className="relative">
                {year.comingSoon ? (
                  <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{year.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs font-semibold rounded-full">Coming Soon</span>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Resources for this year will be added soon.</p>
                  </div>
                ) : (
                  <Link href="/first-year" className="block bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border-2 border-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 transition-colors">{year.name}</h3>
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4">Semester 1 & Semester 2 resources available</p>
                    <span className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm md:text-base">
                      View Semesters
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full bg-slate-900 dark:bg-black text-slate-400 py-6 md:py-8 px-4 text-center">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} KUK Tech Notes</p>
      </footer>
    </main>
  );
}