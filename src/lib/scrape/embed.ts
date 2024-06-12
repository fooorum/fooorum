import ogs from "open-graph-scraper";
import type { OgObject } from "open-graph-scraper/dist/lib/types";
import { prefixAttributes } from "@lib/prefixes";
import { getYouTubeMedia } from "./youTube";

export async function fetchEmbedData(url: string | URL) {
  const response = await fetch(url);
  const href = new URL(url).href;

  const blob = await (response as Response).blob();
  const type = blob.type;

  if (["image", "video", "audio"].includes(type.split("/")[0])) {
    return {
      url: href,
      mediaUrl: href,
      mediaType: type,
    };
  } else {
    const { result } = await ogs({ html: await blob.text() });
    const embedMedia = extractEmbedMedia(href, result);
    return {
      url: href,
      title: result.ogTitle,
      ...prefixAttributes(embedMedia ?? {}, "media"),
    };
  }
}

export function extractEmbedMedia(url: string, og: OgObject) {
  const youTubeMedia = getYouTubeMedia(url);
  if (youTubeMedia) return youTubeMedia;

  const [image] = og.ogImage ?? [];
  if (!image?.type?.startsWith("image/")) image.type = `image/${image.type}`;
  if (image) return image;

  const [video] = og.ogVideo ?? [];
  if (!video?.type?.startsWith("video/")) video.type = `video/${video.type}`;
  if (video) return video;
}
