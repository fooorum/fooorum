import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { commentEditForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { Comment, db, eq } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = commentEditForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { id, description } = data;

  await db
    .update(Comment)
    .set({
      description,
    })
    .where(eq(Comment.id, id));

  return redirect(`/comments/view/${id}`);
}
