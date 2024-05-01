import { defineDb, defineTable, column, NOW } from "astro:db";

type Id = ReturnType<typeof column.number<{ primaryKey: true }>>;

const Forum = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    created: column.date({ default: NOW }),
  },
});

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    password: column.text(),
    created: column.date({ default: NOW }),
  },
});

const Member = defineTable({
  columns: {
    user: column.number({ references: () => User.columns.id }),
    forum: column.number({ references: () => Forum.columns.id }),
    created: column.date({ default: NOW }),
  },
});

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text({ optional: true }),
    content: column.text(),
    user: column.number({ references: () => User.columns.id }),
    forum: column.number({ references: () => Forum.columns.id }),
    parent: column.number({
      references: (): Id => Post.columns.id,
      optional: true,
    }),
    created: column.date({ default: NOW }),
  },
});

const Vote = defineTable({
  columns: {
    user: column.number({ references: () => User.columns.id }),
    post: column.number({ references: () => Post.columns.id }),
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
