import {
  db,
  alias,
  countDistinct,
  eq,
  and,
  User,
  Forum,
  Post,
  Comment,
  Embed,
  Media,
  Vote,
  sql,
} from "astro:db";

export const Upvote = alias(Vote, "upvote");
export const Downvote = alias(Vote, "downvote");
export const Voted = alias(Vote, "voted");
export const Child = alias(Comment, "child");

export function selectPosts(options: { userId?: number }) {
  return db
    .select({
      title: Post.title,
      description: Post.description,
      id: Post.id,
      deleted: Post.deleted,
      userName: User.name,
      userId: User.id,
      forumName: Forum.name,
      forumId: Forum.id,
      score: sql`total(${Vote.score})`,
      upvotes: countDistinct(Upvote.userId),
      downvotes: countDistinct(Downvote.userId),
      votedScore: Voted.score,
      comments: countDistinct(Comment.id),
      embedUrl: Embed.url,
      embedTitle: Embed.title,
      embedDescription: Embed.description,
      mediaUrl: Media.url,
      mediaType: Media.type,
      mediaAlt: Media.alt,
      mediaWidth: Media.width,
      mediaHeight: Media.height,
    })
    .from(Post)
    .innerJoin(User, eq(Post.userId, User.id))
    .innerJoin(Forum, eq(Post.forumId, Forum.id))
    .leftJoin(Embed, eq(Post.embedId, Embed.id))
    .leftJoin(Media, eq(Embed.mediaId, Media.id))
    .leftJoin(Vote, eq(Vote.postId, Post.id))
    .leftJoin(Upvote, and(eq(Upvote.postId, Post.id), eq(Upvote.score, 1)))
    .leftJoin(
      Downvote,
      and(eq(Downvote.postId, Post.id), eq(Downvote.score, -1)),
    )
    .leftJoin(
      Voted,
      and(eq(Voted.postId, Post.id), eq(Voted.userId, options.userId ?? -1)),
    )
    .leftJoin(Comment, eq(Comment.postId, Post.id))
    .groupBy(Post.id);
}

export function selectComments(options: { userId?: number }) {
  return db
    .select({
      id: Comment.id,
      postId: Comment.postId,
      description: Comment.description,
      deleted: Comment.deleted,
      userName: User.name,
      userId: User.id,
      score: sql`total(${Vote.score})`,
      upvotes: countDistinct(Upvote.userId),
      downvotes: countDistinct(Downvote.userId),
      votedScore: Voted.score,
    })
    .from(Comment)
    .innerJoin(User, eq(Comment.userId, User.id))
    .leftJoin(Vote, eq(Vote.postId, Comment.id))
    .leftJoin(
      Upvote,
      and(eq(Upvote.commentId, Comment.id), eq(Upvote.score, 1)),
    )
    .leftJoin(
      Downvote,
      and(eq(Downvote.commentId, Comment.id), eq(Downvote.score, -1)),
    )
    .leftJoin(
      Voted,
      and(
        eq(Voted.commentId, Comment.id),
        eq(Voted.userId, options.userId ?? -1),
      ),
    )
    .groupBy(Comment.id);
}

export function selectUsers() {
  return db
    .select({ id: User.id, name: User.name, description: User.description })
    .from(User);
}

export function selectForums() {
  return db
    .select({ id: Forum.id, name: Forum.name, description: Forum.description })
    .from(Forum);
}

export type SelectionData<Q extends (...args: any[]) => Promise<any[]>> =
  Awaited<ReturnType<Q>>[number];

export type PostData = SelectionData<typeof selectPosts>;
export type CommentData = SelectionData<typeof selectComments>;
export type UserData = SelectionData<typeof selectUsers>;
export type ForumData = SelectionData<typeof selectForums>;
