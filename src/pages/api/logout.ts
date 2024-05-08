import { lucia } from "@lib/auth";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  const session = context.locals.session;
  if (!session) {
    return new Response("You need to be signed in to log out", {
      status: 401,
    });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return Response.redirect(new URL("/login", context.url));
}
