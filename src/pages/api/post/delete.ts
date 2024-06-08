import type { APIContext } from "astro";
import { db, eq, and, Post } from "astro:db";
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
