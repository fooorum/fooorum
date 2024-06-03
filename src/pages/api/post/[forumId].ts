import { urlValidator } from "@lib/validate";
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
  const attachement = formData.get("attachement");

  if (typeof title !== "string" || !title) {
    return new Response("Invalid title", {
      status: 400,
    });
  }

  if (typeof description !== "string" || !description) {
    return new Response("Invalid description", {
      status: 400,
    });
  }

  if (typeof attachement !== "string" || !urlValidator.validate(attachement)) {
    return new Response("Invalid attachement", {
      status: 400,
    });
  }
  const attachementUrl = attachement.length ? attachement : undefined;

  const [{ postId }] = await db
    .insert(Post)
    .values({
      title,
      description,
      userId: user.id,
      forumId,
      attachementUrl,
    })
    .returning({ postId: Post.id });

  return redirect(`/posts/${postId}`);
}
