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

const Member = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    forumId: column.number({ references: () => Forum.columns.id }),
    createdAt: column.date({ default: NOW }),
  },
  indexes: [{ on: ["userId", "forumId"], unique: true, name: "memberId" }],
});

const Post = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text({ optional: true }),
    description: column.text(),
    attachementUrl: column.text({ optional: true }),
    userId: column.number({ references: () => User.columns.id }),
    forumId: column.number({ references: () => Forum.columns.id }),
    parentId: column.number({
      references: (): Id => Post.columns.id,
      optional: true,
    }),
    createdAt: column.date({ default: NOW }),
  },
});

const BaseVote = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    postId: column.number({ references: () => Post.columns.id }),
  },
  indexes: [{ on: ["userId", "postId"], unique: true, name: "voteId" }],
});

const Vote = defineTable({
  columns: {
    ...BaseVote.columns,
    score: column.number(),
  },
});

const Upvote = defineTable({ columns: BaseVote.columns, deprecated: true });
const Downvote = defineTable({ columns: BaseVote.columns, deprecated: true });

export default defineDb({
  tables: {
    Forum,
    User,
    Session,
    Member,
    Post,
    Vote,
    Upvote,
    Downvote,
  },
});
