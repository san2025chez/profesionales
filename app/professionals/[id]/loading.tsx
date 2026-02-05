export default function LoadingProfessional() {
  return (
    <main className="min-h-screen bg-base px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="h-6 w-40 rounded-full bg-slate-800/80 animate-pulse" />
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="h-40 w-40 rounded-3xl bg-slate-800/80 animate-pulse" />
            <div className="flex-1 space-y-4">
              <div className="h-4 w-40 rounded-full bg-slate-800/80 animate-pulse" />
              <div className="h-7 w-64 rounded-full bg-slate-800/80 animate-pulse" />
              <div className="h-20 rounded-2xl bg-slate-800/80 animate-pulse" />
              <div className="h-9 w-32 rounded-full bg-slate-800/80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
