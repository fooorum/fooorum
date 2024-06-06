import Cache from "./Cache";

export class MimeTypes extends Cache<string, string> {
  protected override async obtain(url: string) {
    const response = await fetch(url).catch(() => {});
    const blob = await response?.blob();
    return blob?.type.split("/")[0];
  }
}

export const mimeTypes = new MimeTypes();
export default mimeTypes;
