import { alias, Vote, Post } from "astro:db";

export const Upvote = alias(Vote, "upvote");
export const Downvote = alias(Vote, "downvote");
export const Voted = alias(Vote, "voted");
export const Comment = alias(Post, "comment");
