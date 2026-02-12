"use client";

import { useState } from "react";
import { Image } from "next-sanity/image";
import PortfolioImageSlider from "@/components/blocks/PortfolioImageSlider";
import { urlForImage } from "@/sanity/lib/utils";
import { AwardsAccordion as AwardsAccordionType } from "@/sanity.types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  block: AwardsAccordionType;
  lang?: "es" | "en";
};

export default function AwardsAccordion({ block, lang = "es" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const awards = block.awards || [];

  if (!awards.length) return null;

  return (
    <section className="w-full bg-muted awardscontainer py-12 md:py-20 pb-0">
      <div className="mx-auto w-full max-w-[1900px] px-4 md:px-8">
        {heading && (
          <h2 className="mb-12 text-center font-display uppercase text-primary text-5xl md:text-6xl lg:text-7xl">
            {heading}
          </h2>
        )}

        <div className="divide-y divide-border">
          {awards.map((award, index) => {
            const title =
              lang === "en" && award.titleEn ? award.titleEn : award.title;
            const organization =
              lang === "en" && award.organizationEn
                ? award.organizationEn
                : award.organization;
            const isOpen = openIndex === index;

            return (
              <div key={award._key} className="py-8 border-t border-secondary/20">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-secondary">
                      {title}
                    </h3>                    

                    <div className="mt-1 flex items-center gap-4 text-1xl lg:text-2xl font-body uppercase">
                      {organization && <span>{organization}</span>}
                      {award.year && <span>{award.year}</span>}
                    </div>
                  </div>
                  <svg className={cn(
                        "h-10 w-10 transition-transform",
                        isOpen && "rotate-180"
                      )} viewBox="0 0 44 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="1" d="M0.943847 1.16601L21.9438 18.166L42.9438 1.16602" stroke="#e31c93" strokeWidth="3"/>
                    </svg>
                </button>

                {/* Expanded Content */}
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pt-6" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    {award.images && award.images.length > 0 && (
                      /*<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {award.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative aspect-square overflow-hidden rounded-lg"
                          >
                            {image?.asset?._ref && (
                              <Image
                                src={urlForImage(image)?.url() || ""}
                                alt={image.alt || `${title} - Photo ${imgIndex + 1}`}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>*/
                      <div className="mt-8">
                        <PortfolioImageSlider images={award.images} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
