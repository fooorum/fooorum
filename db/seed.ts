import { db, Forum, User, Member, Post, Upvote, Downvote } from "astro:db";

export default async function () {
  await db.insert(Forum).values([
    { id: 0, name: "Memes" },
    { id: 1, name: "Fragen" },
  ]);
  await db.insert(User).values([
    { id: 0, name: "XGamer", password: "passwort" },
    { id: 1, name: "Xavier", password: "passwort" },
  ]);
  await db.insert(Member).values([
    { user: 0, forum: 0 },
    { user: 1, forum: 1 },
  ]);
  await db.insert(Post).values([
    {
      id: 0,
      title: "Ich bin lustig.",
      content: "Hallo, Welt!",
      user: 0,
      forum: 0,
    },
    {
      id: 1,
      content: "Nein, bist du nicht.",
      user: 1,
      forum: 0,
      parent: 0,
    },
  ]);
  await db.insert(Upvote).values([{ user: 0, post: 0 }]);
  await db.insert(Downvote).values([{ user: 1, post: 0 }]);
}
