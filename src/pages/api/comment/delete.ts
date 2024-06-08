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

  const formData = await request.formData();
  const {
    success: validId,
    error: idError,
    data: id,
  } = z.coerce.number().safeParse(formData.get("id"));
  if (!validId) {
    return new Response(idError.toString(), { status: 400 });
  }

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
