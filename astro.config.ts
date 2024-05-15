import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), icon()],
  redirects: {
    "/": "/posts"
  },
  output: "server",
  adapter: vercel()
});