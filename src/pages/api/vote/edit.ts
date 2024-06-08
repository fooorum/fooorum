import type { APIContext } from "astro";
import { db, and, eq, Vote } from "astro:db";
import { z } from "zod";

export async function POST({
  locals,
  request,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = await request.formData();
  const postId = z.coerce.number().safeParse(formData.get("postId"));
  const commentId = z.coerce.number().safeParse(formData.get("commentId"));
  const score = z.coerce.number().safeParse(formData.get("score"));
  console.log(postId.data, commentId.data, score.data);

  if (
    postId.data !== undefined &&
    postId.data > -1 &&
    score.data !== undefined
  ) {
    await db.batch([
      db
        .delete(Vote)
        .where(and(eq(Vote.userId, user.id), eq(Vote.postId, postId.data))),

      db.insert(Vote).values({
        userId: user.id,
        postId: postId.data,
        score: score.data,
      }),
    ]);
  }
  if (
    commentId?.data !== undefined &&
    commentId.data > -1 &&
    score.data !== undefined
  ) {
    await db.batch([
      db
        .delete(Vote)
        .where(
          and(eq(Vote.userId, user.id), eq(Vote.commentId, commentId.data)),
        ),

      db.insert(Vote).values({
        userId: user.id,
        commentId: commentId.data,
        score: score.data,
      }),
    ]);
  }

  return new Response(null, { status: 204 });
}
