"use client";

import { createContext, useContext, useMemo, useState } from "react";

type CategoryFilterContextValue = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const CategoryFilterContext = createContext<CategoryFilterContextValue | null>(
  null
);

export function CategoryFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const value = useMemo(
    () => ({ selectedCategory, setSelectedCategory }),
    [selectedCategory]
  );

  return (
    <CategoryFilterContext.Provider value={value}>
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error(
      "useCategoryFilter debe usarse dentro de CategoryFilterProvider"
    );
  }
  return context;
}
