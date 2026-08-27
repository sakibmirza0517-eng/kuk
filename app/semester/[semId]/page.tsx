"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Reveal from "@/components/Reveal";

// ✅ TUMHARE REAL GOOGLE DRIVE LINKS — SAME KE SAME
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

  // ✅ Redirect useEffect mein (render ke andar NAHI)
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xl text-slate-600 dark:text-slate-400">Please login to access notes...</p>
      </main>
    );
  }

  const subjects = subjectsData[semId as keyof typeof subjectsData] || subjectsData.sem1;
  const semesterName = semId === "sem1" ? "Semester 1" : "Semester 2";

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <section className="relative py-12 md:py-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/first-year"
            style={{ animation: "fadeUp .5s ease-out both" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to First Year
          </Link>

          <h1
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {semesterName} <span className="text-teal-600 dark:text-teal-400">Subjects</span>
          </h1>
          <p
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }}
            className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg"
          >
            Select a subject to download resources • Logged in as {user.displayName || user.email}
          </p>
        </div>
      </section>

      {/* ===== SUBJECTS GRID ===== */}
      <section className="py-12 md:py-20 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <Reveal key={subject.id} delay={i * 100} className="h-full">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full flex flex-col hover:border-teal-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-bold mb-3">
                    {subject.code}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">{subject.name}</h3>

                  <div className="mt-auto space-y-2.5">
                    <a
                      href={subject.links.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    >
                      <span>📝 Handwritten Notes</span>
                      <span>↗</span>
                    </a>
                    <a
                      href={subject.links.syllabus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    >
                      <span>📋 Syllabus Copy</span>
                      <span>↗</span>
                    </a>
                    <a
                      href={subject.links.pyqs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    >
                      <span>📄 Previous Year Papers</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
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