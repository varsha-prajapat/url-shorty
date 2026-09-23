import Link from "next/link";

async function fetchUrls() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  return response.json();
}

export default async function UrlList() {
  let urls;

  try {
    urls = await fetchUrls();
    console.log("urls", urls);
  } catch (error) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">

        {/* Background glow */}
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-lg">
          <div className="rounded-3xl border border-red-400/20 bg-white/[0.07] p-8 text-center shadow-2xl backdrop-blur-2xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
              ⚠️
            </div>

            <h1 className="text-3xl font-bold text-white">
              Something went wrong
            </h1>

            <p className="mt-3 text-slate-400">
              We couldn't load your shortened URLs. Please try again.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              ← Back to URL Shorty
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.20),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.20),_transparent_35%)]" />

      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />


      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

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

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                URL{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Shorty
                </span>
              </h1>

              <p className="text-sm text-slate-400">
                Manage all your shortened links
              </p>
            </div>

          </div>


          {/* Home button */}

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white"
          >
            <span>←</span>
            Create New URL
          </Link>

        </div>


        {/* ================= MAIN CARD ================= */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur-2xl">

          {/* Card Header */}

          <div className="border-b border-white/10 px-5 py-5 sm:px-7">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-white">
                  All Shortened URLs
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your shortened links are listed below.
                </p>
              </div>

              {/* Count */}

              <div className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                {urls.urls?.length || 0}{" "}
                {urls.urls?.length === 1 ? "URL" : "URLs"}
              </div>

            </div>

          </div>


          {/* ================= TABLE ================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>
                <tr className="border-b border-white/10 bg-black/10 text-left">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    #
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Original URL
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Short URL
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>

                </tr>
              </thead>


              <tbody>

                {urls.urls && urls.urls.length > 0 ? (

                  urls.urls.map(
                    (
                      url: {
                        _id: string;
                        originalUrl: string;
                        shortUrl: string;
                      },
                      index: number
                    ) => {

                      const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`;

                      return (
                        <tr
                          key={url._id}
                          className="border-b border-white/[0.06] transition hover:bg-white/[0.04]"
                        >

                          {/* Number */}

                          <td className="px-6 py-5 text-sm text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                          </td>


                          {/* Original URL */}

                          <td className="max-w-md px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-lg">
                                🌐
                              </div>

                              <div className="min-w-0">

                                <p
                                  title={url.originalUrl}
                                  className="truncate text-sm font-medium text-slate-200"
                                >
                                  {url.originalUrl}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  Original link
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Short URL */}

                          <td className="px-6 py-5">

                            <a
                              href={url.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex max-w-[250px] items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                            >

                              <span className="truncate">
                                {shortUrl}
                              </span>

                              <span className="shrink-0 text-xs">
                                ↗
                              </span>

                            </a>

                          </td>


                          {/* Action */}

                          <td className="px-6 py-5">

                            <a
                              href={url.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:scale-[1.02]"
                            >
                              Open
                              <span>→</span>
                            </a>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  /* ================= EMPTY STATE ================= */

                  <tr>

                    <td
                      colSpan={4}
                      className="px-6 py-16 text-center"
                    >

                      <div className="mx-auto flex max-w-sm flex-col items-center">

                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl">
                          🔗
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                          No shortened URLs yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Create your first shortened URL and it will appear
                          here.
                        </p>

                        <Link
                          href="/"
                          className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                        >
                          ✨ Create Short URL
                        </Link>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* ================= FOOTER ================= */}

          <div className="border-t border-white/10 px-5 py-4 sm:px-7">

            <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">

              <span>
                URL SHORTY • Simple • Fast • Shareable
              </span>

              <Link
                href="/"
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                Shorten another URL →
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}