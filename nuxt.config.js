const builtAt = new Date().toISOString()

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { hid: 'author', name: 'author', content: 'Acidiney Dias <acidineydias@gmail.com>' },
      { hid: 'application-name', name: 'application-name', content: 'Acidiney Dias Website' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#212121' },
      { name: 'theme-color', content: '#212121' },
      { name: 'robots', content: 'index, blog, follow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@acidiney' },
      { name: 'linkedin:site', content: 'acidineydias' },
      { name: 'medium:site', content: '@acidiney' },
      { name: 'github:site', content: 'acidiney' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
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
      { rel: 'stylesheet', type: 'text/css', href: '/style.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/disqus',
    // '~/plugins/lazyload',
    // '~/plugins/ga',
    '~/plugins/image'

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'UA-111254529-3'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-adsense'
  ],

  content: {
    markdown: {
      remarkPlugins: ['remark-emoji'],
      prism: {
        theme: 'prism-themes/themes/prism-dracula.css'
      }
    }
  },

  'google-adsense': {
    id: 'ca-pub-4289453933940031'
  },

  sitemap: {
    hostname: 'https://acidineydias.me',
    lastmod: builtAt,
    routes: []
  },
  pwa: {
    manifest: {
      name: 'Acidiney Dias | Full stack developer',
      short_name: 'Acidiney Dias',
      lang: 'en',
      theme_color: '#212121',
      background_color: '#212121',
      twitterCreator: '@acidiney'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes: []
  }
}
