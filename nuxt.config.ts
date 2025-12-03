const builtAt = new Date().toISOString()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/sitemap'],
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'pt', name: 'Portuguese', file: 'pt.json' }
        ],
        baseUrl: 'https://acidineydias.me',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        },
        compilation: {
            strictMessage: false,
        },
    },
    app: {
      head: {
          meta: [
              { charset: 'utf-8' },
              {  name: 'author', content: 'Acidiney Dias <hireme@acidineydias.dev>' },
              {  name: 'application-name', content: 'Acidiney Dias Website' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'msapplication-TileColor', content: '#212121' },
              { name: 'theme-color', content: '#212121' },
              { name: 'robots', content: 'index, blog, follow' },
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:site', content: '@acidineydias' },
              { name: 'linkedin:site', content: 'acidineydias' },
              { name: 'medium:site', content: '@acidiney' },
              { name: 'github:site', content: 'acidiney' },
              { property: 'og:type', content: 'profile' },
              { property: 'og:updated_time', content: builtAt }
          ],
  link:  [
    { rel: 'icon', type: 'image/png', href: '/favicon/favicon-16x16.png', sizes: '16x16' },
    { rel: 'icon', type: 'image/png', href: '/favicon/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/favicon/android-chrome-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/png', href: '/favicon/android-chrome-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-57x57.png', sizes: '57x57' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-60x60.png', sizes: '60x60' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-72x72.png', sizes: '72x72' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-76x76.png', sizes: '76x76' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-114x114.png', sizes: '114x114' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-120x120.png', sizes: '120x120' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-144x144.png', sizes: '144x144' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152' },
    { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180' },
    { rel: 'mask-icon', type: 'image/png', href: '/favicon/safari-pinned-tab.svg', color: '#c1c1c1' },
    { rel: 'stylesheet', type: 'text/css', href: '/style.css' },
    { rel: 'stylesheet', type: 'text/css', href: '/@theme/css/index.css' },
    { rel: 'stylesheet', type: 'text/css', href: '/@theme/css/_dark.css' },
    { rel: 'stylesheet', type: 'text/css', href: '/@theme/css/_light.css' }
]
      }
    }
})