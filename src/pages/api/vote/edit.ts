import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { voteEditForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, and, eq, Vote } from "astro:db";

export async function POST({
  locals,
  request,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = voteEditForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { postId, commentId, score } = data;

  if (postId !== null) {
    await db.batch([
      db
        .delete(Vote)
        .where(and(eq(Vote.userId, user.id), eq(Vote.postId, postId))),

      db.insert(Vote).values({
        userId: user.id,
        postId: postId,
        score: score,
      }),
    ]);
  }
  if (commentId !== null) {
    await db.batch([
      db
        .delete(Vote)
        .where(and(eq(Vote.userId, user.id), eq(Vote.commentId, commentId))),

      db.insert(Vote).values({
        userId: user.id,
        commentId: commentId,
        score: score,
      }),
    ]);
  }

  return new Response(null, { status: 204 });
}
