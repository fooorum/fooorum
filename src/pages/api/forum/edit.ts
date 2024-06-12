import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { forumEditForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, eq, Forum } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");
  if (!user.isAdmin) return new Response(null, { status: 403 });

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = forumEditForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { name, description, id } = data;

  await db
    .update(Forum)
    .set({
      name,
      description,
    })
    .where(eq(Forum.id, id));

  return redirect(`/forums/view/${id}/posts`);
}
