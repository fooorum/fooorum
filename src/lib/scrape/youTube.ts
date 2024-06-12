export function getYouTubeMedia(href: URL | string) {
  let url = new URL(href);
  const { videoId, time, hostname } = getYouTubeParams(url);
  if (!videoId) return null;

  const embedUrl = new URL(`https://${hostname}/embed/${videoId}`);
  if (time) embedUrl.searchParams.set("start", `${time}`);

  return { type: "iframe/", url: embedUrl.href, width: 560, height: 315 };
}

export function getYouTubeParams(url: URL) {
  const { hostname, videoId, time: timeStr } = getRawYouTubeParams(url);
  const maybeTime = timeStr && parseInt(timeStr.replace("s", ""));
  const time = maybeTime ? maybeTime : undefined;

  return { hostname, videoId: videoId ?? undefined, time };
}

export function getRawYouTubeParams(url: URL) {
  const hostname = url.hostname.replace("www.", "");
  if (url.hostname === "youtu.be") {
    return {
      hostname: "youtube.com",
      videoId: url.pathname.split("/")[1],
      time: url.searchParams.get("t"),
    };
  } else if (instances.includes(hostname)) {
    return {
      hostname,
      videoId: url.searchParams.get("v"),
      time: url.searchParams.get("t"),
    };
  } else {
    return {};
  }
}

const invidiousInstances = await fetchInvidiousInstances();
const instances = ["youtube.com", ...invidiousInstances];

export async function fetchInvidiousInstances() {
  const response = await fetch("https://api.invidious.io/instances.json");
  const data: [string, any][] = await response.json();
  return data.map((v) => v[0]);
}
