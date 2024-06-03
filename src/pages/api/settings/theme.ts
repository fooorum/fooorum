import type { APIContext } from "astro";

export async function POST({
  request,
  cookies,
}: APIContext): Promise<Response> {
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (typeof theme !== "string" || !theme) {
    return new Response("Invalid theme", {
      status: 400,
    });
  }

  cookies.set("theme", theme, { path: "/" });
  return new Response(null, { status: 204 });
}
