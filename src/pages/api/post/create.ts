import { fetchEmbedData } from "@lib/scrape/embed";
import { unprefixAttributes } from "@lib/prefixes";
import { responseFromZodError } from "@lib/zod/responseFromZodError";
import { postCreationForm } from "@lib/zod/schemata";
import type { APIContext } from "astro";
import { db, Post, Embed, Media, eq } from "astro:db";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = postCreationForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { forumId, title, description, embedUrl } = data;

  let embedId: number | null = null;
  if (embedUrl) {
    const [embed] = await db
      .select({ id: Embed.id })
      .from(Embed)
      .where(eq(Embed.url, embedUrl));
    if (embed) embedId = embed.id;

    if (embedId === null) {
      const embedData = await fetchEmbedData(embedUrl);
      let mediaId: number | null = null;

      if (embedData.mediaUrl && embedData.mediaType) {
        const [media] = await db
          .select({ id: Media.id })
          .from(Media)
          .where(eq(Media.url, embedData.mediaUrl));
        if (media) mediaId = media.id;

        if (mediaId === null) {
          [{ mediaId }] = await db
            .insert(Media)
            .values(unprefixAttributes(embedData, "media"))
            .returning({ mediaId: Media.id });
        }
      }

      [{ embedId }] = await db
        .insert(Embed)
        .values({ ...embedData, mediaId })
        .returning({ embedId: Embed.id });
    }
  }

  const [{ postId }] = await db
    .insert(Post)
    .values({
      title,
      description,
      userId: user.id,
      forumId,
      embedId,
    })
    .returning({ postId: Post.id });

  return redirect(`/posts/view/${postId}`);
}
