export function getYouTubeMedia(href: URL | string) {
  let url = new URL(href);
  if (url.hostname === "youtu.be")
    url = new URL(`https://www.youtube.com/watch?v=${url.pathname}`);

  const instances = ["youtube.com", ...invidiousInstances];
  if (!instances.includes(url.hostname.replace("www.", ""))) return null;

  const videoId = url.searchParams.get("v");
  return {
    type: "iframe/",
    url: `https://${url.hostname}/embed/${videoId}?autoplay=0`,
    width: 560,
    height: 315,
  };
}

let invidiousInstances = await fetchInvidiousInstances();

export async function fetchInvidiousInstances() {
  const response = await fetch("https://api.invidious.io/instances.json");
  const data: [string, any][] = await response.json();
  return data.map((v) => v[0]);
}
