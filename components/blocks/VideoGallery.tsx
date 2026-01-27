"use client";

import { useState, useRef } from "react";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { VideoGallery as VideoGalleryType } from "@/sanity.types";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type Props = {
  block: VideoGalleryType;
  lang?: "es" | "en";
};

//HOME /VIDEOS

export default function VideoGallery({ block, lang = "es" }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = block.videos || [];

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === videos.length - 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (!videos.length) return null;

  return (
    <section className="relative w-full bg-transparent py-8 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Slider */}
        <div className="relative ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videos.map((video, index) => {
              const title =
                lang === "en" && video.titleEn ? video.titleEn : video.title;

              return (
                <div
                  key={video._key}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                    {video.videoUrl ? (
                      <iframe
                        src={video.videoUrl}
                        className="h-full w-full"
                        allowFullScreen
                        title={title || `Video ${index + 1}`}
                      />
                    ) : video.poster?.asset?._ref ? (
                      <>
                        <Image
                          src={urlForImage(video.poster)?.url() || ""}
                          alt={video.poster.alt || "Video thumbnail"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-110">
                            <Play className="h-8 w-8 text-primary" fill="currentColor" />
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                  {/*title && (
                    <p className="mt-4 text-center text-lg font-medium text-foreground">
                      {title}
                    </p>
                  )*/}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary p-3 transition-colors opacity-90 hover:opacity-100" 
              aria-label="Previous video"
              style={{ visibility: isPrevDisabled ? 'hidden' : 'visible' }}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary p-3 transition-colors opacity-90 hover:opacity-100"
              aria-label="Next video"
              style={{ display: isNextDisabled ? 'none' : 'block' }}
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          </>
        )}

        {/* Dots */}
        {videos.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
