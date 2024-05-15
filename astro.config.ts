import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import icon from "astro-icon";
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    icon(),
    favicons({
      appName: "Fooorum",
      appShortName: "Fooorum",
      appDescription: "Ein Internet-Forum.",
      path: "/",
      masterPicture: "./src/assets/favicon.svg",
    }),
  ],
  vite: {
    css: { transformer: "lightningcss" },
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  redirects: {
    "/": "/posts",
  },
  output: "server",
  adapter: vercel(),
});
