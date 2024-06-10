import { fromZodError } from "zod-validation-error";
import type { FromZodErrorOptions, ZodError } from "zod-validation-error";

export function responseFromZodError(
  err: ZodError,
  options?: FromZodErrorOptions,
) {
  return new Response(fromZodError(err, options).toString(), { status: 400 });
}
