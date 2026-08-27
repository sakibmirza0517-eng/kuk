import Link from "next/link";

const branchesData = [
  { id: "cse", name: "CSE", fullName: "Computer Science & Engineering", comingSoon: false },
  { id: "mechanical", name: "ME", fullName: "Mechanical Engineering", comingSoon: false },
  { id: "electrical", name: "EE", fullName: "Electrical Engineering", comingSoon: false },
  { id: "civil", name: "CE", fullName: "Civil Engineering", comingSoon: false },
  { id: "electronics", name: "ECE", fullName: "Electronics & Communication", comingSoon: false },
];

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col overflow-x-hidden">
      <section className="w-full bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 dark:from-teal-700 dark:via-teal-800 dark:to-slate-950 text-white py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-3">KUK Tech Notes</h1>
          <p className="text-base md:text-xl text-teal-100 max-w-2xl mx-auto">Kurukshetra University B.Tech Study Resources</p>
        </div>
      </section>

      <section className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 md:py-6 px-3 md:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-r from-teal-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-teal-200 dark:border-teal-900 rounded-2xl px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-teal-500 to-teal-700"></div>
            <div className="bg-teal-600 p-2.5 md:p-3 rounded-xl shadow-md shadow-teal-600/30 shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-grow">
              <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm md:text-lg">
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 px-1.5 py-0.5 rounded-md">New materials</span>{" "}and{" "}
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 px-1.5 py-0.5 rounded-md">exciting features</span>{" "}are coming soon!
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1.5">We are working hard to upload notes, PYQs, and resources for all branches. Stay tuned!</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-xs font-bold tracking-wide rounded-full shrink-0 shadow-md shadow-teal-600/30">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              COMING SOON
            </span>
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-16 px-3 md:px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8 md:mb-12">Select Your Branch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {branchesData.map((branch) => (
              <div key={branch.id} className="relative">
                {branch.comingSoon ? (
                  <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{branch.name}</h3>
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-xs font-semibold rounded-full">Coming Soon</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{branch.fullName}</p>
                  </div>
                ) : (
                  <Link href={`/${branch.id}`} className="block bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border-2 border-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 transition-colors">{branch.name}</h3>
                      <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow">{branch.fullName}</p>
                    <span className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      View Years
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
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} KUK Tech Notes. Built for Kurukshetra University Students.</p>
      </footer>
    </main>
  );
}