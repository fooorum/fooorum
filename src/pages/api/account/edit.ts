import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { userEditForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, and, eq, Vote, User } from "astro:db";

export async function POST({
  locals,
  request,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = userEditForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { name, description } = data;

  await db.update(User).set({ name, description }).where(eq(User.id, user.id));

  return redirect("/account");
}
