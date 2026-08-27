"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useAuth } from "@/context/AuthContext";

// ✅ REAL GOOGLE DRIVE LINKS - SAB DAAL DIYE
const subjectsData = {
  sem1: [
    {
      id: "english",
      name: "English",
      code: "ENG101",
      links: {
        notes: "https://drive.google.com/drive/folders/1Wbe1lwulzcD-lD1izqkZ24RrLulsgYeV",
        syllabus: "https://drive.google.com/file/d/1Am_VuPxIBb0sSKOBjM8gko88fHrcVJhM/view?usp=drivesdk",
        pyqs: "https://drive.google.com/drive/folders/1q-4SRtcJ1-Ty0LUae_JLcbzIMhlVyuVd",
      },
    },
    {
      id: "math1",
      name: "Math-1",
      code: "MAS101",
      links: {
        notes: "https://drive.google.com/drive/folders/1xjRIU_iT0Decq5a9S2vSc9hEiRl2Ck8B",
        syllabus: "https://drive.google.com/file/d/1Am_VuPxIBb0sSKOBjM8gko88fHrcVJhM/view?usp=drivesdk",
        pyqs: "https://drive.google.com/drive/folders/1Qd7i4-xDx_UYxthzzjm1_A4CQ11OnW2S",
      },
    },
    {
      id: "pps",
      name: "PPS",
      code: "CSE101",
      links: {
        notes: "https://drive.google.com/drive/folders/1lLK3sfUHxdBahSZzJSg3SvdP9zBxGEIN",
        syllabus: "https://drive.google.com/file/d/1Am_VuPxIBb0sSKOBjM8gko88fHrcVJhM/view?usp=drivesdk",
        pyqs: "https://drive.google.com/drive/folders/10f_HKBxWWWTTyu8gfHfubs8XUXCekVP9",
      },
    },
    {
      id: "sp",
      name: "SP",
      code: "SP101",
      links: {
        notes: "https://drive.google.com/drive/folders/1X210lKdabFc0t1HIQtbOv6ob1FHq-dOa",
        syllabus: "https://drive.google.com/file/d/1Am_VuPxIBb0sSKOBjM8gko88fHrcVJhM/view?usp=drivesdk",
        pyqs: "https://drive.google.com/drive/folders/1PkaYKaigaZGj5dFW_H2BDLR2r5Z2Ldby",
      },
    },
    {
      id: "uhv",
      name: "UHV",
      code: "HUM101",
      links: {
        notes: "https://drive.google.com/drive/folders/1s6Z88O34SlQChMC0sLp37rrWuYMVtR6L",
        syllabus: "https://drive.google.com/file/d/1Am_VuPxIBb0sSKOBjM8gko88fHrcVJhM/view?usp=drivesdk",
        pyqs: "https://drive.google.com/drive/folders/1A3IRocm5vyqhUsZQbuR1pP_NEuoxSKHR",
      },
    },
  ],
  sem2: [
    {
      id: "beee",
      name: "BEEE",
      code: "BEE101",
      links: {
        notes: "https://drive.google.com/drive/folders/1Kly87zCI3sxywxT7JPN1Su1G6e6iXhfl",
        syllabus: "https://drive.google.com/drive/folders/1fUWXAg7RHEzgD8cLaLiqIfFe9mz6erx5",
        pyqs: "https://drive.google.com/drive/folders/184fALIzMKKVHL_K04hYuDPh8PQX0CCpM",
      },
    },
    {
      id: "biology",
      name: "Biology",
      code: "BIO101",
      links: {
        notes: "https://drive.google.com/drive/folders/16thyRRpKSbbR-DXa_zWACg33NCpORTez",
        syllabus: "https://drive.google.com/drive/folders/1fUWXAg7RHEzgD8cLaLiqIfFe9mz6erx5",
        pyqs: "https://drive.google.com/drive/folders/1oX2yk__MeeHqqE9XK5c8l7pRjZwe8-gq",
      },
    },
    {
      id: "chemistry",
      name: "Chemistry",
      code: "CHE101",
      links: {
        notes: "https://drive.google.com/drive/folders/1vICRbS04j1fv6W75oLGULDLcSQF40FSK",
        syllabus: "https://drive.google.com/drive/folders/1fUWXAg7RHEzgD8cLaLiqIfFe9mz6erx5",
        pyqs: "https://drive.google.com/drive/folders/10__FtaeVh68eFekHy90AM09q8sv_pkkJ",
      },
    },
    {
      id: "egd",
      name: "EGD",
      code: "MEC101",
      links: {
        notes: "https://drive.google.com/drive/folders/1pDIVQn14NXMPJ5YSONGJuBvb4U97yx1o",
        syllabus: "https://drive.google.com/drive/folders/1fUWXAg7RHEzgD8cLaLiqIfFe9mz6erx5",
        pyqs: "https://drive.google.com/drive/folders/14KZj_y4cd_VI0qRQKxZN13EtjrDBsDKh",
      },
    },
    {
      id: "math2",
      name: "Math-2",
      code: "MAS201",
      links: {
        notes: "https://drive.google.com/drive/folders/1WsE71XPQgBgkkWUrrwmbE3fXay_ANrJF",
        syllabus: "https://drive.google.com/drive/folders/1fUWXAg7RHEzgD8cLaLiqIfFe9mz6erx5",
        pyqs: "https://drive.google.com/drive/folders/1TxRZdPm-59yn4b16Yxel8FiRMiEa71Ph",
      },
    },
  ],
};

export default function SemesterPage({ params }: { params: Promise<{ semId: string }> }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { semId } = use(params);

  // ✅ FIX: Redirect ab useEffect mein (render ke andar NAHI)
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Not logged in (useEffect will redirect)
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-xl text-slate-600 dark:text-slate-400">Please login to access notes...</p>
      </main>
    );
  }

  const subjects = subjectsData[semId as keyof typeof subjectsData];
  const semesterName = semId === "sem1" ? "Semester 1" : "Semester 2";

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 pb-16 overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-900 text-white py-10 md:py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Link href="/first-year" className="inline-flex items-center text-sm mb-3 md:mb-4 hover:underline opacity-90 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to First Year
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">{semesterName} Subjects</h1>
          <p className="text-teal-100 mt-2 text-base md:text-lg">Select a subject to download resources</p>
        </div>
      </header>

      {/* Subjects Grid */}
      <section className="max-w-6xl mx-auto px-3 md:px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex flex-col"
            >
              <div className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 mb-3">
                  {subject.code}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {subject.name}
                </h2>
              </div>

              <div className="mt-auto space-y-2.5 md:space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={subject.links.notes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-400 transition-all"
                >
                  <span>📝 Handwritten Notes</span>
                  <span className="text-slate-400 dark:text-slate-500">↗</span>
                </a>
                <a
                  href={subject.links.syllabus}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-400 transition-all"
                >
                  <span>📋 Syllabus Copy</span>
                  <span className="text-slate-400 dark:text-slate-500">↗</span>
                </a>
                <a
                  href={subject.links.pyqs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-400 transition-all"
                >
                  <span>📄 Previous Year Papers</span>
                  <span className="text-slate-400 dark:text-slate-500">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 dark:bg-black text-slate-400 py-6 md:py-8 px-4 text-center">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} KUK Tech Notes</p>
      </footer>
    </main>
  );
}