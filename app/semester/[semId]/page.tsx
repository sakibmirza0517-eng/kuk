"use client";

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

  if (!loading && !user) {
    router.push("/login");
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-600">Please login to access notes...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-600">Checking login...</p>
      </div>
    );
  }

  const subjects = subjectsData[semId as keyof typeof subjectsData];
  const semesterName = semId === "sem1" ? "Semester 1" : "Semester 2";

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Link href="/first-year" className="inline-flex items-center text-sm mb-4 hover:underline opacity-90 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to First Year
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">{semesterName} Subjects</h1>
          <p className="text-teal-100 mt-2 text-lg">Select a subject to download resources</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-72"
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 mb-3">
                  {subject.code}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {subject.name}
                </h2>
              </div>

              <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                <a
                  href={subject.links.notes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all"
                >
                  <span>📝 Handwritten Notes</span>
                  <span className="text-slate-400">↗</span>
                </a>
                <a
                  href={subject.links.syllabus}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all"
                >
                  <span>📋 Syllabus Copy</span>
                  <span className="text-slate-400">↗</span>
                </a>
                <a
                  href={subject.links.pyqs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all"
                >
                  <span>📄 Previous Year Papers</span>
                  <span className="text-slate-400">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}