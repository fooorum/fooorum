export function getFilename(url: string | URL) {
  const { hostname, pathname } = new URL(url);
  const path = hostname + pathname;
  return path.replace(/\/+$/, "").split("/").pop()!;
}
