"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { database } from "@/lib/firebase";
import { ref as dbRef, push, serverTimestamp } from "firebase/database";

// 👇👇 APNI KEYS DOBARA PASTE KARO 👇👇
const CLOUD_NAME = "p4546zb6";
const UPLOAD_PRESET = "UPLOAD_PRESET";

const SERVICE_ID = "service_l0qphyz";
const TEMPLATE_ID = "template_n9b3qsq";
const PUBLIC_KEY = "bopHCoZX8u_PwsfyH";

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "CSE",
    subject: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const downloadLinks: string[] = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        downloadLinks.push(`${file.name} → ${url}`);
      }

      try {
        await push(dbRef(database, "submissions"), {
          name: formData.name,
          email: formData.email,
          branch: formData.branch,
          subject: formData.subject,
          message: formData.message,
          fileLinks: downloadLinks,
          timestamp: serverTimestamp(),
        });
      } catch (dbErr) {
        console.error("Database save failed:", dbErr);
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          branch: formData.branch,
          subject: formData.subject,
          message: formData.message,
          file_names: files.length ? files.map((f) => f.name).join(", ") : "No files",
          file_links: downloadLinks.length ? downloadLinks.join("\n") : "No files uploaded",
        },
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", branch: "CSE", subject: "", message: "" });
      setFiles([]);
    } catch (err) {
      console.error("Error:", err);
      setError("Kuch galat ho gaya. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 dark:text-white text-sm transition-all";

  return (
    <main className="min-h-screen w-full bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <section className="relative py-12 md:py-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            style={{ animation: "fadeUp .5s ease-out both" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <h1
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.1s" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Contact & <span className="text-teal-600 dark:text-teal-400">Resource Submission</span>
          </h1>
          <p
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.2s" }}
            className="text-slate-600 dark:text-slate-400 mt-3 text-base md:text-lg"
          >
            Notes, PYQs ya suggestions share karo — KUK students ki madad karo.
          </p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="py-12 md:py-16 px-4 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div
            style={{ animation: "fadeUp .6s ease-out both", animationDelay: "0.3s" }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                  Your message and files have been sent successfully. We will review and update the resources soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="contact-branch" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Branch / Department
                    </label>
                    <select
                      id="contact-branch"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className={inputClass}
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="ME">Mechanical Engineering (ME)</option>
                      <option value="EE">Electrical Engineering (EE)</option>
                      <option value="CE">Civil Engineering (CE)</option>
                      <option value="ECE">Electronics & Communication (ECE)</option>
                      <option value="Other">Other / General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Subject / Topic
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Uploading 2nd Year Notes"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="contact-files" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Select Files (Notes, PYQs, Documents)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      id="contact-files"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="contact-files" className="cursor-pointer">
                      <svg className="w-10 h-10 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">Click to select files</span>
                      </p>
                      <p className="text-xs text-slate-500">PDF, DOC, PPT, Images (auto-upload hongi)</p>
                    </label>
                    {files.length > 0 && (
                      <div className="mt-3 text-left">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Selected files:</p>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {files.map((file, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-teal-600 dark:text-teal-400">📄</span>
                              <span className="truncate">{file.name}</span>
                              <span className="text-slate-400 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message / Google Drive Link
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your feedback, report missing syllabus, or add extra notes..."
                    className={inputClass}
                  ></textarea>
                </div>

                {error && (
                  <div className="p-3 md:p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Uploading & Sending..." : "Send Message & Files"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} KUK Tech Notes — built by Sakib
        </p>
      </footer>
    </main>
  );
}