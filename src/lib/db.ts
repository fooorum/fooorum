import {
  db,
  alias,
  countDistinct,
  eq,
  and,
  User,
  Forum,
  Post,
  Vote,
} from "astro:db";

export const Upvote = alias(Vote, "upvote");
export const Downvote = alias(Vote, "downvote");
export const Voted = alias(Vote, "voted");
export const Comment = alias(Post, "comment");

export function selectPosts(options: { userId?: number }) {
  return db
    .select({
      postTitle: Post.title,
      postDescription: Post.description,
      postId: Post.id,
      isDeleted: Post.isDeleted,
      attachementUrl: Post.attachementUrl,
      userName: User.name,
      userId: User.id,
      forumName: Forum.name,
      forumId: Forum.id,
      upvotes: countDistinct(Upvote.userId),
      downvotes: countDistinct(Downvote.userId),
      votedScore: Voted.score,
      comments: countDistinct(Comment.id),
    })
    .from(Post)
    .innerJoin(User, eq(Post.userId, User.id))
    .innerJoin(Forum, eq(Post.forumId, Forum.id))
    .leftJoin(Upvote, and(eq(Upvote.postId, Post.id), eq(Upvote.score, 1)))
    .leftJoin(
      Downvote,
      and(eq(Downvote.postId, Post.id), eq(Downvote.score, -1)),
    )
    .leftJoin(
      Voted,
      and(eq(Voted.postId, Post.id), eq(Voted.userId, options.userId ?? -1)),
    )
    .leftJoin(Comment, eq(Comment.parentId, Post.id))
    .groupBy(Post.id);
}

export type PostSelection = Awaited<ReturnType<typeof selectPosts>>[number];
