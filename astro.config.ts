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
          "account-circle",
          "login",
          "logout",
          "light-mode",
          "dark-mode",
        ],
        tabler: ["brand-foursquare"],
      },
    }),
    favicons({
      appName: "Fooorum",
      appShortName: "Fooorum",
      appDescription: "Ein Internet-Forum.",
      path: "/",
      masterPicture: "./src/assets/favicon.svg",
      background: "#121212",
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
    "/": "/p/",
    "/p/": "/posts/list",
    "/p/[postId]": "/posts/view/[postId]",
    "/c/": "/commets/list",
    "/c/[commentId]": "/comments/view/[commentId]",
    "/f/": "/forums/list",
    "/f/[forumId]": "/forums/view/[forumId]",
    "/u/": "/users/list",
    "/u/[userId]": "/users/view/[userId]",
  },
  output: "server",
  adapter: vercel(),
});
