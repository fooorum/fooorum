import type { APIContext } from "astro";
import { db, eq, Post } from "astro:db";

export async function POST({
  request,
  locals,
  params,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/login");

  const postId = parseInt(params.postId!);

  const [{ parentId, forumId, userId }] = await db
    .select({
      parentId: Post.parentId,
      forumId: Post.forumId,
      userId: Post.userId,
    })
    .from(Post)
    .where(eq(Post.id, postId));

  if (userId !== user.id) return new Response(null, { status: 403 });

  await db.update(Post).set({ deleted: true }).where(eq(Post.id, postId));

  return redirect(
    parentId !== null ? `/posts/${parentId}` : `/forums/${forumId}`,
  );
}
