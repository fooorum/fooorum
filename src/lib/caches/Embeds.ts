import Cache from "./Cache";
import ogs from "open-graph-scraper";
import type { OgObject } from "open-graph-scraper/dist/lib/types";

export class Embeds extends Cache<string, OgObject> {
  protected override async obtain(url: string) {
    const result = await ogs({ url }).catch(() => {});
    if (!result || result.error) return undefined;
    return result.result;
  }
}

export const embeds = new Embeds();
export default embeds;
