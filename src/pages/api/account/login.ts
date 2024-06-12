import { lucia } from "@lib/auth";
import type { APIContext } from "astro";
import { db, User, eq } from "astro:db";
import { hash, verify } from "argon2";
import { loginForm } from "@lib/zod/schemata";
import { securePassword } from "@lib/zod/schemata/password";
import { responseFromZodError } from "@lib/zod/responseFromZodError";

const hashOptions = {
  memoryCost: 19456,
  timeCost: 2,
  hashLength: 32,
  parallelism: 1,
};

export async function POST({
  request,
  cookies,
  redirect,
}: APIContext): Promise<Response> {
  const formData = Object.fromEntries(await request.formData());
  const { success, data, error } = loginForm.safeParse(formData);
  if (!success) return responseFromZodError(error);

  const { username, password } = data;

  let user = await selectUser(username);
  if (!user) {
    const { success, error } = await securePassword.safeParseAsync(password);
    if (!success) return responseFromZodError(error);

    await createUser(username, password);
    user = await selectUser(username);
  }

  const passwordIsValid = await verify(user.password, password);
  if (!passwordIsValid) return redirect(`/account/login?invalid`);

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/account");
}

async function createUser(username: string, password: string) {
  const passwordHash = await hash(password, hashOptions);
  await db.insert(User).values({
    name: username,
    password: passwordHash,
  });
}

async function selectUser(username: string) {
  const [user] = await db.select().from(User).where(eq(User.name, username));
  return user;
}
