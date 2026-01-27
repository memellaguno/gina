import "../globals.css";
import React from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";
// import { Analytics } from "@vercel/analytics/react";

import DraftModeToast from "@/components/DraftModeToast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LiveErrorBoundary } from "@/components/LiveErrorBoundary";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { GET_NAV_LINKS, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import localFont from "next/font/local";
import ObserverProvider from "@/components/ObserverProvider";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.websiteTitle || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const modale = localFont({
  src: [
    {
      path: '../fonts/modale-reg.woff2',
      weight: '400', // Regular
      style: 'normal',
    },
    {
      path: '../fonts/modale-med.woff2',
      weight: '500', // Medium
      style: 'normal',
    },
  ],
  variable: '--font-modale', // Optional: for CSS variables
  display: "swap",
});

const flecham = localFont({
  src: "../fonts/flecham-reg.woff2",
  variable: "--font-flecham",
  display: "swap",
});

// This wrapper prevents double children on pres tool in dev mode
const LivePreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="contents">{children}</div>;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  const navLinks = sanityFetch({ query: GET_NAV_LINKS });

  console.log({ draftMode: isDraftMode });
  return (
    <html
      lang="en"
      className={`bg-white text-black ${modale.variable} ${flecham.variable} font-sans`}
    >
      <body className="font-body">
        <section className="">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}

          <LiveErrorBoundary>
            <LivePreviewWrapper>
              <SanityLive />
            </LivePreviewWrapper>
          </LiveErrorBoundary>
          {children}
        </section>
        <SpeedInsights />
        {/* ActiveCampaign Site Tracking - added to footer */}
              <Script id="ac-site-tracking" strategy="afterInteractive">
                {`
                  (function(e,t,o,n,p,r,i){
                    e.visitorGlobalObjectAlias=n;
                    e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){
                      (e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)
                    };
                    e[e.visitorGlobalObjectAlias].l=(new Date).getTime();
                    r=t.createElement("script");
                    r.src=o; r.async=true;
                    i=t.getElementsByTagName("script")[0];
                    i.parentNode.insertBefore(r,i)
                  })(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
                  vgo('setAccount', '802425051');
                  vgo('setTrackByDefault', true);
                  vgo('process');
                `}
              </Script>
      </body>
    </html>
  );
}
