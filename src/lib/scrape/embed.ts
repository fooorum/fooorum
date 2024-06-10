import ogs from "open-graph-scraper";
import type { OgObject } from "open-graph-scraper/dist/lib/types";
import { prefixAttributes } from "../prefixes";
import { getYouTubeMedia } from "./youTube";

export async function fetchEmbedData(url: string | URL) {
  const href = new URL(url).href;
  const response = await fetch(url);

  const blob = await response.blob();
  const type = blob.type;

  if (["image", "video", "audio"].includes(type.split("/")[0])) {
    return {
      url: href,
      mediaUrl: href,
      mediaType: type,
    };
  } else {
    const { result } = await ogs({ url: href });
    const embedMedia = extractEmbedMedia(result);
    return {
      url: href,
      title: result.ogTitle,
      ...prefixAttributes(embedMedia ?? {}, "media"),
    };
  }
}

export function extractEmbedMedia(og: OgObject) {
  if (og.requestUrl) {
    const youTubeMedia = getYouTubeMedia(og.requestUrl);
    if (youTubeMedia) return youTubeMedia;
  }

  const [image] = og.ogImage ?? [];
  if (image) return { type: "image/", ...image };

  const [video] = og.ogVideo ?? [];
  if (video) return { type: "video/", ...video };
}
