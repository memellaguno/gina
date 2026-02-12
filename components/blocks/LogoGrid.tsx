import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { LogoGrid as LogoGridType } from "@/sanity.types";
import Link from "next/link";

type Props = {
  block: LogoGridType;
  lang?: "es" | "en";
};

//unknown

export default function LogoGrid({ block, lang = "es" }: Props) {
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const logos = block.logos || [];

  if (!logos.length) return null;

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        {/* Header */}
        {heading && (
          <div className="mb-12 text-center flex text-center justify-center">
            <h2 className="mb-4 font-display uppercase text-primary text-4xl md:text-5xl lg:text-6xl max-w-4xl">
              {heading}
            </h2>
          </div>
        )}

        {/* Logo Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] place-items-center gap-8">
          {logos.map((logo) => {
            const LogoWrapper = logo.link ? Link : "div";
            const wrapperProps = logo.link
              ? { href: logo.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <LogoWrapper
                key={logo._key}
                {...(wrapperProps as any)}
                className="flex w-full items-center justify-center p-4 transition-opacity hover:opacity-70"
              >
                {logo.image?.asset?._ref && (
                  <div className="relative h-16 w-full md:h-20">
                    <Image
                      src={urlForImage(logo.image)?.url() || ""}
                      alt={logo.image.alt || logo.name || "Logo"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </LogoWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
