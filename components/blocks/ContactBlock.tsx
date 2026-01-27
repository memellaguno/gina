"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";
import { MapPin, Mail, Phone } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";
import ContactForm from "@/components/forms/ContactForm";

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export type ContactBlockType = {
  _key: string;
  _type: "contactBlock";
  heading?: string;
  headingEn?: string;
  description?: string;
  descriptionEn?: string;
  showForm?: boolean;
  contactInfo?: ContactInfo;
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
};

type ContactBlockProps = {
  block: ContactBlockType;
  lang?: "es" | "en";
};

export default function ContactBlock({ block, lang = "es" }: ContactBlockProps) {
  if (!block) return null;

  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const description = lang === "en" && block.descriptionEn ? block.descriptionEn : block.description;
  const { showForm = true, contactInfo, image } = block;

  const hasImage = image?.asset?._ref;
  const hasContactInfo = contactInfo?.email || contactInfo?.phone || contactInfo?.address;

  return (
    <>
      <BlockContainer
        backgroundClassName="bg-white"
        className="flex-col px-4 py-12 md:px-8 md:py-20"
      >
        <div
          className={cn(
            "flex w-full flex-col gap-8 md:flex-row md:gap-16",
          )}
        >
          {/* Left Column - Info */}
          <section className="flex w-full flex-col gap-6 md:w-1/2">
            {heading && (
              <h2 className="font-display text-secondary text-4xl md:text-5xl lg:text-6xl">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-lg text-gray-600 md:text-xl">
                {description}
              </p>
            )}

            {/* Contact Info */}
            {hasContactInfo && (
              <div className="mt-4 flex flex-col gap-4">
                {contactInfo?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-secondary" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-700 hover:text-secondary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}

                {contactInfo?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-secondary" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-700 hover:text-secondary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}

                {contactInfo?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary mt-1" />
                    <p className="text-gray-700 whitespace-pre-line">
                      {contactInfo.address}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Optional Image */}
            {hasImage && (
              <div className="relative mt-6 aspect-video w-full overflow-hidden">
                <Image
                  src={urlForImage(image)?.url() as string}
                  alt={image?.alt || "Image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Right Column - Form */}
          {showForm && (
            <section className="w-full md:w-1/2">
              <ContactForm lang={lang} />
            </section>
          )}
        </div>
      </BlockContainer>
    </>
  );
}
