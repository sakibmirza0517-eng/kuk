import Link from "next/link";

const branchesData = [
  {
    id: "cse",
    name: "CSE",
    fullName: "Computer Science & Engineering",
    comingSoon: false,
  },
  {
    id: "mechanical",
    name: "ME",
    fullName: "Mechanical Engineering",
    comingSoon: true,
  },
  {
    id: "electrical",
    name: "EE",
    fullName: "Electrical Engineering",
    comingSoon: true,
  },
  {
    id: "civil",
    name: "CE",
    fullName: "Civil Engineering",
    comingSoon: true,
  },
  {
    id: "electronics",
    name: "ECE",
    fullName: "Electronics & Communication",
    comingSoon: true,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            KUK Tech Notes
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
            Kurukshetra University B.Tech Study Resources
          </p>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
            Select Your Branch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {branchesData.map((branch) => (
              <div key={branch.id} className="relative h-64"> {/* Fixed height: h-64 (256px) */}
                {branch.comingSoon ? (
                  <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 opacity-70 hover:opacity-100 transition-opacity h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{branch.name}</h3>
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 flex-grow">{branch.fullName}</p>
                  </div>
                ) : (
                  <Link
                    href={`/${branch.id}`}
                    className="block bg-white p-6 rounded-2xl border-2 border-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 hover:text-teal-700 transition-colors">
                        {branch.name}
                      </h3>
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 flex-grow">{branch.fullName}</p>
                    <span className="inline-flex items-center text-teal-600 font-semibold text-sm">
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} KUK Tech Notes. Built for Kurukshetra University Students.</p>
      </footer>
    </main>
  );
}