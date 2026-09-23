"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalurl: originalUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data.shortUrl);
        setCopied(false);
      } else {
        console.error("Failed to shorten URL");
      }
    });
  };

  const handleCopy = async () => {
    if (!shortenedUrl) return;

    try {
      await navigator.clipboard.writeText(originalUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      // Clipboard unsupported
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center px-4">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.25),_transparent_35%)]" />

      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />


      {/* ================= MAIN CARD ================= */}

      <section className="relative z-10 w-full max-w-2xl">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-2xl shadow-2xl shadow-black/50 px-5 py-6 sm:px-8 sm:py-8 md:px-10">

          {/* ================= LOGO ================= */}

          <div className="flex justify-center mb-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/20">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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

          </div>


          {/* ================= HEADING ================= */}

          <div className="text-center">

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">

              URL{" "}

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shorty
              </span>

            </h1>

            <p className="mt-2 text-base sm:text-lg font-medium text-cyan-200">
              Shorten your links. Share them anywhere.
            </p>

            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Create clean, memorable and shareable links in seconds.
            </p>

          </div>


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >

            <div className="relative flex-1">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400"
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

              <input
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-black/30 focus:ring-2 focus:ring-cyan-400/10"
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              disabled={isPending}
              className="h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:scale-[1.02] hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isPending ? (

                <span className="flex items-center justify-center gap-2">

                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Shortening...

                </span>

              ) : (

                <span className="flex items-center gap-2">
                  ✨ Shorten
                </span>

              )}

            </button>

          </form>


          {/* ================= FEATURES ================= */}

          <div className="mt-5 flex justify-center gap-5 sm:gap-8 text-xs text-slate-400">

            <span className="flex items-center gap-1.5">
              <span>⚡</span>
              Fast
            </span>

            <span className="flex items-center gap-1.5">
              <span>🔒</span>
              Simple
            </span>

            <span className="flex items-center gap-1.5">
              <span>🚀</span>
              Shareable
            </span>

          </div>


          {/* ================= RESULT ================= */}

          {shortenedUrl && (

            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="mb-1 text-xs font-medium text-emerald-300">
                    ✓ Your shortened URL is ready
                  </p>

                  <p className="truncate text-sm font-medium text-cyan-300">
                    {shortenedUrl}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${copied
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                >

                  {copied ? (
                    <>
                      ✓ Copied
                    </>
                  ) : (
                    <>
                      Copy
                    </>
                  )}

                </button>

              </div>

            </div>

          )}


          {/* ================= DIVIDER ================= */}

          <div className="my-5 h-px bg-white/10" />


          {/* ================= VIEW ALL ================= */}

          <Link
            href="/urls"
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.08] hover:text-white"
          >

            <span>
              View All Shortened URLs
            </span>

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>

          </Link>


          {/* ================= FOOTER ================= */}

          <p className="mt-4 text-center text-[11px] text-slate-500">
            Make your links shorter. Make sharing easier.
          </p>

        </div>


        {/* ================= OUTSIDE CARD ================= */}

        <p className="mt-4 text-center text-[10px] tracking-wide text-slate-600">
          URL SHORTY • SIMPLE • FAST • SECURE
        </p>

      </section>

    </main>
  );
}