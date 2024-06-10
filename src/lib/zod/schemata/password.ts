import { z, type RefinementCtx } from "zod";
import { password } from ".";
import zxcvbn from "zxcvbn";
import { getBreaches } from "@lib/scrape/haveIBeenPwned";

export function passwordStrengthRefinement(val: string, ctx: RefinementCtx) {
  const result = zxcvbn(val);

  if (result.score < 4) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: result.feedback.warning || "Password is too weak",
      params: { i18n: { key: "weak_password_warning" } },
    });

    for (const suggestion of result.feedback.suggestions) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: suggestion.replace(/\.$/, ""),
        params: { i18n: { key: "weak_password_suggestion" } },
      });
    }
  }
}
export async function passwordUniquenessRefinement(
  val: string,
  ctx: RefinementCtx,
) {
  const breaches = await getBreaches(val);
  if (breaches > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Password has been found in ${breaches} data breach${breaches !== 1 ? "es" : ""}`,
      params: { i18n: { key: "breached_password" } },
    });
  }
}

export const strongPassword = password.superRefine(passwordStrengthRefinement);

export const uniquePassword = password.superRefine(
  passwordUniquenessRefinement,
);

export const securePassword = password
  .superRefine(passwordStrengthRefinement)
  .superRefine(passwordUniquenessRefinement);

export { password };
