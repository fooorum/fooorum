export function getFallbackTitle(url: string | URL) {
  const { hostname } = new URL(url);
  return hostname;
}

export function getFallbackAlt(url: string | URL) {
  const { hostname, pathname } = new URL(url);
  const path = hostname + pathname;
  return path.replace(/\/+$/, "").split("/").pop()!;
}
