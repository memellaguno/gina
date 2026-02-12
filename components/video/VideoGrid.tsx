"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import { parseVideoUrl, getEmbedUrl, getThumbnailUrl } from "@/lib/video";
import VideoLightbox from "./VideoLightbox";

type Video = {
  _id: string;
  title: string;
  titleEn?: string;
  videoUrl: string;
  poster?: any;
  date?: string;
};

type Props = {
  videos: Video[];
  lang?: "es" | "en";
};

export default function VideoGrid({ videos, lang = "es" }: Props) {
  const [activeVideo, setActiveVideo] = useState<{
    embedUrl: string;
    title: string;
  } | null>(null);

  if (!videos.length) {
    return (
      <section className="w-full section">
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
          <p className="text-center text-gray-500 text-lg">
            {lang === "en" ? "No videos yet." : "No hay videos todavía."}
          </p>
        </div>
      </section>
    );
  }

  function handleVideoClick(video: Video) {
    const info = parseVideoUrl(video.videoUrl);
    if (!info) return;
    const title =
      lang === "en" && video.titleEn ? video.titleEn : video.title;
    setActiveVideo({ embedUrl: getEmbedUrl(info), title });
  }

  return (
    <>
      <section className="w-full section">
        <div className="mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
          <div className="video-grid">
            {videos.map((video) => {
              const title =
                lang === "en" && video.titleEn ? video.titleEn : video.title;
              const info = parseVideoUrl(video.videoUrl);

              // Get thumbnail: prefer poster image, fallback to auto-generated
              let thumbUrl = "";
              if (video.poster?.asset?._ref) {
                thumbUrl =
                  urlForImage(video.poster)?.width(600).height(340).url() || "";
              } else if (info) {
                thumbUrl = getThumbnailUrl(info);
              }

              return (
                <button
                  key={video._id}
                  className="video-card group text-left"
                  onClick={() => handleVideoClick(video)}
                >
                  <div
                    className="video-thumb"
                    style={
                      thumbUrl
                        ? { backgroundImage: `url(${thumbUrl})` }
                        : undefined
                    }
                  >
                    <div className="video-play-overlay">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                        <Play
                          className="h-7 w-7 text-primary"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>
                  {title && (
                    <p className="mt-3 font-medium text-primary md:text-lg">
                      {title}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoLightbox
          embedUrl={activeVideo.embedUrl}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
