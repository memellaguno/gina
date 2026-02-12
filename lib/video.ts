type VideoInfo = {
  id: string;
  service: "youtube" | "vimeo";
  hash?: string; // Vimeo privacy hash
};

/**
 * Parse a YouTube or Vimeo URL and extract the video ID, service, and optional hash.
 */
export function parseVideoUrl(url: string): VideoInfo | null {
  if (!url) return null;

  // YouTube patterns
  const ytPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of ytPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { id: match[1], service: "youtube" };
    }
  }

  // Vimeo patterns — capture optional privacy hash after the ID
  // Matches: vimeo.com/123456, vimeo.com/123456/abc123, player.vimeo.com/video/123456?h=abc123
  const vimeoWithHash = url.match(
    /vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/
  );
  if (vimeoWithHash) {
    return { id: vimeoWithHash[1], service: "vimeo", hash: vimeoWithHash[2] };
  }

  const vimeoPlayerHash = url.match(
    /player\.vimeo\.com\/video\/(\d+)\?h=([a-zA-Z0-9]+)/
  );
  if (vimeoPlayerHash) {
    return { id: vimeoPlayerHash[1], service: "vimeo", hash: vimeoPlayerHash[2] };
  }

  const vimeoBasic = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoBasic) {
    return { id: vimeoBasic[1], service: "vimeo" };
  }

  const vimeoPlayer = url.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (vimeoPlayer) {
    return { id: vimeoPlayer[1], service: "vimeo" };
  }

  return null;
}

/**
 * Get the embeddable iframe URL for a video.
 */
export function getEmbedUrl(info: VideoInfo): string {
  if (info.service === "youtube") {
    return `https://www.youtube.com/embed/${info.id}`;
  }
  // Vimeo: include privacy hash if present
  const base = `https://player.vimeo.com/video/${info.id}`;
  return info.hash ? `${base}?h=${info.hash}` : base;
}

/**
 * Get thumbnail URL for a video.
 * YouTube: direct CDN URL
 * Vimeo: requires API call (returns empty, use poster image instead)
 */
export function getThumbnailUrl(info: VideoInfo): string {
  if (info.service === "youtube") {
    return `https://img.youtube.com/vi/${info.id}/hqdefault.jpg`;
  }
  return "";
}
