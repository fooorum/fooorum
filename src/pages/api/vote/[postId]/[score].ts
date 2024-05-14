import type { APIContext } from "astro";
import { db, and, eq, Vote } from "astro:db";

export async function POST({
  locals,
  params,
  redirect,
  url,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect(new URL("/login", url).href);
  const postId = parseInt(params.postId!);
  const score = parseInt(params.score!);

  await db.batch([
    db
      .delete(Vote)
      .where(and(eq(Vote.userId, user.id), eq(Vote.postId, postId))),

    db.insert(Vote).values({
      userId: user.id,
      postId,
      score,
    }),
  ]);

  return new Response(null, { status: 204 });
}
