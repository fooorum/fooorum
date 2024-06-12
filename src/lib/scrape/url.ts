export function getFallbackTitle(url: string | URL) {
  const { hostname } = new URL(url);
  return hostname;
}
