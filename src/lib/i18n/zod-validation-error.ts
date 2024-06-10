import i18n from "i18next";
import {
  fromZodError as fromZodError_,
  type FromZodErrorOptions,
  type ZodError,
} from "zod-validation-error";

export const i18nOptions = { ns: "zod-validation-error" };

export function padOptions(options?: FromZodErrorOptions): FromZodErrorOptions {
  return {
    issueSeparator: i18n.t("issue_separator", i18nOptions),
    unionSeparator: i18n.t("union_separator", i18nOptions),
    prefix: i18n.t("prefix", i18nOptions),
    prefixSeparator: i18n.t("prefix_separator", i18nOptions),
    ...options,
  };
}

export function fromZodError(err: ZodError, options?: FromZodErrorOptions) {
  return fromZodError_(err, padOptions(options));
}
