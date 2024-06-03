import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import icon from "astro-icon";
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    icon({
      include: {
        "material-symbols": [
          "forum",
          "person",
          "comment",
          "thumb-up",
          "thumb-down",
          "reply",
          "delete",
          "send",
          "login",
          "logout",
          "light-mode",
          "dark-mode",
        ],
      },
    }),
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
    build: { cssMinify: "lightningcss" },
    optimizeDeps: {
      exclude: ["astro:db"],
    },
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
