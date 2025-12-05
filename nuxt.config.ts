const builtAt = new Date().toISOString();
const sw = process.env.SW === "true";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "nuxt-gtag",
    "@vite-pwa/nuxt",
  ],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "pt", name: "Portuguese", file: "pt.json" },
    ],
    baseUrl: "https://acidineydias.dev",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    compilation: {
      strictMessage: false,
    },
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "author", content: "Acidiney Dias <hireme@acidineydias.dev>" },
        { name: "application-name", content: "Acidiney Dias Website" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, blog, follow" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@acidineydias" },
        { name: "linkedin:site", content: "acidineydias" },
        { name: "medium:site", content: "@acidiney" },
        { name: "github:site", content: "acidiney" },
        { property: "og:type", content: "profile" },
        { property: "og:updated_time", content: builtAt },
        { property: "apple-mobile-web-app-title", content: "Acidiney Dias" },
      ],
      link: [
        {
          type: "shortcut icon",
          href: "/favicon/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon/favicon-96x96.png",
          sizes: "96x96",
        },
        {
          rel: "apple-touch-icon",
          href: "/favicon/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },
  },
  css: [
    "~/assets/css/fonts.css",
    "~/assets/css/index.css",
    "~/assets/css/dark.css",
    "~/assets/css/light.css",
  ],
  pwa: {
    registerType: "autoUpdate",
    strategies: sw ? "injectManifest" : "generateSW",
    client: {
      installPrompt: true,
    },
    manifest: {
      id: "acidiney_dias_dev",
      name: "Acidiney Dias | Full stack developer",
      short_name: "acidiney_dias",
      theme_color: "#212121",
      background_color: "#212121",
      display: "standalone",
      lang: "en",
      icons: [
        {
          src: "/favicon/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/favicon/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
});
