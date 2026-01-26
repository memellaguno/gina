import BlockContainer from "../BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { HeroAbout as HeroAboutType } from "@/sanity.types";

type Props = {
  block: HeroAboutType;
  lang?: "es" | "en";
};

export default function HeroAbout({ block, lang = "es" }: Props) {
  const tagline = lang === "en" && block.taglineEn ? block.taglineEn : block.tagline;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const introText = lang === "en" && block.introTextEn ? block.introTextEn : block.introText;

  return (
    <section className="w-full bg-muted">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-12 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            {tagline && (
              <p className="mb-4 text-sm font-medium text-secondary lg:text-base">
                {tagline}
              </p>
            )}
            {heading && (
              <h1 className="mb-6 font-display text-4xl text-secondary md:text-5xl lg:text-6xl">
                {heading}
              </h1>
            )}
            {introText && (
              <p className="max-w-lg text-lg leading-relaxed text-foreground/80 md:text-xl">
                {introText}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            {block.image?.asset?._ref && (
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={urlForImage(block.image)?.url() || ""}
                  alt={block.image.alt || "Image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Decorative Dots */}
            {block.showDecorativeDots && (
              <div className="absolute -bottom-4 -right-4 grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-secondary"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
