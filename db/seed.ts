import { db, Forum, User, Member, Post, Vote } from "astro:db";
import UniqueIds from "@lib/UniqueIds";

export default async function () {
  const forums = UniqueIds();
  await db.insert(Forum).values([
    { id: forums.meta, name: "meta", description: "Über Fooorum." },
    {
      id: forums.fragen,
      name: "fragen",
      description: "Ein Forum für alle Fragen.",
    },
  ]);

  const users = UniqueIds();
  await db.insert(User).values([
    {
      id: users.test,
      name: "test",
      password:
        "$argon2id$v=19$m=19456,t=2,p=1$/03dpq/qPRyemPPUotRqzQ$D5yyotxTGwiTDXKn3Ry6HjdAxt6d56f+N9LrN5UzV9A",
      description: "Ich bin ein test.",
    },
    {
      id: users.ich,
      name: "ich",
      password:
        "$argon2id$v=19$m=19456,t=2,p=1$afTS6QJOzL56oj87Ef1Z4w$2RVCDKDVQ50P1q21q/uyKZlZV0EcAXh/tHRDZ8pljd4",
      description: "Hallo!",
    },
  ]);

  await db.insert(Member).values([
    { userId: users.test, forumId: forums.meta },
    { userId: users.ich, forumId: forums.fragen },
  ]);

  const posts = UniqueIds();
  await db.insert(Post).values([
    {
      id: posts.comments,
      title: "Kommentare",
      description: "Dieser Beitrag demonstriert die Kommentarfunktion.",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.comments,
      id: posts.comment,
      description: "Das hier ist ein Kommentar.",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.comment,
      id: posts.subcomment,
      description: "Auch ich kann hierrauf kommentieren.",
      userId: users.ich,
      forumId: forums.meta,
    },
    {
      parentId: posts.subcomment,
      id: posts.references,
      description: "Kommentare können sich auf andere beziehen.",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.comment,
      id: posts.multipleComments,
      description: "Mehrere Kommentare können sich auf den gleichen beziehen",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.comments,
      id: posts.commentWithTitle,
      title: "Kommentar mit einem Titel",
      description: "Kommentare können theoretisch auch einen Titel besitzen.",
      userId: users.ich,
      forumId: forums.meta,
    },
    {
      id: posts.votes,
      title: "Bewertungen",
      description: "Dieser Beitrag demonstriert die Bewertungsfunktion.",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.votes,
      id: posts.vote,
      description:
        "Jeder Nutzer kann jedem Beitrag jeweils eine einzige Bewertung geben.",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      parentId: posts.vote,
      id: posts.selfvote,
      description:
        "Eigenbewertungen sind erlaubt und könnten in Zukunft bei der Erstellung des Beitrags automatisch hinzugefügt werden.",
      userId: users.ich,
      forumId: forums.meta,
    },
    {
      parentId: posts.votes,
      id: posts.downvote,
      description: "Schlechte posts werden heruntergewählt",
      userId: users.ich,
      forumId: forums.meta,
    },
    {
      id: posts.otherForum,
      title: "Was ist eure Lieblingsfunktion auf Fooorum?",
      description:
        "Meine ist, dass man in verschiedenen Foren Beiträge veröffentlichen kann.",
      userId: users.ich,
      forumId: forums.fragen,
    },
    {
      id: posts.url,
      title: "Dieser Beitrag enthält einen langen Link.",
      description: "hi",
      attachementUrl: "https://github.com/fooorum/fooorum",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      id: posts.image,
      title: "Dieser Beitrag enthält einen Bild.",
      description: "hi",
      attachementUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      id: posts.sound,
      title: "Dieser Beitrag enthält ein Geräusch.",
      description: "hi",
      attachementUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
      userId: users.test,
      forumId: forums.meta,
    },
    {
      id: posts.video,
      title: "Dieser Beitrag enthält ein Video.",
      description: "hi",
      attachementUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      userId: users.test,
      forumId: forums.meta,
    },
    ...Array.from({ length: 5 }, (v, i) => ({
      id: posts[`test${i}`],
      title: `Test ${i}`,
      description: "Das hier ist ein Test.",
      userId: users.test,
      forumId: forums.meta,
    })),
  ]);

  await db.insert(Vote).values([
    { userId: users.test, postId: posts.votes, score: 1 },
    { userId: users.ich, postId: posts.votes, score: 1 },
    { userId: users.test, postId: posts.vote, score: 1 },
    { userId: users.ich, postId: posts.vote, score: -1 },
    { userId: users.test, postId: posts.selfvote, score: 1 },
    { userId: users.ich, postId: posts.downvote, score: -1 },
    { userId: users.ich, postId: posts.otherForum, score: 1 },
  ]);
}
