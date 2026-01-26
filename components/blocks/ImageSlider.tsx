"use client";

import { useRef, useState, useEffect } from "react";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { ImageSlider as ImageSliderType } from "@/sanity.types";

type Props = {
  block: ImageSliderType;
  lang?: "es" | "en";
};

export default function ImageSlider({ block, lang = "es" }: Props) {
  const eyebrow = lang === "en" && block.eyebrowEn ? block.eyebrowEn : block.eyebrow;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const images = block.images || [];

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const scrollWidth = track.scrollWidth - track.clientWidth;
      const currentScroll = track.scrollLeft;
      const newProgress = scrollWidth > 0 ? (currentScroll / scrollWidth) * 100 : 0;
      setProgress(newProgress);
    };

    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  if (!images.length) return null;

  return (
    <section className="w-full bg-transparent">
      {/* Header */}
      {(eyebrow || heading) && (
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 pt-0">
          <div className="flex w-full flex-col items-center justify-center py-10 pb-0 text-center">
            {eyebrow && (
              <p className="mb-4 text-sm font-medium uppercase text-secondary lg:text-base">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-4xl uppercase text-secondary md:text-5xl lg:text-6xl xl:text-7xl">
                {heading}
              </h2>
            )}
          </div>
        </div>
      )}

      {/* Slider */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((image) => (
            <div
              key={image._key}
              className="relative h-[300px] w-[400px] flex-shrink-0 md:h-[400px] md:w-[600px]"
              style={{ scrollSnapAlign: "start" }}
            >
              {image.asset?._ref && (
                <Image
                  src={urlForImage(image)?.url() || ""}
                  alt={image.alt || "Image"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {block.showProgressBar && (
          <div className="mx-auto mt-8 w-full max-w-md px-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-150"
                style={{ width: `${Math.max(10, progress)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
