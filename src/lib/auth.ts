import { Lucia } from "lucia";
import { db, Session, User } from "astro:db";
import { AstroDBAdapter } from "lucia-adapter-astrodb";

export const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return { username: attributes.name, isAdmin: attributes.isAdmin };
  },
});

await lucia.deleteExpiredSessions();

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  isAdmin: boolean;
}
