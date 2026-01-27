"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { linkResolver } from "@/sanity/lib/utils";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  const pathname = usePathname();
  const resolvedLink = linkResolver(link);

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