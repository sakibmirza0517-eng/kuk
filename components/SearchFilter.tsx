"use client";

import { useState } from "react";
import { getAllSubjects } from "../data/courses";
import Link from "next/link";

export default function SearchFilter() {
  const [query, setQuery] = useState("");
  const allSubjects = getAllSubjects();

  const filteredSubjects = query.trim() === "" ? [] : allSubjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(query.toLowerCase()) ||
      sub.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search subjects (e.g., BEEE, Math-2, Graphics)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-4 text-lg bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-teal-500 focus:ring-0 transition-colors placeholder:text-slate-400"
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {query.trim() !== "" && (
        <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden max-h-96 overflow-y-auto">
          {filteredSubjects.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {filteredSubjects.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/semester/${sub.semesterId}`}
                    className="flex items-center justify-between p-4 hover:bg-teal-50 transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-teal-700">{sub.name}</p>
                      <p className="text-sm text-slate-500">{sub.code} • {sub.semesterName}</p>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-slate-500">
              No subjects found. Try a different keyword.
            </div>
          )}
        </div>
      )}
    </div>
  );
}