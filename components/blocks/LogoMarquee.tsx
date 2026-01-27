"use client";

import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { LogoMarquee as LogoMarqueeType } from "@/sanity.types";
import Link from "next/link";

type Props = {
  block: LogoMarqueeType;
  lang?: "es" | "en";
};

//HOME /logos

export default function LogoMarquee({ block, lang = "es" }: Props) {
  const logos = block.logos || [];

  if (!logos.length) return null;

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full overflow-hidden bg-transparent py-8 mb-8">
      <div className="relative">
        <div className="animate-marquee flex items-center gap-16">
          {duplicatedLogos.map((logo, index) => {
            const LogoWrapper = logo.link ? Link : "div";
            const wrapperProps = logo.link
              ? { href: logo.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <LogoWrapper
                key={`${logo._key}-${index}`}
                {...(wrapperProps as any)}
                className="flex-shrink-0"
              >
                {logo.image?.asset?._ref && (
                  <div className="relative h-12 w-32 md:h-24 md:w-64">
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

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
