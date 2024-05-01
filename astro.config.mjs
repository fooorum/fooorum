import { defineConfig } from "astro/config";
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [db()],
  redirects: {
    "/": "/posts"
  },
  output: "server",
  adapter: vercel()
});