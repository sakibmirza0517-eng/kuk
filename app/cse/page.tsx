import Link from "next/link";

export default function CSEPage() {
  const yearsData = [
    {
      id: "first-year",
      name: "First Year",
      comingSoon: false,
    },
    {
      id: "second-year",
      name: "Second Year",
      comingSoon: true,
    },
    {
      id: "third-year",
      name: "Third Year",
      comingSoon: true,
    },
    {
      id: "fourth-year",
      name: "Fourth Year",
      comingSoon: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm mb-4 hover:underline opacity-90 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Computer Science & Engineering</h1>
          <p className="text-teal-100 mt-2 text-lg">Select Your Year</p>
        </div>
      </section>

      {/* Years Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {yearsData.map((year) => (
              <div key={year.id} className="relative h-64">
                {year.comingSoon ? (
                  <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 opacity-70 hover:opacity-100 transition-opacity h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{year.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-slate-600">Resources for this year will be added soon.</p>
                  </div>
                ) : (
                  <Link
                    href="/first-year"
                    className="block bg-white p-8 rounded-2xl border-2 border-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 hover:text-teal-700 transition-colors">
                        {year.name}
                      </h3>
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-slate-600 mb-4">Semester 1 & Semester 2 resources available</p>
                    <span className="inline-flex items-center text-teal-600 font-semibold">
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} KUK Tech Notes</p>
      </footer>
    </main>
  );
}