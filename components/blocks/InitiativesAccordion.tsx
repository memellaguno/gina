"use client";

import { useState } from "react";
import { Image } from "next-sanity/image";
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
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const introText =
    lang === "en" && block.introTextEn ? block.introTextEn : block.introText;
  const sections = block.sections || [];
  const theme = stegaClean(block.theme) || "dark";

  const themeClasses = {
    dark: "bg-secondary text-white",
    light: "bg-muted text-secondary",
  };

  if (!sections.length) return null;

  return (
    <section className={cn("w-full py-12 md:py-20", themeClasses[theme as keyof typeof themeClasses])}>
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        {introText && (
          <p className="mb-12 max-w-3xl text-lg md:text-xl lg:text-2xl">
            {introText}
          </p>
        )}

        <div className="space-y-4">
          {sections.map((section) => {
            const sectionTitle =
              lang === "en" && section.sectionTitleEn
                ? section.sectionTitleEn
                : section.sectionTitle;
            const isSectionOpen = openSection === section._key;

            return (
              <div key={section._key} className="border-b border-current/20">
                <button
                  onClick={() =>
                    setOpenSection(isSectionOpen ? null : section._key || null)
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <h3 className="font-display text-2xl uppercase md:text-3xl">
                    {sectionTitle}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "h-6 w-6 transition-transform",
                      isSectionOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Section Items */}
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isSectionOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2 pt-4">
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
                            className="border-t border-current/10 pt-4"
                          >
                            <button
                              onClick={() =>
                                setOpenItem(isItemOpen ? null : item._key || null)
                              }
                              className="flex w-full items-center gap-4 text-left"
                            >
                              {item.logo?.asset?._ref && (
                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                                  <Image
                                    src={urlForImage(item.logo)?.url() || ""}
                                    alt={item.logo.alt || itemName || "Logo"}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <span className="flex-1 text-lg font-medium">
                                {itemName}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform",
                                  isItemOpen && "rotate-180"
                                )}
                              />
                            </button>

                            {/* Item Details */}
                            <div
                              className={cn(
                                "grid transition-all duration-300",
                                isItemOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
                              )}
                            >
                              <div className="overflow-hidden">
                                {description && (
                                  <p className="mb-4 max-w-2xl text-current/80">
                                    {description}
                                  </p>
                                )}
                                {item.websiteUrl && (
                                  <Link
                                    href={item.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
                                  >
                                    {linkText || "Visit website"}
                                    <ExternalLink className="h-4 w-4" />
                                  </Link>
                                )}
                                {item.portfolioImages &&
                                  item.portfolioImages.length > 0 && (
                                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
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
                                    </div>
                                  )}
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
