"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";

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
  const excerpt = lang === "en" && post.excerptEn ? post.excerptEn : post.excerpt;
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
      className={`blog-card group block ${isLarge ? "large" : ""}`}
    >
      <div className="blog-image relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || "Image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="blog-info py-4">
        <span className="text-sm text-gray-600 lg:text-base">
          <b className="text-secondary">{post.category?.toUpperCase()}</b>
          {formattedDate && <span className="ml-4">{formattedDate}</span>}
        </span>
        <p className="mt-2 font-display text-lg text-secondary md:text-xl lg:text-2xl line-clamp-3">
          {title}
        </p>
      </div>
    </Link>
  );
}
