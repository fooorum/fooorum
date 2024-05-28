import { lucia } from "@lib/auth";
import { userNameValidator, passwordValidator } from "@lib/validate";
import { hashOptions } from "@lib/hash";
import type { APIContext } from "astro";
import { db, User, eq } from "astro:db";
import { hash, verify } from "argon2";
import zxcvbn from "zxcvbn";

export async function POST({
  request,
  cookies,
  redirect,
}: APIContext): Promise<Response> {
  const formData = await request.formData();
  const userName = formData.get("username");
  const password = formData.get("password");

  if (typeof userName !== "string" || !userNameValidator.validate(userName)) {
    return new Response("Invalid username", {
      status: 400,
    });
  }
  if (typeof password !== "string" || !passwordValidator.validate(password)) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  let user = await getUser(userName);
  if (!user) {
    const passwordRating = zxcvbn(password);
    if (passwordRating.score < 4) {
      return redirect(`/login?weak&username=${userName}`);
    }

    await createUser(userName, password);
    user = await getUser(userName);

    if (!user) {
      return new Response(null, {
        status: 500,
      });
    }
  }

  const passwordIsValid = await verify(user.password, password);
  if (!passwordIsValid) {
    return redirect(`/login?invalid&username=${userName}`);
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
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
