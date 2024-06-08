import { fetchEmbedData } from "@lib/embed";
import { unprefixAttributes } from "@lib/prefixes";
import type { APIContext } from "astro";
import { db, Post, Embed, Media, eq } from "astro:db";
import { z } from "zod";

export async function POST({
  request,
  locals,
  redirect,
}: APIContext): Promise<Response> {
  const { user } = locals;
  if (!user) return redirect("/account/login");

  const formData = await request.formData();
  const forumId = formData.get("forumId");
  const title = formData.get("title");
  const description = formData.get("description");
  const embedUrl = formData.get("embedUrl");

  if (typeof forumId !== "string" || !forumId) {
    return new Response("Invalid forumId", {
      status: 400,
    });
  }

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

  const zEmbedUrl = z.nullable(z.string().url()).safeParse(embedUrl);
  if (!zEmbedUrl.success)
    return new Response(zEmbedUrl.error.toString(), { status: 400 });

  let embedId: number | undefined = undefined;
  if (zEmbedUrl.data) {
    const [embed] = await db
      .select({ id: Embed.id })
      .from(Embed)
      .where(eq(Embed.url, zEmbedUrl.data));
    if (embed) embedId = embed.id;

    if (embedId === undefined) {
      const embedData = await fetchEmbedData(zEmbedUrl.data);
      let mediaId: number | undefined = undefined;

      if (embedData.mediaUrl && embedData.mediaType) {
        const [media] = await db
          .select({ id: Media.id })
          .from(Media)
          .where(eq(Media.url, embedData.mediaUrl));
        if (media) mediaId = media.id;

        if (mediaId === undefined) {
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
      forumId: parseInt(forumId),
      embedId,
    })
    .returning({ postId: Post.id });

  return redirect(`/posts/view/${postId}`);
}
