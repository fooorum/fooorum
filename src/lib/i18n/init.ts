import { type InitOptions } from "i18next";

export const options: InitOptions = {
  resources: {
    en: {
      zod: import("zod-i18n-map/locales/en/zod.json"),
      custom: {
        invalid_slug:
          "Slug must only contain lowercase chars, digits and dashes",
      },
    },
    de: {
      zod: import("zod-i18n-map/locales/de/zod.json"),
      custom: {
        invalid_slug:
          "Slug darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten",
      },
    },
  },
};
