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

  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt?: string;
  } | null>(null);

  const sliderImages = [...images];

  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;
    let lastTime = 0;
    const speed = 40; // px / segundo

    const animate = (time: number) => {      

      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (activeImage) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const contentWidth = track.scrollWidth;
      const containerWidth = track.clientWidth;
      const maxOffset = contentWidth - containerWidth;

      if (maxOffset <= 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      setOffset((prev) => {
        let next = prev + direction * (speed * delta) / 1000;

        if (next >= maxOffset) {
          next = maxOffset;
          setDirection(-1);
        }

        if (next <= 0) {
          next = 0;
          setDirection(1);
        }

        // 🔥 progreso real
        setProgress((next / maxOffset) * 100);

        return next;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [direction, activeImage]);

  

  if (!images.length) return null;

  return (
    <section className="w-full bg-transparent">
      {/* Header */}
      {(eyebrow || heading) && (
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10 pt-0">
          <div className="flex w-full flex-col items-center justify-center py-10 pb-0 text-center">
            {eyebrow && (
              <p className="mb-4 text-sm font-medium uppercase text-primary lg:text-base">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-display text-4xl uppercase text-primary md:text-5xl lg:text-6xl xl:text-7xl">
                {heading}
              </h2>
            )}
          </div>
        </div>
      )}

      {/* Slider */}
      <div className="w-full overflow-hidden mb-8">
        <div
          ref={trackRef}
          className="flex gap-4 pb-4 scrollbar-hide will-change-transform"
      style={{
        transform: `translateX(-${offset}px)`,
      }}
          
        >
          {sliderImages.map((image, index) => (
            <div
              key={`${image._key}-${index}`}
              className="relative h-[300px]  flex-shrink-0 md:h-[400px]"
            >
              {image.asset?._ref && (
                <img
                  src={urlForImage(image)?.url() || ""}
                  alt={image.alt || "Image"}
                  className="h-full w-auto object-cover cursor-zoom-in"
                  onClick={() =>
                  setActiveImage({
                    src: urlForImage(image)?.url() || "",
                    alt: image.alt,
                  })
                }
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
                style={{ width: `${Math.max(5, progress)}%` }}
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

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          {/* Contenedor imagen */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-light hover:opacity-70"
              aria-label="Close"
            >
              ×
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.alt || ""}
              className="max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-out"
            />
          </div>
        </div>
      )}

    </section>
  );
}
