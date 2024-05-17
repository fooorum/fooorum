import type { APIContext } from "astro";
import { db, Post, sql } from "astro:db";

export async function POST({
  request,
  locals,
  params,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/login");

  const postId = parseInt(params.postId!);
  const formData = await request.formData();
  const description = formData.get("description");

  if (typeof description !== "string") {
    return new Response("Incorrect description", {
      status: 400,
    });
  }

  await db.insert(Post).values({
    description,
    parentId: postId,
    userId: user.id,
    forumId: sql`(select forumId from ${Post} where id = ${postId})`,
  })

  return redirect(`/posts/${postId}`);
}
