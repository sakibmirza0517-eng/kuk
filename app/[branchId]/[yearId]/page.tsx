import Link from "next/link";
import { notFound } from "next/navigation";

const branchesInfo: Record<string, string> = {
  mechanical: "Mechanical Engineering",
  electrical: "Electrical Engineering",
  civil: "Civil Engineering",
  electronics: "Electronics & Communication",
};

const commonSubjects = [
  "Mathematics-I & II",
  "Engineering Physics",
  "Engineering Chemistry",
  "Programming in C",
  "Basic Electrical Engineering",
  "Engineering Mechanics",
  "Engineering Drawing",
  "Communication Skills",
];

export default async function YearPage({
  params,
}: {
  params: Promise<{ branchId: string; yearId: string }>;
}) {
  const { branchId, yearId } = await params;
  const branchName = branchesInfo[branchId];

  if (!branchName) notFound();

  const isFirstYear = yearId === "year-1";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href={`/${branchId}`} className="text-teal-200 text-sm hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 capitalize">
            {yearId.replace("-", " ")} — {branchName}
          </h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {isFirstYear ? (
            <>
              <h2 className="text-2xl font-bold text-center text-slate-800 mb-3">Common Subjects</h2>
              <p className="text-slate-500 text-center mb-10">
                First year ke subjects sab branches ke liye same hote hain.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {commonSubjects.map((sub) => (
                  <div key={sub} className="bg-white p-5 rounded-2xl border-2 border-teal-500 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
                    <div className="bg-teal-100 p-2.5 rounded-xl">
                      <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-800">{sub}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl py-16 px-6 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Abhi koi material nahi</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Is year ke notes, PYQs aur resources jald hi add kiye jayenge. Tab tak ye page khaali hai.
              </p>
              <Link
                href={`/${branchId}/year-1`}
                className="inline-block mt-6 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
              >
                1st Year (Common) Dekhein
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}