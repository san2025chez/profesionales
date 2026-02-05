"use client";

type CategoryFilterProps = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {["Todas", ...categories].map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-slate-700/60 bg-slate-800/60 text-slate-200 hover:border-primary/60"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
