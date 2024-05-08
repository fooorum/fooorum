import { defineDb, defineTable, column, NOW } from "astro:db";

type Id = ReturnType<typeof column.number<{ primaryKey: true }>>;

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
  },
});

const Member = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    forumId: column.number({ references: () => Forum.columns.id }),
    createdAt: column.date({ default: NOW }),
  },
});

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text({ optional: true }),
    description: column.text(),
    userId: column.number({ references: () => User.columns.id }),
    forumId: column.number({ references: () => Forum.columns.id }),
    parentId: column.number({
      references: (): Id => Post.columns.id,
      optional: true,
    }),
    createdAt: column.date({ default: NOW }),
  },
});

const Vote = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    postId: column.number({ references: () => Post.columns.id }),
  },
});

const Upvote = defineTable(Vote);
const Downvote = defineTable(Vote);

export default defineDb({
  tables: {
    Forum,
    User,
    Member,
    Post,
    Upvote,
    Downvote,
  },
});
