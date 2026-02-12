import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostsGrid from "@/components/blog/PostsGrid";

export const metadata: Metadata = {
  title: "Perspectivas | Gina Diez Barroso",
  description: "Conversaciones que inspiran.",
};

export default async function PerspectivasPage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <>
      <Header headerTheme="light" lang="es" />

      <main>
        <section className="w-full hero section">
          <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 pb-0 herochild">
            <h1 className="font-display mb-8 text-primary text-5xl md:text-6xl lg:text-7xl mt-4 max-w-3xl uppercase">
              Conversaciones<br /> que inspiran.
            </h1>
          </div>
        </section>

        <PostsGrid posts={posts || []} lang="es" />
      </main>

      <Footer lang="es" />
    </>
  );
}
