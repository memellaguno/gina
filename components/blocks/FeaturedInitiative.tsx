import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { FeaturedInitiative as FeaturedInitiativeType } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import ResolvedLink from "../ResolvedLink";

type Props = {
  block: FeaturedInitiativeType;
  lang?: "es" | "en";
};

//HOME /latest initiative

export default function FeaturedInitiative({ block, lang = "es" }: Props) {
  const eyebrow = lang === "en" && block.eyebrowEn ? block.eyebrowEn : block.eyebrow;
  const title = lang === "en" && block.titleEn ? block.titleEn : block.title;
  const description =
    lang === "en" && block.descriptionEn ? block.descriptionEn : block.description;
  const buttonText =
    lang === "en" && block.buttonTextEn ? block.buttonTextEn : block.buttonText;
  const imagePosition = stegaClean(block.imagePosition) || "right";

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 pb-0">
        <div className="w-full py-10 children">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
            <div
              className={cn(
                "grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 bio-grid-reverse",
                imagePosition === "left" && "md:[&>*:first-child]:order-2"
              )}
            >
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                {eyebrow && (
                  <p className="mb-4 text-sm font-medium text-primary lg:text-base reveal">
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h2 className="mb-4 font-display text-4xl uppercase text-primary md:text-5xl lg:text-6xl reveal">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mb-6 max-w-md text-lg md:text-1xl lg:text-3xl reveal">
                    {description}
                  </p>
                )}
              {/* Text Link */}
                {buttonText && block.link && (
                  <ResolvedLink
                    link={block.link}
                    className="inline-flex w-fit border border-primary bg-primary px-6 py-2 text-sm font-medium uppercase text-white transition-colors hover:opacity-90 reveal"
                  >
                    {buttonText}
                  </ResolvedLink>
                )}
              </div>

              {/* Image */}
              <div className="bio-img relative">
                {block.image?.asset?._ref && (                    
                    <img
                      src={urlForImage(block.image)?.url()}
                      className="w-full h-auto object-cover reveal"
                      alt=""
                    />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
