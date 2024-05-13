import { lucia } from "@lib/auth";
import type { APIContext } from "astro";

export async function POST({
  locals,
  cookies,
  url,
}: APIContext): Promise<Response> {
  const session = locals.session;
  if (!session) {
    return new Response("You need to be signed in to log out", {
      status: 401,
    });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return Response.redirect(new URL("/login", url));
}
