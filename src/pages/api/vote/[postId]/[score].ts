import type { APIContext } from "astro";
import { db, and, eq, Vote } from "astro:db";

export async function POST({
  locals,
  params,
  redirect,
  url,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect(new URL("/login", url));
  const { postId, score } = params;

  await db
    .delete(Vote)
    .where(and(eq(Vote.postId, postId), eq(Vote.userId, user.id)));

  if (score) {
    await db.insert(Vote).values({
      postId,
      userId: user.id,
      score,
    });
  }

  return new Response(null, { status: 204 });
}
