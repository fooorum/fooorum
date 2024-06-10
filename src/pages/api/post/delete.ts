import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { postDeletionForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, eq, and, Post } from "astro:db";

export async function POST({
  locals,
  request,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = postDeletionForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { id } = data;

  const filters = [eq(Post.id, id)];
  if (!user.isAdmin) filters.push(eq(Post.userId, user.id));

  const [{ userId }] = await db
    .update(Post)
    .set({ deleted: true })
    .where(and(...filters))
    .returning({ userId: Post.userId });

  if (userId !== user.id && !user.isAdmin)
    return new Response(null, { status: 403 });

  return redirect("/");
}
