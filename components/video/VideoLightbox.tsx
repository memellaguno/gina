"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

type Props = {
  embedUrl: string;
  title: string;
  onClose: () => void;
};

export default function VideoLightbox({ embedUrl, title, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-white hover:opacity-70"
        aria-label="Close video"
      >
        <X className="h-8 w-8" />
      </button>
      <div
        className="relative w-full max-w-5xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl + (embedUrl.includes("?") ? "&" : "?") + "autoplay=1"}
          className="h-full w-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={title}
        />
      </div>
    </div>
  );
}
