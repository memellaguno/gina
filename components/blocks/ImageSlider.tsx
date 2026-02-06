"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update progress bar based on scroll position
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const currentProgress = (track.scrollLeft / maxScroll) * 100;
    setProgress(currentProgress);
  }, []);

  // Mouse/Touch event handlers for drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;

    setIsDragging(true);
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeft(track.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const track = trackRef.current;
    if (!track) return;

    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    track.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - track.offsetLeft);
    setScrollLeft(track.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const track = trackRef.current;
    if (!track) return;

    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  // Progress bar click to seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollLeft = clickPosition * maxScroll;
    updateProgress();
  };

  // Scroll event listener for progress updates
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => updateProgress();
    track.addEventListener("scroll", handleScroll);

    // Initial progress update
    updateProgress();

    return () => track.removeEventListener("scroll", handleScroll);
  }, [updateProgress]);

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

      {/* Slider - Grabbable */}
      <div className="w-full bg-transparent">
        <div
          ref={trackRef}
          className={`photo-slider flex gap-2 overflow-x-scroll scroll-smooth pb-4 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {sliderImages.map((image, index) => (
            <div
              key={`${image._key}-${index}`}
              className="relative h-[180px] flex-shrink-0 md:h-[250px] lg:h-[25vw]"
            >
              {image.asset?._ref && (
                <img
                  src={urlForImage(image)?.url() || ""}
                  alt={image.alt || "Image"}
                  className="h-full w-auto max-w-none object-cover transition-transform duration-300 hover:scale-[1.03]"
                  draggable={false}
                  onClick={() => {
                    if (!isDragging) {
                      setActiveImage({
                        src: urlForImage(image)?.url() || "",
                        alt: image.alt,
                      });
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {block.showProgressBar && (
          <div
            className="mx-auto mt-8 w-full max-w-md cursor-pointer px-4"
            onClick={handleProgressClick}
          >
            <div className="slider-progress h-1 w-full overflow-hidden rounded-full bg-[#f2c6dc]">
              <div
                className="progress-bar h-full rounded-full bg-secondary transition-all duration-200"
                style={{ width: `${Math.max(5, progress)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .photo-slider {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .photo-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
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
