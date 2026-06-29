"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  
  const { user, logOut } = useAuth();

  const branches = [
    { id: "cse", name: "CSE" },
    { id: "mechanical", name: "ME" },
    { id: "electrical", name: "EE" },
    { id: "civil", name: "CE" },
    { id: "electronics", name: "ECE" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-bold text-teal-600">KUK Tech Notes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Home</Link>
            
            {/* Branches Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsBranchOpen(!isBranchOpen)}
                className="text-slate-700 hover:text-teal-600 font-medium transition-colors flex items-center"
              >
                Branches
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Dropdown Content */}
              {isBranchOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-200 rounded-md shadow-lg py-1">
                  {branches.map((branch) => (
                    <Link 
                      key={branch.id} 
                      href={`/${branch.id}`} 
                      onClick={() => setIsBranchOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      {branch.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="text-slate-700 hover:text-teal-600 font-medium transition-colors">Contact</Link>

            {/* Auth Buttons - Theme Matching */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-teal-500"
                    />
                  )}
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={logOut} 
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-700 hover:text-teal-600 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50">Home</Link>
            
            <div className="px-3 py-2 text-sm font-semibold text-slate-500 uppercase">Branches</div>
            {branches.map((branch) => (
              <Link 
                key={branch.id} 
                href={`/${branch.id}`} 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 pl-6 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                {branch.name}
              </Link>
            ))}

            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50">Contact Us</Link>
            
            <div className="pt-2 border-t border-slate-100 mt-2">
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700 text-center mb-2"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center px-3 py-2 mb-2">
                    {user.photoURL && (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    )}
                    <span className="text-sm font-medium text-slate-700">
                      {user.displayName}
                    </span>
                  </div>
                  <button 
                    onClick={logOut} 
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700 text-center mt-2"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}