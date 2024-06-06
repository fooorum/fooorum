export async function getYouTubeEmbedUrl(href: URL | string) {
  let url = new URL(href);
  const hostname = url.hostname.replace("www.", "");

  if (hostname === "youtu.be")
    url = new URL(`https://www.youtube.com/watch?v=${url.pathname}`);

  const instances = ["youtube.com", ...(await getInvidiousInstances())];
  if (!instances.includes(hostname)) return;

  const videoId = url.searchParams.get("v");
  return `https://${url.hostname}/embed/${videoId}?autoplay=0`;
}

let invidiousInstances: string[] | null = null;

export async function getInvidiousInstances() {
  if (!invidiousInstances) {
    const response = await fetch("https://api.invidious.io/instances.json");
    const data: [string, any][] = await response.json();
    invidiousInstances = data.map((v) => v[0]);
  }
  return invidiousInstances;
}
