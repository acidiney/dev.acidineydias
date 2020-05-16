const builtAt = new Date().toISOString()
const path = require('path')
const fs = require('fs')
const Mode = require('frontmatter-markdown-loader/mode')
const MarkdownIt = require('markdown-it')
const mip = require('markdown-it-prism')

function getPaths (type) {
  return fs.readdirSync(path.resolve(__dirname, 'content'))
    .filter(filename => path.extname(filename) === '.md')
    .map(filename => `${type}/${path.parse(filename).name}`)
}

const md = new MarkdownIt({
  html: true,
  typographer: true
})
md.use(mip)

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Acidiney Dias | Full stack developer',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: 'Hello, I\'m Acidiney Dias a software developer, and it is my little home.' },
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
      { rel: 'stylesheet', type: 'text/css', href: '/style.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/prims-dracula.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;300;400;700&display=swap' }
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
    '~/plugins/lazyload',
    '~/plugins/ga',
    '~/plugins/image'

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://acidineydias.me',
    lastmod: builtAt,
    routes: [].concat(getPaths('blog'))
  },
  pwa: {
    manifest: {
      name: 'Acidiney Dias | Full stack developer',
      lang: 'en',
      theme_color: '#212121',
      background_color: '#212121',
      twitterCreator: '@acidiney',
      description: 'Hello, I\'m Acidiney Dias a software developer, and it is my little home.'
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
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'content'),
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS, Mode.VUE_COMPONENT],
          vue: {
            root: 'dynamicMarkdown'
          },
          markdown (body) {
            return md.render(body)
          }
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
          adapter: require('responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      })
    }
  },
  generate: {
    routes: [].concat(getPaths('blog'))
  }
}
