"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/80 px-4 py-3 text-sm text-slate-200 transition focus-within:border-primary/70">
      <span className="text-slate-400">Buscar</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nombre del profesional"
        className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-full border border-slate-600/80 px-2 py-1 text-xs text-slate-200 transition hover:border-primary/60"
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      ) : null}
    </label>
  );
}
