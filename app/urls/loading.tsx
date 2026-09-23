export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

        <h2 className="text-xl font-semibold text-white">
          Loading URLs...
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Please wait while we fetch your shortened URLs.
        </p>
      </div>
    </main>
  );
}