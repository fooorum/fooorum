import { lucia } from "@lib/auth";
import { userNameValidator, passwordValidator } from "@lib/validate";
import { hashOptions } from "@lib/hash";
import { hash, verify } from "argon2";
import type { APIContext } from "astro";
import { db, User, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userName = formData.get("username");
  const password = formData.get("password");
  if (!userNameValidator.validate(userName))
    return new Response("Invalid username", {
      status: 400,
    });
  if (!passwordValidator.validate(password))
    return new Response("Invalid password", {
      status: 400,
    });

  let user = await getUser(userName);
  if (!user) {
    await createUser(userName, password);
    user = await getUser(userName);

    if (!user) {
      return new Response(null, {
        status: 500,
      });
    }
  }

  const validPassword = await verify(user.password, password, hashOptions);
  if (!validPassword) {
    return new Response("Incorrect username or password", {
      status: 400,
    });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return context.redirect("/");
}

async function getUser(userName: string) {
  const users = await db.select().from(User).where(eq(User.name, userName));
  return users.at(0);
}

async function createUser(userName: string, password: string) {
  const passwordHash = await hash(password, hashOptions);
  await db.insert(User).values({
    name: userName,
    password: passwordHash,
  });
}
