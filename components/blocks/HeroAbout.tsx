"use client";
import BlockContainer from "../BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { HeroAbout as HeroAboutType } from "@/sanity.types";

type Props = {
  block: HeroAboutType;
  lang?: "es" | "en";
};

//unknown

export default function HeroAbout({ block, lang = "es" }: Props) {
  const tagline = lang === "en" && block.taglineEn ? block.taglineEn : block.tagline;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const introText = lang === "en" && block.introTextEn ? block.introTextEn : block.introText;

  return (
    <section className="w-full hero section bg-muted">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-12 md:px-8 md:py-12 pb-0">
        
          {/* Text Content */}
          <div className="flex flex-col justify-center align-center">
            {tagline && (
              <h4 className="text-sm reveal uppercase mb-4 text-primary font-medium lg:text-1xl">
                {tagline}
              </h4>
            )}
            {heading && (
              <h1 className="font-display text-primary mb-8 text-5xl md:text-6xl lg:text-7xl mt-4 max-w-5xl reveal">
                {heading}
              </h1>
            )}
            
          </div>

          {/* Image */}

          <div className="hero-image zoom-in mb-12">
            {block.image?.asset?._ref && (
              <div
                className="hero-image-container reveal"
                style={{
                  backgroundImage: `url(${urlForImage(block.image)?.url() || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
            <div className="dots">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="dot"
                  style={{ "--i": i + 1 } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
          
          {introText && (
          <div className="w-full text-center flex items-center justify-center intro-container py-10 mt-6 pb-0">
            <h3 className="intro text-primary text-2xl md:text-4xl max-w-3xl reveal">
              {introText}
            </h3>
          </div>
          )}

      </div>
    </section>
  );
}
