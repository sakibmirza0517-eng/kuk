import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12 px-4 shadow-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Coming Soon!</h1>
        <p className="text-teal-100 mt-2 text-lg">We are working hard to bring you these resources.</p>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Under Construction</h2>
          <p className="text-slate-600 mb-8">
            This branch or semester is not available yet. We are currently adding notes, syllabus, and previous year papers for this section.
          </p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}