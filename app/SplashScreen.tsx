"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.25),_transparent_35%)]" />

      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/30">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 010 5.656l-2.828 2.828a4 4 0 01-5.656-5.656l1.414-1.414m4.242-4.242l1.414-1.414a4 4 0 015.656 5.656l-2.828 2.828a4 4 0 01-5.656 0z"
            />
          </svg>

        </div>

        {/* Name */}
        <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-white">
          URL{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Shorty
          </span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Shorten your links. Share them anywhere.
        </p>

        {/* Loading */}
        <div className="mt-7 flex items-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />
        </div>

      </div>
    </div>
  );
}