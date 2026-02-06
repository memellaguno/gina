"use client";

import { categories } from "@/lib/categories";

type CategoryFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  lang?: "es" | "en";
  posts: { category: string }[];
};

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
  lang = "es",
  posts,
}: CategoryFilterProps) {
  const usedCategories = new Set(posts.map((p) => p.category));

  const visibleCategories = categories.filter(
    (cat) => cat.value === "all" || usedCategories.has(cat.value)
  );

  return (
    <div className="filters w-full">
      {visibleCategories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onFilterChange(cat.value)}
          className={`lg:text-1xl ${activeFilter === cat.value ? "active" : ""}`}
        >
          {lang === "en" ? cat.labelEn : cat.labelEs}
        </button>
      ))}
    </div>
  );
}
