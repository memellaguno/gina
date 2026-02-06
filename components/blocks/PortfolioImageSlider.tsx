"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { urlForImage } from "@/sanity/lib/utils";

type Props = {
  images: any[];
};

export default function PortfolioImageSlider({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt?: string;
  } | null>(null);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    setProgress((track.scrollLeft / maxScroll) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;

    setIsDragging(true);
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeft(track.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const track = trackRef.current;
    if (!track) return;

    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
    updateProgress();
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => updateProgress();
    track.addEventListener("scroll", onScroll);
    updateProgress();

    return () => track.removeEventListener("scroll", onScroll);
  }, [updateProgress]);

  if (!images?.length) return null;

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);


  return (
    <>
      {/* Slider */}
      <div
        ref={trackRef}
        className={`flex gap-2 overflow-x-scroll select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={(e) => {
          setIsDragging(true);
          setStartX(e.touches[0].pageX);
          setScrollLeft(trackRef.current?.scrollLeft || 0);
        }}
        onTouchMove={(e) => {
          if (!isDragging) return;
          const x = e.touches[0].pageX;
          const walk = (x - startX) * 2;
          if (trackRef.current) {
            trackRef.current.scrollLeft = scrollLeft - walk;
            updateProgress();
          }
        }}
        onTouchEnd={stopDragging}
      >
        {images.map((img) => (
          <div
            key={img._key}
            className="relative h-[160px] flex-shrink-0 md:h-[220px] lg:h-[20vw] transition-transform duration-300 hover:scale-[1.01]"
          >
            <img
              src={urlForImage(img.image)?.url() || urlForImage(img)?.url()}
              alt={img.image?.alt || img.caption || ""}
              className="h-full w-auto max-w-none object-cover "
              draggable={false}
              onClick={() =>
                !isDragging &&
                setActiveImage({
                  src: urlForImage(img.image)?.url() || urlForImage(img)?.url(),
                  alt: img.caption,
                })
              }
            />
            {img.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white">
              {img.caption}
            </div>
            )}
            
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-4 w-full max-w-xs">
        <div className="h-1 w-full rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>

      {/* Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white text-4xl font-light hover:opacity-70"
              aria-label="Close"
            >
              ×
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.alt || ""}
              className="max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-out"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white">
              {activeImage.alt}
            </div>

          </div>
        </div>
      )}

    </>
  );
}
