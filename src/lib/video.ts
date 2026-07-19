export type VideoProvider = "facebook" | "youtube" | null;

export function detectVideoProvider(url: string): VideoProvider {
  const lower = url.toLowerCase();

  if (lower.includes("facebook.com") || lower.includes("fb.watch")) {
    return "facebook";
  }

  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    return "youtube";
  }

  return null;
}

function facebookEmbedUrl(url: string): string {
  const params = new URLSearchParams({
    href: url,
    show_text: "false",
    width: "1280",
    height: "720",
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.replace("/embed/", "");
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      return parsed.pathname.replace("/shorts/", "");
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

export interface VideoEmbedInfo {
  provider: VideoProvider;
  embedUrl: string | null;
}

export function getVideoEmbedInfo(url: string | null | undefined): VideoEmbedInfo {
  if (!url) return { provider: null, embedUrl: null };

  const provider = detectVideoProvider(url);

  if (provider === "facebook") {
    return { provider, embedUrl: facebookEmbedUrl(url) };
  }

  if (provider === "youtube") {
    const id = getYouTubeVideoId(url);
    return { provider, embedUrl: id ? `https://www.youtube.com/embed/${id}` : null };
  }

  return { provider: null, embedUrl: null };
}