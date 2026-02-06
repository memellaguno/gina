import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { postQuery, postPagesSlugs } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostDetail from "@/components/blog/PostDetail";
import { POST_WITH_HOME_CTA_QUERY } from "@/sanity/queries/postWithCta";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data || [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });

  return {
    title: post?.title ? `${post.title} | Perspectivas` : "Perspectivas",
    description: post?.excerpt || "",
  } satisfies Metadata;
}

/*export default async function PostPage(props: Props) {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
  });

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <Header headerTheme="light" lang="es" />
      <main>
        <PostDetail post={post} lang="es" />
      </main>
      <Footer lang="es" />
    </>
  );
}*/

export default async function PostPage(props: Props) {
  const params = await props.params;

  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
  });

  if (!post?._id) {
    return notFound();
  }

  const { data: home } = await sanityFetch({
    query: POST_WITH_HOME_CTA_QUERY,
  });

  //const post = result?.data?.post;
  const homeCta = home?.homeCta;
  return (
    <>
      <Header headerTheme="light" lang="es" />
      <main>
        <PostDetail
          post={post}
          homeCta={homeCta}
          lang="es"
        />
      </main>
      <Footer lang="es" />
    </>
  );
}
