import BlockContainer from "../BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { HeroHome as HeroHomeType } from "@/sanity.types";

type Props = {
  block: HeroHomeType;
  lang?: "es" | "en";
};

//HOME /HERO PRINCIPAL

export default function HeroHome({ block, lang = "es" }: Props) {
  const tagline = lang === "en" && block.taglineEn ? block.taglineEn : block.tagline;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
        <div className="relative min-h-[500px] overflow-hidden md:min-h-[700px] h-80vh">
          {/* Background Image */}
          {block.backgroundImage?.asset?._ref && (
            <Image
              src={urlForImage(block.backgroundImage)?.url() || ""}
              alt={block.backgroundImage.alt || "Image"}
              fill
              className="object-cover object-center"
              priority
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute heroindex-overlay" />

          {/* Content */}
          <div className="heroindex-content">
            {tagline && (
              <p className="mb-8 text-sm font-medium text-white lg:text-base text-center reveal">
                {tagline}
              </p>
            )}
            {heading && (
              <h1 className="max-w-2xl font-display text-5xl uppercase text-white md:text-6xl lg:text-7xl text-center reveal">
                {heading.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < heading.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
