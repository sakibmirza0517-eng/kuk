"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { database } from "@/lib/firebase"; // Agar file kahin aur hai toh path change karo
import { ref as dbRef, push, serverTimestamp } from "firebase/database";

// =====================================================
// 👇👇👇 SIRF YE 2 KEYS PASTE KARNI HAIN 👇👇
// =====================================================
const CLOUD_NAME = "p4546zb6";   // Cloudinary dashboard se
const UPLOAD_PRESET = "const UPLOAD_PRESET";    // Unsigned preset ka naam
// =====================================================

// EmailJS IDs (ye already working hain)
const SERVICE_ID = "service_l0qphyz";
const TEMPLATE_ID = "template_n9b3qsq";
const PUBLIC_KEY = "bopHCoZX8u_PwsfyH";

// ☁️ Cloudinary upload function
const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

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
      // 1. Files Cloudinary par upload
      const downloadLinks: string[] = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        downloadLinks.push(`${file.name} → ${url}`);
      }

      // 2. Realtime Database mein save (agar DB fail ho toh bhi email jayegi)
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
        console.error("Database save failed (email phir bhi jayegi):", dbErr);
      }

      // 3. Email bhejo (download links ke sath)
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

  return (
    <main className="min-h-screen w-full bg-slate-50 pb-16 overflow-x-hidden">
      {/* Header */}
      <section className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-10 md:py-12 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm mb-3 md:mb-4 hover:underline opacity-90 hover:opacity-100 transition-opacity font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Contact & Resource Submission</h1>
          <p className="text-teal-100 mt-2 text-base md:text-lg">
            Have notes, PYQs, or suggestions to share with Kurukshetra University students? Get in touch!
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-3 md:px-4 py-10 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You for Reaching Out!</h2>
              <p className="text-slate-600 max-w-md mx-auto mb-6">
                Your message and files have been sent successfully. We will review and update the resources soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 text-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="contact-branch" className="block text-sm font-semibold text-slate-700 mb-2">
                    Branch / Department
                  </label>
                  <select
                    id="contact-branch"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 text-sm bg-white transition-all"
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
                  <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Uploading 2nd Year Notes"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 text-sm transition-all"
                  />
                </div>
              </div>

              {/* 📁 File Upload Section */}
              <div>
                <label htmlFor="contact-files" className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Files (Notes, PYQs, Documents)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 md:p-6 text-center hover:border-teal-500 transition-colors">
                  <input
                    id="contact-files"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="contact-files" className="cursor-pointer">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-slate-600 mb-1">
                      <span className="font-semibold text-teal-600">Click to select files</span>
                    </p>
                    <p className="text-xs text-slate-500">PDF, DOC, PPT, Images (Files automatically upload hongi)</p>
                  </label>
                  {files.length > 0 && (
                    <div className="mt-3 text-left">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Selected files:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {files.map((file, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="truncate">{file.name}</span>
                            <span className="text-slate-400 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-teal-600 mt-2 font-medium">
                        ✅ Files Cloudinary par upload hongi aur download links email mein aayenge!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message / Google Drive Link
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your feedback, report missing syllabus, or add extra notes..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-800 text-sm transition-all"
                ></textarea>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 md:px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Uploading & Sending..." : "Send Message & Files"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}