import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { Publishing as PublishingType } from "@/sanity.types";
import Link from "next/link";

type Props = {
  block: PublishingType;
  lang?: "es" | "en";
};

//unknown

export default function Publishing({ block, lang = "es" }: Props) {
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const description =
    lang === "en" && block.descriptionEn ? block.descriptionEn : block.description;
  const books = block.books || [];

  if (!books.length) return null;

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        {heading && (
          <h2 className="mb-4 text-center font-display text-3xl uppercase text-secondary md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mb-12 text-center text-lg text-foreground/70 md:text-xl">
            {description}
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => {
            const title =
              lang === "en" && book.titleEn ? book.titleEn : book.title;
            const subtitle =
              lang === "en" && book.subtitleEn ? book.subtitleEn : book.subtitle;
            const publisher =
              lang === "en" && book.publisherEn ? book.publisherEn : book.publisher;

            return (
              <div
                key={book._key}
                className="flex flex-col items-center text-center"
              >
                {book.coverImage?.asset?._ref && (
                  <div className="relative mb-6 aspect-[2/3] w-48 overflow-hidden shadow-lg md:w-56">
                    <Image
                      src={urlForImage(book.coverImage)?.url() || ""}
                      alt={book.coverImage.alt || title || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {title && (
                  <h3 className="mb-2 text-xl font-medium text-secondary md:text-2xl">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mb-2 text-base text-foreground/70">{subtitle}</p>
                )}
                {publisher && (
                  <p className="mb-2 text-sm text-foreground/60">{publisher}</p>
                )}
                {book.year && (
                  <p className="mb-4 text-sm text-foreground/60">{book.year}</p>
                )}
                {book.link && (
                  <Link
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto border border-secondary px-6 py-2 text-sm font-medium uppercase text-secondary transition-colors hover:bg-secondary hover:text-white"
                  >
                    {lang === "en" ? "Learn More" : "Más información"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
