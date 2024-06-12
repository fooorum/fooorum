import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { forumCreationForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, Forum } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");
  if (!user.isAdmin) return new Response(null, { status: 403 });

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = forumCreationForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { name, description } = data;

  const [{ id }] = await db
    .insert(Forum)
    .values({
      name,
      description,
    })
    .returning({ id: Forum.id });

  return redirect(`/forums/view/${id}/posts`);
}
