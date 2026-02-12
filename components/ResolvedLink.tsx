"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { linkResolver } from "@/sanity/lib/utils";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
  lang?: "es" | "en";
}

export default function ResolvedLink({
  link,
  children,
  className,
  lang,
}: ResolvedLinkProps) {
  const pathname = usePathname();

  // Auto-detect lang from pathname if not explicitly passed
  const resolvedLang = lang || (pathname.startsWith("/es") ? "es" : "en");
  const resolvedLink = linkResolver(link, resolvedLang);

  if (typeof resolvedLink !== "string") {
    return <>{children}</>;
  }

  const normalize = (path: string) =>
    path === "/" ? "/" : path.replace(/\/$/, "");

  const current = normalize(pathname);
  const target = normalize(resolvedLink);

  const isActive =
    target === "/"
      ? current === "/"
      : current === target || current.startsWith(`${target}/`);

  return (
    <Link
      href={resolvedLink}
      target={link?.openInNewTab ? "_blank" : undefined}
      rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
      className={cn(
        className,
        isActive && "text-primary"
      )}
    >
      {children}
    </Link>
  );
}
