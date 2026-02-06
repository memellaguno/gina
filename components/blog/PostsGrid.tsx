"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";

type Post = {
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

type PostsGridProps = {
  posts: Post[];
  lang?: "es" | "en";
};

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 3;

export default function PostsGrid({ posts, lang = "es" }: PostsGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category === activeFilter);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  const loadMoreText = lang === "en" ? "LOAD MORE" : "CARGAR MÁS";

  return (
    <>
      <section className="w-full section">
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 pb-0">
          <CategoryFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            lang={lang}
          />
        </div>
      </section>

      <section className="w-full section">
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
          <div className="blog-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                lang={lang}
                isLarge={index === 0}
              />
            ))}
          </div>

          {hasMore && (
            <div className="load-more mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="border border-secondary px-6 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-white lg:text-base"
              >
                {loadMoreText}
              </button>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              {lang === "en"
                ? "No posts found in this category."
                : "No se encontraron publicaciones en esta categoría."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
