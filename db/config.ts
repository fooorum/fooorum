import { defineDb, defineTable, column, NOW, FALSE } from "astro:db";

const Forum = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    description: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
  },
});

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    description: column.text({ optional: true }),
    password: column.text(),
    createdAt: column.date({ default: NOW }),
    isAdmin: column.boolean({ default: FALSE }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
    }),
    expiresAt: column.date(),
    userId: column.number({
      references: () => User.columns.id,
    }),
  },
});

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    embedId: column.number({
      optional: true,
      references: () => Embed.columns.id,
    }),
    userId: column.number({ references: () => User.columns.id }),
    forumId: column.number({ references: () => Forum.columns.id }),
    createdAt: column.date({ default: NOW }),
    deleted: column.boolean({ default: FALSE }),
  },
});

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    description: column.text(),
    userId: column.number({ references: () => User.columns.id }),
    postId: column.number({ references: () => Post.columns.id }),
    parentId: column.number({
      optional: true,
      references: (): any => Comment.columns.id,
    }),
    createdAt: column.date({ default: NOW }),
    deleted: column.boolean({ default: FALSE }),
  },
});

const Embed = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    url: column.text({ unique: true }),
    title: column.text({ optional: true }),
    description: column.text({ optional: true }),
    mediaId: column.number({
      optional: true,
      references: () => Media.columns.id,
    }),
  },
});

const Media = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    url: column.text({ unique: true }),
    type: column.text(),
    alt: column.text({ optional: true }),
    width: column.number({ optional: true }),
    height: column.number({ optional: true }),
  },
});

const Vote = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    postId: column.number({
      references: () => Post.columns.id,
      optional: true,
    }),
    commentId: column.number({
      references: () => Comment.columns.id,
      optional: true,
    }),
    score: column.number(),
  },
});

export default defineDb({
  tables: {
    Forum,
    User,
    Session,
    Post,
    Comment,
    Embed,
    Media,
    Vote,
  },
});
