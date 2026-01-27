"use client";

type CategoryFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  lang?: "es" | "en";
};

const categories = [
  { value: "all", labelEs: "TODOS", labelEn: "ALL" },
  { value: "tips", labelEs: "TIPS", labelEn: "TIPS" },
  { value: "insights", labelEs: "INSIGHTS", labelEn: "INSIGHTS" },
  { value: "reflections", labelEs: "REFLEXIONES", labelEn: "REFLECTIONS" },
  { value: "talks", labelEs: "CHARLAS", labelEn: "TALKS" },
  { value: "news", labelEs: "NOTICIAS", labelEn: "NEWS" },
];

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
  lang = "es",
}: CategoryFilterProps) {
  return (
    <div className="filters flex flex-wrap gap-4 border-b border-gray-200 pb-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onFilterChange(cat.value)}
          className={`text-sm font-medium uppercase transition-colors lg:text-base ${
            activeFilter === cat.value
              ? "text-secondary border-b-2 border-secondary"
              : "text-gray-500 hover:text-secondary"
          }`}
        >
          {lang === "en" ? cat.labelEn : cat.labelEs}
        </button>
      ))}
    </div>
  );
}
