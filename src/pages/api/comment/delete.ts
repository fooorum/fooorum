import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { commentDeletionForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, eq, and, Comment } from "astro:db";
import { z } from "zod";

export async function POST({
  locals,
  request,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = commentDeletionForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { id } = data;

  const filters = [eq(Comment.id, id)];
  if (!user.isAdmin) filters.push(eq(Comment.userId, user.id));

  const [{ userId, postId }] = await db
    .update(Comment)
    .set({ deleted: true })
    .where(and(...filters))
    .returning({ userId: Comment.userId, postId: Comment.postId });

  if (userId !== user.id && !user.isAdmin)
    return new Response(null, { status: 403 });

  return redirect(`/posts/view/${postId}`);
}
