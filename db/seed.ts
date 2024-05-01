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
      description: "Denn das ist das Memes-Forum, versteht ihr?",
      user: 0,
      forum: 0,
    },
    {
      id: 1,
      description: "Nein, du bist nicht lustig.",
      user: 1,
      forum: 0,
      parent: 0,
    },
    {
      id: 2,
      description: "Doch, bin ich.",
      user: 0,
      forum: 0,
      parent: 1,
    },
    {
      id: 3,
      description: "Nein!",
      user: 1,
      forum: 0,
      parent: 2,
    },
    {
      id: 4,
      description: "Doch!! >:(",
      user: 0,
      forum: 0,
      parent: 3,
    },
  ]);
  await db.insert(Upvote).values([{ user: 0, post: 0 }]);
  await db.insert(Downvote).values([{ user: 1, post: 0 }]);
}
