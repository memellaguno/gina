import { Quote as QuoteType } from "@/sanity.types";
import { cn } from "@/lib/utils";

type Props = {
  block: QuoteType;
  lang?: "es" | "en";
};

export default function Quote({ block, lang = "es" }: Props) {
  const text = lang === "en" && block.quoteTextEn ? block.quoteTextEn : block.quoteText;
  const attribution =
    lang === "en" && block.attributionEn ? block.attributionEn : block.attribution;

  if (!text) return null;

  return (
    <section className="w-full bg-muted py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <blockquote className="flex flex-col items-center text-center">
          <p className="max-w-4xl font-display text-3xl text-secondary md:text-4xl lg:text-5xl">
            &ldquo;{text}&rdquo;
          </p>
          {attribution && (
            <footer className="mt-8 text-lg text-foreground/70 md:text-xl">
              &mdash; {attribution}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}
