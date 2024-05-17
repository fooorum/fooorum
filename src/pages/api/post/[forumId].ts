import type { APIContext } from "astro";
import { db, Post } from "astro:db";

export async function POST({
  request,
  locals,
  params,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/login");

  const forumId = parseInt(params.forumId!);
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");


  if (typeof title !== "string" || !title) {
    return new Response("Incorrect title", {
      status: 400,
    });
  }

  if (typeof description !== "string" || !description) {
    return new Response("Incorrect description", {
      status: 400,
    });
  }

  await db.insert(Post).values({
    title,
    description,
    userId: user.id,
    forumId,
  })

  return redirect(`/forums/${forumId}`);
}
