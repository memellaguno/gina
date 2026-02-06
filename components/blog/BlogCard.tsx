"use client";

import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { getCategoryLabel } from "@/lib/categories";

type BlogCardProps = {
  post: {
    _id: string;
    title: string;
    titleEn?: string;
    slug: string;
    category: string;
    excerpt?: string;
    excerptEn?: string;
    coverImage?: any;
    date?: string;
  };
  lang?: "es" | "en";
  isLarge?: boolean;
};

export default function BlogCard({ post, lang = "es", isLarge = false }: BlogCardProps) {
  const title = lang === "en" && post.titleEn ? post.titleEn : post.title;
  const basePath = lang === "en" ? "/en/perspectives" : "/perspectivas";
  const dateLocale = lang === "en" ? enUS : es;

  const formattedDate = post.date
    ? format(parseISO(post.date), "MMM d, yyyy", { locale: dateLocale }).toUpperCase()
    : "";

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(800).height(600).url()
    : null;

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className={`blog-card group ${isLarge ? "large" : ""}`}
    >
      <div
        className="blog-image"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />
      <div className="blog-info">
        <span className="lg:text-1xl">
          <b className="lg:text-1xl">{getCategoryLabel(post.category, lang)}</b>
          {formattedDate && <span>&nbsp;&nbsp;&nbsp;&nbsp;{formattedDate}</span>}
        </span>
        <p className="font-display text-primary md:text-1xl lg:text-3xl">
          {title}
        </p>
      </div>
    </Link>
  );
}
