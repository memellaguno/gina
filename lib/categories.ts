export const categories = [
  { value: "all", labelEs: "TODOS", labelEn: "ALL" },
  { value: "tips", labelEs: "TIPS", labelEn: "TIPS" },
  { value: "insights", labelEs: "INSIGHTS", labelEn: "INSIGHTS" },
  { value: "reflections", labelEs: "REFLEXIONES", labelEn: "REFLECTIONS" },
  { value: "talks", labelEs: "CHARLAS", labelEn: "TALKS" },
  { value: "news", labelEs: "NOTICIAS", labelEn: "NEWS" },
];

export function getCategoryLabel(
  category: string,
  lang: "es" | "en" = "es"
): string {
  const cat = categories.find((c) => c.value === category);
  if (!cat) return category?.toUpperCase() ?? "";
  return lang === "en" ? cat.labelEn : cat.labelEs;
}
