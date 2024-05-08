import { db, Forum, User, Member, Post, Upvote, Downvote } from "astro:db";

export default async function () {
  await db.insert(Forum).values([
    { id: 0, name: "Memes", description: "Lustige Internetbilder." },
    { id: 1, name: "Fragen", description: "Ein Forum für alle Fragen." },
  ]);
  await db.insert(User).values([
    {
      id: 0,
      name: "XGamer",
      password: "passwort",
      description: "Ich mag memes.",
    },
    {
      id: 1,
      name: "Xavier",
      password: "passwort",
    },
  ]);
  await db.insert(Member).values([
    { userId: 0, forumId: 0 },
    { userId: 1, forumId: 1 },
  ]);
  await db.insert(Post).values([
    {
      id: 0,
      title: "Ich bin lustig.",
      description: "Denn das ist das Memes-Forum, versteht ihr?",
      userId: 0,
      forumId: 0,
    },
    {
      description: "Nein, du bist nicht lustig.",
      userId: 1,
      forumId: 0,
      parentId: 0,
    },
    {
      description: "Doch, bin ich.",
      userId: 0,
      forumId: 0,
      parentId: 1,
    },
    {
      description: "Nein!",
      userId: 1,
      forumId: 0,
      parentId: 2,
    },
    {
      description: "Doch!! >:(",
      userId: 0,
      forumId: 0,
      parentId: 3,
    },
  ]);
  await db.insert(Upvote).values([
    { userId: 0, postId: 0 },
    { userId: 1, postId: 1 },
  ]);
  await db.insert(Downvote).values([
    { userId: 1, postId: 0 },
    { userId: 1, postId: 2 },
  ]);
}
