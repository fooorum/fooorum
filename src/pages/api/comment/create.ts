import type { APIContext } from "astro";
import { Comment, db } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = await request.formData();
  const postId = formData.get("postId");
  const parentId = formData.get("parentId");
  const description = formData.get("description");

  if (typeof postId !== "string" || !postId) {
    return new Response("Invalid postId", {
      status: 400,
    });
  }

  if (typeof parentId !== "string" && parentId) {
    return new Response("Invalid parentId", {
      status: 400,
    });
  }

  if (typeof description !== "string" || !description) {
    return new Response("Invalid description", {
      status: 400,
    });
  }

  await db.insert(Comment).values({
    description,
    userId: user.id,
    postId: parseInt(postId),
    parentId: parentId ? parseInt(parentId) : undefined,
  });

  return redirect(`/posts/view/${postId}`);
}
