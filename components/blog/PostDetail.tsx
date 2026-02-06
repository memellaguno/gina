import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import { format, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { getCategoryLabel } from "@/lib/categories";
import CustomPortableText from "@/components/PortableText";
import { CtaBanner as CtaBannerType } from "@/sanity.types";
import CtaBanner from "@/components/blocks/CtaBanner";

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
  homeCta?: CtaBannerType;
  lang?: "es" | "en";
};

export default function PostDetail({ post, homeCta, lang = "es" }: PostDetailProps) {
  const title = lang === "en" && post.titleEn ? post.titleEn : post.title;
  const content = lang === "en" && post.contentEn ? post.contentEn : post.content;
  const backLink = lang === "en" ? "/en/perspectives" : "/perspectivas";
  const backText = lang === "en" ? "Back to Perspectives" : "Volver a Perspectivas";
  const dateLocale = lang === "en" ? enUS : es;

  const formattedDate = post.date
    ? format(parseISO(post.date), "MMM d, yyyy", { locale: dateLocale }).toUpperCase()
    : "";

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(900).url()
    : null;

  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`.toUpperCase()
    : "";

  //console.log("CTA STYLE:", JSON.stringify(homeCta, null, 2));
  //console.log("CTA DATA:", homeCta); 

  return (
    <section className="w-full section">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 herochild">
        <div className="entry-real">
          
          {/* Header: Category + Title (centered) */}
          <div className="entry-header flex flex-col justify-center items-center">
            <span className="entry-category lg:text-1xl">
              {getCategoryLabel(post.category, lang)}
            </span>
            <h1 className="entry-title font-display text-primary text-3xl md:text-4xl lg:text-4xl uppercase">
              {title}
            </h1>
          </div>

          {/* Hero Image (wider than container) */}
          {imageUrl && (
            <div className="entry-hero">
              <Image
                src={imageUrl}
                alt={post.coverImage?.alt || "Image"}
                width={1600}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Author & Date */}
          <div className="entry-meta">
            {post.author && (
              <p className="author text-primary lg:text-1xl">{authorName}</p>
            )}
            {formattedDate && <p className="date lg:text-1xl">{formattedDate}</p>}
          </div>

          {/* Content */}
          {content && (
            <div className="entry-content">
              <CustomPortableText value={content} />
            </div>
          )}

          {/* Back link */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
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
        </div>

        {/* CTA fijo home */}
        {homeCta && (              
          <CtaBanner block={homeCta} lang={lang} />
        )}
        
      </div>
    </section>
  );
}
