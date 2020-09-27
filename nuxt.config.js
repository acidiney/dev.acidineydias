const builtAt = new Date().toISOString()

module.exports = {
  mode: 'universal',
  target: 'static',
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
      { name: 'twitter:site', content: '@acidineydias' },
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
    // '~/plugins/ga',
    '~/plugins/image',
    // '~/plugins/update.client.js',
    '~/plugins/title.component.js',
    { src: '~/plugins/lazyload.js', mode: 'client' },
    { src: '~/plugins/localStorage.js', mode: 'client' }
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

content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-dracula.css'
    }
  }
},

  googleAnalytics: {
    id: 'UA-111254529-3'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/feed',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@bazzite/nuxt-optimized-images'
  ],

  toast: {
    position: 'bottom-center',
    register: [ // Register custom toasts
      {
        name: 'notSended',
        title: 'Oops...Could not send your contact',
        message: 'try send direct using hello@acidineydias.me',
        options: {
          type: 'error'
        }
      },
      {
        name: 'sended',
        message: 'Contact was sended, thanks ^^',
        options: {
          type: 'success'
        }
      }
    ]
  },

  content: {
    markdown: {
      remarkPlugins: ['remark-emoji'],
      prism: {
        theme: 'prism-themes/themes/prism-dracula.css'
      }
    }
  },

  optimizedImages: {
    inlineImageLimit: -1,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 85
    },
    optipng: false,
    pngquant: {
      speed: 7,
      quality: [0.65, 0.8]
    },
    webp: {
      quality: 85
    }
  },

  env: {
    SERVICE_ID: process.env.SERVICE_ID,
    USER_ID: process.env.USER_ID
  },

  feed () {
    const baseUrlBlog = 'https://acidineydias.me/blog'
    const feedFormats = {
      rss: { type: 'rss2', file: 'feed.xml' },
      json: { type: 'json1', file: 'feed.json' }
    }

    const createFeedArticles = async function (feed) {
      feed.options = {
        title: 'Acidiney Dias\' Blog',
        description: 'I write about programming and my personal live',
        link: baseUrlBlog
      }
      const { $content } = require('@nuxt/content')
      const articles = await $content().fetch()

      articles.forEach((article) => {
        const url = `${baseUrlBlog}/${article.slug}`

        feed.addItem({
          id: url,
          link: url,
          date: new Date(article.date),
          title: article.title,
          content: article.description,
          categories: article.categories,
          description: article.description,
          author: ['Acidiney Dias']
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `/${file}`,
      type,
      create: createFeedArticles
    }))
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
      twitterCreator: '@acidineydias'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    }
  },
  generate: {
    async ready () {
      const { $content } = require('@nuxt/content')
      const files = await $content().only(['path']).fetch()

      return files.map(file => file.path === '/index' ? '/' : file.path)
    }
  }
}
