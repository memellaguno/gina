import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import CustomPortableText from "@/components/PortableText";

type PostDetailProps = {
  post: {
    _id: string;
    title: string;
    titleEn?: string;
    slug: string;
    category: string;
    excerpt?: string;
    excerptEn?: string;
    coverImage?: any;
    content?: any;
    contentEn?: any;
    date?: string;
    author?: {
      firstName: string;
      lastName: string;
      picture?: any;
    };
  };
  lang?: "es" | "en";
};

export default function PostDetail({ post, lang = "es" }: PostDetailProps) {
  const title = lang === "en" && post.titleEn ? post.titleEn : post.title;
  const content = lang === "en" && post.contentEn ? post.contentEn : post.content;
  const backLink = lang === "en" ? "/en/perspectives" : "/perspectivas";
  const backText = lang === "en" ? "Back to Perspectives" : "Volver a Perspectivas";
  const dateLocale = lang === "en" ? enUS : es;

  const formattedDate = post.date
    ? format(parseISO(post.date), "MMMM d, yyyy", { locale: dateLocale })
    : "";

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(900).url()
    : null;

  return (
    <article className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-8 md:py-10">
      {/* Back link */}
      <Link
        href={backLink}
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-secondary"
      >
        <svg
          width="18"
          height="11"
          viewBox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path
            d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836"
            stroke="currentColor"
          />
        </svg>
        {backText}
      </Link>

      {/* Category and Date */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="font-bold text-secondary uppercase">
          {post.category}
        </span>
        {formattedDate && <span className="ml-4">{formattedDate}</span>}
      </div>

      {/* Title */}
      <h1 className="font-display text-secondary mb-8 text-4xl md:text-5xl lg:text-6xl max-w-4xl">
        {title}
      </h1>

      {/* Author */}
      {post.author && (
        <div className="mb-8 flex items-center gap-3">
          {post.author.picture && (
            <Image
              src={urlForImage(post.author.picture)?.width(80).height(80).url() || ""}
              alt={`${post.author.firstName} ${post.author.lastName}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-gray-600">
            {post.author.firstName} {post.author.lastName}
          </span>
        </div>
      )}

      {/* Cover Image */}
      {imageUrl && (
        <div className="relative mb-12 aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || "Image"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      {content && (
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-secondary prose-p:text-gray-700 prose-a:text-secondary">
          <CustomPortableText value={content} />
        </div>
      )}

      {/* Back link at bottom */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-secondary"
        >
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836"
              stroke="currentColor"
            />
          </svg>
          {backText}
        </Link>
      </div>
    </article>
  );
}
