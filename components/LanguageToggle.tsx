"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const routeMap: Record<string, string> = {
  "/perspectives": "/es/perspectivas",
  "/es/perspectivas": "/perspectives",
  "/videos": "/es/videos",
  "/es/videos": "/videos",
};

function getToggleHref(pathname: string, lang: "es" | "en"): string {
  // Check exact route matches first (including post/video sub-routes)
  for (const [from, to] of Object.entries(routeMap)) {
    if (pathname.startsWith(from)) {
      return to + pathname.slice(from.length);
    }
  }

  // Generic /es prefix swap
  if (lang === "es") {
    // Spanish → English: strip /es prefix
    return pathname.replace(/^\/es/, "") || "/";
  }
  // English → Spanish: add /es prefix
  return `/es${pathname}`;
}

type Props = {
  lang: "es" | "en";
  className?: string;
};

export default function LanguageToggle({ lang, className = "" }: Props) {
  const pathname = usePathname();
  const targetLang = lang === "es" ? "EN" : "ES";
  const href = getToggleHref(pathname, lang);

  return (
    <Link href={href} className={className}>
      {targetLang}
    </Link>
  );
}
