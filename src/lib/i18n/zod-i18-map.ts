import i18next from "i18next";
import { makeZodI18nMap, type ZodI18nMapOption } from "zod-i18n-map";

export const options: ZodI18nMapOption = {
  t: i18next.t,
  ns: ["zod", "custom"],
};

export const map = makeZodI18nMap(options);
