import { db, Forum, User, Post, Embed, Media, Comment, Vote } from "astro:db";
import UniqueIds from "@lib/UniqueIds";

export default async function () {
  const { metaForum, fragenForum } = UniqueIds();
  await db.insert(Forum).values([
    {
      id: metaForum,
      name: "meta",
      description: "Über Fooorum.",
    },
    {
      id: fragenForum,
      name: "fragen",
      description: "Ein Forum für alle Fragen.",
    },
  ]);

  const { testUser, ichUser, adminUser } = UniqueIds();
  await db.insert(User).values([
    {
      id: testUser,
      name: "test",
      password:
        "$argon2id$v=19$m=19456,t=2,p=1$/03dpq/qPRyemPPUotRqzQ$D5yyotxTGwiTDXKn3Ry6HjdAxt6d56f+N9LrN5UzV9A",
      description: "Ich bin ein test.",
    },
    {
      id: ichUser,
      name: "ich",
      password:
        "$argon2id$v=19$m=19456,t=2,p=1$afTS6QJOzL56oj87Ef1Z4w$2RVCDKDVQ50P1q21q/uyKZlZV0EcAXh/tHRDZ8pljd4",
      description: "Hallo!",
    },
    {
      id: adminUser,
      name: "admin",
      password:
        "$argon2id$v=19$m=19456,t=2,p=1$0B6bfF3mTciOSl2nonIDjw$xJqXa0kdj7boeXWvTGPSrlT/4tuKjk+5A+PFX4c172A",
      description: "👮",
      isAdmin: true,
    },
  ]);

  const { fooorumMedia, imageMedia, audioMedia, videoMedia, iframeMedia } =
    UniqueIds();
  await db.insert(Media).values([
    {
      id: fooorumMedia,
      type: "image/png",
      url: "https://opengraph.githubassets.com/1453636fa3c90d3340ed4bee452e4e987956658e4f58b72a22faaa81d54cf51d/fooorum/fooorum",
      width: 1200,
      height: 600,
    },
    {
      id: imageMedia,
      type: "image/jpg",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      width: 332,
      height: 332,
    },
    {
      id: audioMedia,
      type: "audio/mp3",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    },
    {
      id: videoMedia,
      type: "video/webm",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    },
    {
      id: iframeMedia,
      type: "iframe/",
      url: "https://www.youtube.com/embed/msbp1FO87x0?autoplay=0",
      width: 560,
      height: 315,
    },
  ]);

  const { linkEmbed, imageEmbed, audioEmbed, videoEmbed, iframeEmbed } =
    UniqueIds();
  await db.insert(Embed).values([
    {
      id: linkEmbed,
      mediaId: fooorumMedia,
      url: "https://github.com/fooorum/fooorum",
      title: "fooorum/fooorum: Ein simples Internetforum.",
      description:
        "Ein simples Internetforum. Contribute to fooorum/fooorum development by creating an account on GitHub.",
    },
    {
      id: imageEmbed,
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      mediaId: imageMedia,
    },
    {
      id: audioEmbed,
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
      mediaId: audioMedia,
    },
    {
      id: videoEmbed,
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      mediaId: videoMedia,
    },
    {
      id: iframeEmbed,
      title:
        "10 Minutes of Adorable cats and kittens videos to Keep You Smiling! 🐱",
      url: "https://www.youtube.com/watch?v=msbp1FO87x0",
      mediaId: iframeMedia,
    },
  ]);

  const {
    commentsPost,
    votesPost,
    otherForumPost,
    linkPost,
    imagePost,
    audioPost,
    videoPost,
    iframePost,
  } = UniqueIds();
  await db.insert(Post).values([
    {
      id: commentsPost,
      userId: testUser,
      title: "Kommentare",
      description: "Dieser Beitrag demonstriert die Kommentarfunktion.",
      forumId: metaForum,
    },
    {
      id: votesPost,
      description: "Dieser Beitrag demonstriert die Bewertungsfunktion.",
      userId: testUser,
      title: "Bewertungen",
      forumId: metaForum,
    },
    {
      id: otherForumPost,
      description:
        "Meine ist, dass man in verschiedenen Foren Beiträge veröffentlichen kann.",
      userId: ichUser,
      title: "Was ist eure Lieblingsfunktion auf Fooorum?",
      forumId: fragenForum,
    },
    {
      id: linkPost,
      embedId: linkEmbed,
      description: "Dieser Beitrag enthält einen Link.",
      userId: testUser,
      title: "Fooorum",
      forumId: metaForum,
    },
    {
      id: imagePost,
      embedId: imageEmbed,
      description: "Dieser Beitrag enthält einen Bild.",
      userId: testUser,
      title: "Grapefruit",
      forumId: metaForum,
    },
    {
      id: audioPost,
      embedId: audioEmbed,
      description: "Dieser Beitrag enthält eine Audio.",
      userId: testUser,
      title: "T-Rex-Schrei",
      forumId: metaForum,
    },
    {
      id: videoPost,
      embedId: videoEmbed,
      description: "Dieser Beitrag enthält ein Video.",
      userId: testUser,
      title: "Blume",
      forumId: metaForum,
    },
    {
      id: iframePost,
      embedId: iframeEmbed,
      description: "Dieser Beitrag enthält ein YouTube Video.",
      userId: testUser,
      title: "Iframe",
      forumId: metaForum,
    },
  ]);

  const {
    commentComment,
    subcommentComment,
    referencesComment,
    multipleCommentsComment,
    voteComment,
    selfvoteComment,
    downvoteComment,
  } = UniqueIds();
  await db.insert(Comment).values([
    {
      id: commentComment,
      postId: commentsPost,
      description: "Das hier ist ein Kommentar.",
      userId: testUser,
    },
    {
      id: subcommentComment,
      postId: commentsPost,
      parentId: commentComment,
      description: "Auch ich kann hierrauf kommentieren.",
      userId: ichUser,
    },
    {
      id: referencesComment,
      postId: commentsPost,
      parentId: subcommentComment,
      description: "Kommentare können sich auf andere beziehen.",
      userId: testUser,
    },
    {
      id: multipleCommentsComment,
      postId: commentsPost,
      parentId: commentComment,
      description: "Mehrere Kommentare können sich auf den gleichen beziehen",
      userId: testUser,
    },
    {
      id: voteComment,
      postId: votesPost,
      description:
        "Jeder Nutzer kann jedem Beitrag jeweils eine einzige Bewertung geben.",
      userId: testUser,
    },
    {
      id: selfvoteComment,
      postId: votesPost,
      parentId: voteComment,
      description:
        "Eigenbewertungen sind erlaubt und könnten in Zukunft bei der Erstellung des Beitrags automatisch hinzugefügt werden.",
      userId: ichUser,
    },
    {
      id: downvoteComment,
      postId: votesPost,
      description: "Schlechte messages werden heruntergewählt",
      userId: ichUser,
    },
  ]);

  await db.insert(Vote).values([
    { userId: testUser, postId: votesPost, score: 1 },
    { userId: ichUser, postId: votesPost, score: 1 },
    { userId: ichUser, postId: otherForumPost, score: 1 },

    { userId: testUser, commentId: selfvoteComment, score: 1 },
    { userId: ichUser, commentId: downvoteComment, score: -1 },
    { userId: testUser, commentId: voteComment, score: 1 },
    { userId: ichUser, commentId: voteComment, score: -1 },
  ]);
}
