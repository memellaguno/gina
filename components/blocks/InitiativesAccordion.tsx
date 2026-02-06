"use client";

import { useState } from "react";
import { Image } from "next-sanity/image";
import PortfolioImageSlider from "@/components/blocks/PortfolioImageSlider";
import { urlForImage } from "@/sanity/lib/utils";
import { InitiativesAccordion as InitiativesAccordionType } from "@/sanity.types";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { stegaClean } from "next-sanity";
import Link from "next/link";

type Props = {
  block: InitiativesAccordionType;
  lang?: "es" | "en";
};

export default function InitiativesAccordion({ block, lang = "es" }: Props) {
  //const [openSection, setOpenSection] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<string[]>(
    block.sections?.map((s) => s._key).filter(Boolean) ?? []
  );

  const [openItem, setOpenItem] = useState<string | null>(null);

  const introText =
    lang === "en" && block.introTextEn ? block.introTextEn : block.introText;
  const sections = block.sections || [];
  const theme = stegaClean(block.theme) || "dark";

  const themeClasses = {
    dark: "bg-primary text-white",
    light: "bg-muted text-secondary",
  };

  if (!sections.length) return null;

  return (
    <section className={cn("w-full awards companies py-12 md:py-20", themeClasses[theme as keyof typeof themeClasses])}>
      <div className="mx-auto w-full max-w-[1900px] px-4 md:px-8">
        <div className="w-full text-center flex  justify-center py-10  pb-0 flex-col">
          <div className="mx-auto w-full px-4 py-6 md:px-8 md:py-10 herochild max-w-4xl mb-8">
            {introText && (
              <p className="text-white text-secondary mb-8 reveal md:text-1xl lg:text-3xl visible">
                {introText}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const sectionTitle =
              lang === "en" && section.sectionTitleEn
                ? section.sectionTitleEn
                : section.sectionTitle;
            //const isSectionOpen = openSection === section._key;
            const isSectionOpen = openSections.includes(section._key);

            return (
              <div key={section._key} className="border-b border-current/20">
                <button
                  /*onClick={() =>
                    setOpenSection(isSectionOpen ? null : section._key || null)
                  }*/
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <p className="font-medium lg:text-1xl uppercase">
                    {sectionTitle}
                  </p>
                  
                </button>

                {/* Section Items */}
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isSectionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2 pt-4 border-b border-white">
                      {section.items?.map((item) => {
                        const itemName = item.name;
                        const description =
                          lang === "en" && item.descriptionEn
                            ? item.descriptionEn
                            : item.description;
                        const linkText =
                          lang === "en" && item.websiteLinkTextEn
                            ? item.websiteLinkTextEn
                            : item.websiteLinkText;
                        const isItemOpen = openItem === item._key;

                        return (
                          <div
                            key={item._key}
                            className="border-t border-white pt-8 pb-8"
                          >
                            <button
                              onClick={() =>
                                setOpenItem(isItemOpen ? null : item._key || null)
                              }
                              className="flex w-full items-center gap-4 text-left"
                            >
                              
                              <span className={cn(
                                  "flex-1 text-3xl md:text-4xl lg:text-5xl uppercase text-white font-display",
                                  isItemOpen && "opacity-0"
                                )}
                              >
                                {itemName}
                              </span>
                              
                              <svg className={cn(
                                  "h-10 w-10 transition-transform",
                                  isItemOpen && "rotate-180"
                                )} viewBox="0 0 44 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="1" d="M0.943847 1.16601L21.9438 18.166L42.9438 1.16602" stroke="#ffffff" strokeWidth="3"/>
                              </svg>

                              
                            </button>

                            {/* Item Details */}
                            <div
                              className={cn(
                                "grid transition-all duration-300",
                                isItemOpen ? "grid-rows-[1fr] pt-0 margin-top-1rem" : "grid-rows-[0fr]"
                              )}
                            >
                              <div className="overflow-hidden flex flex-col items-end">

                                <div className="flex justify-between w-full">
                                  <div className="w-1/4 aspect-square relative">
                                    {item.logo?.asset?._ref && (                                      
                                      <Image
                                        src={urlForImage(item.logo)?.url() || ""}
                                        alt={item.logo.alt || itemName || "Logo"}                                                                        
                                        fill
                                        sizes="100vw"
                                        className="object-contain bg-white"
                                      />
                                    )}
                                  </div>
                                  <div className="w-3/4">
                                    <span className="text-3xl md:text-4xl lg:text-5xl uppercase text-white font-display ">
                                      {itemName}
                                    </span>
                                    {description && (
                                      <p className="text-white mt-4 mb-4 md:text-1xl lg:text-3xl">
                                        {description}
                                      </p>
                                    )}
                                    {item.websiteUrl && (
                                      <Link
                                        href={item.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white small text-sm uppercase underline lg:text-1xl"
                                      >
                                        {linkText || "Visit website"}
                                      </Link>
                                    )}
                                  </div>
                                </div>
                                <div className="w-3/4">
                                  {item.portfolioImages &&
                                    item.portfolioImages.length > 0 && (
                                      /*<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                                        {item.portfolioImages.map((portfolioImg) => (
                                          <div
                                            key={portfolioImg._key}
                                            className="relative aspect-video overflow-hidden rounded"
                                          >
                                            {portfolioImg.image?.asset?._ref && (
                                              <Image
                                                src={
                                                  urlForImage(portfolioImg.image)?.url() ||
                                                  ""
                                                }
                                                alt={
                                                  portfolioImg.image.alt ||
                                                  portfolioImg.caption ||
                                                  ""
                                                }
                                                fill
                                                className="object-cover"
                                              />
                                            )}
                                            {portfolioImg.caption && (
                                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white">
                                                {portfolioImg.caption}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>*/
                                      <div className="mt-8">
                                        <PortfolioImageSlider images={item.portfolioImages} />
                                      </div>
                                    )}
                                </div>

                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
