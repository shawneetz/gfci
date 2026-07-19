export type VideoProvider = "facebook" | "youtube" | null;

// Admins sometimes copy the whole <iframe> snippet from Facebook's or
// YouTube's own "Share -> Embed" dialog instead of just the video link.
// This pulls the real video URL out of that snippet so both forms of
// input work the same way. If no <iframe> tag is found, the input is
// assumed to already be a plain URL and is returned unchanged (aside
// from trimming).
export function extractVideoUrl(input: string): string {
  const trimmed = input.trim();

  const iframeMatch = trimmed.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (!iframeMatch) return trimmed;

  const iframeSrc = iframeMatch[1];

  try {
    const wrappedHref = new URL(iframeSrc).searchParams.get("href");
    if (wrappedHref) return wrappedHref;
  } catch {
    // Not a resolvable absolute URL — fall through and use the iframe's
    // src as-is (this is already what a YouTube embed snippet needs,
    // since it has no `href` param to unwrap).
  }

  return iframeSrc;
}

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

  const cleanUrl = extractVideoUrl(url);
  const provider = detectVideoProvider(cleanUrl);

  if (provider === "facebook") {
    return { provider, embedUrl: facebookEmbedUrl(cleanUrl) };
  }

  if (provider === "youtube") {
    const id = getYouTubeVideoId(cleanUrl);
    return { provider, embedUrl: id ? `https://www.youtube.com/embed/${id}` : null };
  }

  return { provider: null, embedUrl: null };
}