export default function Loading() {
  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="h-40 rounded-3xl border border-slate-800/80 bg-slate-900/60 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-52 rounded-2xl border border-slate-800/80 bg-slate-900/60 animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
