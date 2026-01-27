import { sanityFetch } from "@/sanity/lib/live";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageDimensions } from "@sanity/asset-utils";
import {
  GLOBAL_SETTINGS_QUERY,
  FOOTER_QUERY,
  HOME_PAGES_SLUGS,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { navUrlProcessor } from "@/lib/helpers";
import ResolvedLink from "./ResolvedLink";
type FooterProps = {
  lang?: "es" | "en";
};

export default async function Footer({ lang = "es" }: FooterProps) {
  const {
    data: { settings },
  } = await sanityFetch({ query: GLOBAL_SETTINGS_QUERY });

  const {
    data: { footerNavigation, footerText, footerLogos },
  } = await sanityFetch({
    query: FOOTER_QUERY,
  });

  const { data } = await sanityFetch({
    query: HOME_PAGES_SLUGS,
  });

  // Extract the slug from the first item in the array, or use default
  const homepageSlug = (data && data[0]?.slug) || "home";

  let navItemsWithUrl = navUrlProcessor(footerNavigation, homepageSlug);

  // Provide default empty objects to prevent potential null/undefined errors
  const brandAssets = settings?.brandAssets || {};
  const socials = settings?.socials || {};
  const contactInfo = settings?.contactInfo || {};
  const legal = settings?.legal || {};
  return (
    <>
      <div className="w-full bg-accent">
        <main className="mx-auto flex h-auto w-full max-w-[1900px] flex-col px-4 py-4 uppercase md:px-8 lg:py-8">
          <div className="footer-up">
            {/* Logo Block */}
            <div className="footer-left">
              {brandAssets?.secondaryLogo?.asset && (
                <Image
                  src={urlForImage(brandAssets.secondaryLogo)?.url() as string}
                  className="h-auto max-w-44"
                  width={getImageDimensions(brandAssets.secondaryLogo.asset).width}
                  height={
                    getImageDimensions(brandAssets.secondaryLogo.asset).height
                  }
                  alt={brandAssets.secondaryLogo.alt || "Company Logo"}
                />
              )}
            </div>

            {/* Navigation Block */}
            <section className="footer-center px-3">
              <p className="text-base font-medium">
                {settings?.tagline || "Gina Díaz Barroso"}
              </p>
              <div className="flex flex-col">
                {footerNavigation.map((item) => {
                  return (
                    <ResolvedLink
                      className="py-1 text-sm opacity-100 md:text-base hover:opacity-70"
                      key={item._key}
                      link={item.link}
                    >
                      {item.text}
                    </ResolvedLink>
                  );
                })}
              </div>
            </section>

            {/* Contact Block */}
            <section className="footer-links px-3">
              <p className="text-base font-medium">Links</p>
              <div className="flex flex-col">
                {footerNavigation.map((item) => {
                  return (
                    <ResolvedLink
                      className="py-1 text-sm opacity-100 md:text-base hover:opacity-70"
                      key={item._key}
                      link={item.link}
                    >
                      {item.text}
                    </ResolvedLink>
                  );
                })}
              </div>
            </section>

            {/* Newsletter */}
            <section className="footer-newsletter">
              <p className="text-base font-medium">SUBSCRIBE TO OUR NEWSLETTER</p>
              <form className="newsletter" action="{settings.socials.newsletter.url}">
                <input type="email" placeholder="ENTER YOUR EMAIL"/>
                <button className="text-underline text-primary">SEND</button>
              </form>
            </section>

          </div>
          <div className="footer-down pt-8">
            <div className="w-full">
              <div className="copyright pb-0 py-4">
                COPYRIGHT © {new Date().getFullYear()}{" "} {settings?.tagline || "Gina Díaz Barroso"}. ALL RIGHTS RESERVED
              </div>
              <div className="socials font-medium text-primary py-4 uppercase">
                {/* Social Block */}
                {Object.keys(socials).length > 0 && (
                  <>
                    {socials?.instagram && (
                      <a
                        href={`https://www.instagram.com/${socials.instagram}`}
                        className="py-1 text-sm md:text-base"
                      >
                        Instagram
                      </a>
                    )}

                    {socials?.linkedIn && (
                      <a
                        href={`https://www.linkedin.com/${socials.linkedIn}`}
                        className="py-1 text-sm md:text-base"
                      >
                        LinkedIn
                      </a>
                    )}

                    {socials?.x && (
                      <a
                        href={`https://x.com/${socials.x}`}
                        className="py-1 text-sm md:text-base"
                      >
                        X
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>  
    </>
  );
}
