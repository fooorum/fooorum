import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { commentCreationForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { Comment, db } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = commentCreationForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { description, postId, parentId } = data;

  await db.insert(Comment).values({
    description,
    userId: user.id,
    postId: postId,
    parentId: parentId,
  });

  return redirect(`/posts/view/${postId}`);
}
