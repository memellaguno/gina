import { CtaBanner as CtaBannerType } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import { ArrowRight } from "lucide-react";
import ResolvedLink from "../ResolvedLink";

type Props = {
  block: CtaBannerType;
  lang?: "es" | "en";
};

//HOME /CTA BLUE and MAGENTA

export default function CtaBanner({ block, lang = "es" }: Props) {
  const eyebrow = lang === "en" && block.eyebrowEn ? block.eyebrowEn : block.eyebrow;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const subheading =
    lang === "en" && block.subheadingEn ? block.subheadingEn : block.subheading;
  const buttonText =
    lang === "en" && block.buttonTextEn ? block.buttonTextEn : block.buttonText;
  const attribution =
    lang === "en" && block.attributionEn ? block.attributionEn : block.attribution;

  const style = stegaClean(block.style) || "speaking";

  const styleClasses = {
    speaking: "bg-primary text-white py-24",
    newsletter: "section bg-secondary-child text-white py-8",
    quote: "bg-muted text-secondary py-24",
  };

  return (
    <section className={cn("w-full px-8", styleClasses[style as keyof typeof styleClasses])}>
      <div className="mx-auto flex w-full max-w-[1900px] flex-col items-center text-center">
        {eyebrow && style !== "quote" && (
          <p className="mb-4 text-sm font-medium uppercase lg:text-base">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="mb-4 font-display text-4xl uppercase md:text-5xl lg:text-6xl xl:text-7xl">
            {heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
        )}
        {subheading && style !== "quote" && (
          <p className="mb-8 max-w-lg text-lg md:text-xl lg:text-1xl">
            {subheading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < subheading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
        {attribution && style === "quote" && (
          <p className="mt-4 text-lg font-medium md:text-xl">
            &mdash; {attribution}
          </p>
        )}

        {/* Newsletter Form */}
        {style === "newsletter" && (
          <form className="newsletter-form">
            <input
              type="email"
              placeholder={lang === "en" ? "ENTER YOUR EMAIL" : "INGRESA TU EMAIL"}
              required
            />
            <button
              type="submit"
              className="opacity-100 hover:opacity-90"
            >
              {buttonText || (lang === "en" ? "Sign Up" : "Suscribirse")}
              <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836" stroke="#ffffff"></path></svg>
            </button>
          </form>
        )}

        {/* Regular Button with Link */}

        {style !== "newsletter" && style !== "quote" && buttonText && block.link && (
          <ResolvedLink
            link={block.link}
            className={cn(
              "inline-flex items-center gap-2 border px-6 py-2 text-sm uppercase transition-colors",
              style === "speaking"
                ? "border-white text-white hover:bg-white hover:text-primary"
                : "border-secondary text-secondary hover:bg-secondary hover:text-white"
            )}
          >
            {buttonText}
          </ResolvedLink>
        )}
      </div>
    </section>
  );
}
