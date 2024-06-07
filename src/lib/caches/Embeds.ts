import Cache from "./Cache";
import ogs from "open-graph-scraper";
import type { OgObject } from "open-graph-scraper/dist/lib/types";

export class Embeds extends Cache<string, OgObject> {
  protected override async obtain(url: string) {
    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.3";
    const result = await ogs({
      url,
      timeout: 1,
      fetchOptions: { headers: { "user-agent": userAgent } },
    }).catch(() => {});
    if (!result || result.error) return undefined;
    return result.result;
  }
}

export const embeds = new Embeds();
export default embeds;
