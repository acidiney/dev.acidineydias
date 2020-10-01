<template>
  <div class="article pt-10">
    <header class="mx-auto mb-3">
      <h1 class="text-5xl">
        Acidiney blog
      </h1>
      <p class="w-3/4">
        FullStack Developer | Writer | Teacher | YouTuber | Netflix Lover | Tecnology lover | Open Source enthusiast
      </p>
      <ul class="flex w-full justify-end mb-2">
        <li v-for="social in socials" :key="'content' + social.icon">
          <a class="text" :href="social.link">
            <i class="icon-2x" :class="social.icon" />
          </a>
        </li>
      </ul>

      <nuxt-link to="/">
        <i class="icon-arrow-left" />Go Back
      </nuxt-link>
    </header>
    <hr>
    <figure v-if="page.image" class="picture">
      <picture>
        <source :data-srcset="page.image + '?webp'" type="image/webp">
        <source :data-srcset="page.image" type="image/png">
        <img
          :data-src="page.image"
          loading="lazy"
          :class="`lazyload md:h-54 w-full object-cover ${page.imagePosition}`"
          :alt="page.title"
        >
      </picture>
    </figure>

    <footer class="md:w-4/5 markdown mt-6 mx-auto text-justify mb-3">
      <div class="head-post">
        <div class="time-categories flex-col md:flex-row flex justify-between md:items-center">
          <time class="text-xs"> {{ new Date(page.date).toLocaleDateString('pt') }} </time>
          <div class="categories flex-wrap flex">
            <p class="mr-2 text-xs rounded capitalize">
              {{ page.categories }}
            </p>
          </div>
        </div>
        <h2 class="text-left">
          {{ page.title }}
        </h2>
      </div>
      <nuxt-content :document="page" />
    </footer>
    <nuxt-link class="my-5 block text-center" to="/">
      <i class="icon-arrow-left" /> Go Home
    </nuxt-link>
    <div class="comments w-4/5 md:w-2/4 mx-auto">
      <vue-disqus v-if="renderComponent" shortname="acidineydias" :identifier="getUrl" :url="getUrl" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  validate (context) {
    const { slug } = context.params
    if (slug) {
      return true
    }

    context.redirect('/')
  },
  async asyncData ({ $content, params }) {
    const page = await $content(params.slug).fetch()
    return {
      page
    }
  },
  data () {
    return {
      renderComponent: true
    }
  },
  computed: {
    socials () {
      return [
        { link: 'https://github.com/acidiney', icon: 'icon-github' },
        { link: 'https://www.youtube.com/channel/UCMjOcKmA1UjiimzRDNZ_uOQ', icon: 'icon-youtube' },
        { link: 'https://medium.com/@acidiney', icon: 'icon-medium' }
      ]
    },
    getUrl () {
      return 'https://www.acidineydias.me' + this.$route.fullPath
    },
    theme () {
      return this.$store.getters.theme
    }
  },
  watch: {
    theme () {
      this.renderComponent = false
      this.$nextTick(() => {
        // Add the component back in
        setTimeout(() => {
          this.renderComponent = true
        }, 1000)
      })
    }
  },
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  head () {
    const { fullPath } = this.$route
    return {
      title: this.page.title + '- Acidiney Dias\' Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.page.image
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://acidineydias.me${fullPath}`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.page.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.page.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.page.image
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        }
      ]
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Operator Mono';
  src: url('../../assets/blog/fonts/OperatorMono-Book.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

header h1 {
  font-weight: 900;
  text-transform: uppercase;
  font-family: 'Gothic A1', sans-serif;
}

header p {
  font-weight: 300;
}

.icon-2x {
  margin-right: 10px;
}

.nothing-to-show, a {
  font-weight: 300;
  color: rgba(148, 148, 149, 0.9);
}
a:hover {
  color: #fff;
}

.icon-2x::before {
  font-size: 1.5em;
}

footer .head-post {
  margin-bottom: 1.5em;
}
footer .head-post h2 {
  font-weight: 400;
  font-size: 2em;
  font-family: 'Gothic A1', sans-serif;
  text-transform: capitalize;
}

footer .head-post time {
  font-weight: 300;
  color:rgba(148, 148, 149, 0.9);
}

footer .head-post .categories p {
  font-weight: 300;
  font-family: 'Gothic A1';
  color:rgba(148, 148, 149, 0.9);
  text-transform: uppercase;
}
</style>

<style>
  footer.markdown a {
    border-bottom: 1px dashed #fff;
    color: rgb(128, 128, 253);
    font-weight: 600 !important;
  }

  footer.markdown .nuxt-content p {
    margin: 1.2rem 0;
    text-align: left;
    font-size: 13pt;
    font-weight: 100;
    line-height: 1.5rem;
  }

  .nuxt-content p, h4 {
    font-family:  -apple-system, BlinkMacSystemFont, 'Operator mono', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  h4 {
    font-size: 14pt;
  }

  footer.markdown p::first-line {
    padding-left: 10px !important;
  }

  footer code {
    word-break: break-all;
    font-family: 'Operator mono', monospace;
    font-weight: 400;
    padding: 2px 10px;
    border-radius: 12px;
    display: inline-block;
    font-weight: 100;
    border: 0;
    outline: none;
  }

  footer.markdown h3, footer.markdown h1, footer.markdown h2, footer.markdown h4, footer.markdown h5 {
    margin: unset !important;
    font-weight: unset !important;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 2;
    text-align: left;
  }

  footer.markdown h1 {
    font-size: 20pt !important;
  }

  footer.markdown h2 {
    font-size: 18pt !important;
  }

  footer.markdown h3 {
    font-size: 16pt !important;
  }

  footer.markdown h4 {
    font-size: 14pt !important;
  }

  footer.markdown h3::before,  footer.markdown h1::before,  footer.markdown h2::before,  footer.markdown h4::before {
    content: '';
    position: absolute;
    left: 0;
    height: 10px;
    width: 10px;
    background-color: #fff;
    border-radius: 25px;
    opacity: .6;
  }

  footer.markdown ul {
    list-style: circle !important;
    margin-left: 1em !important;
    margin-bottom: 10px;
  }

  @media (min-width:768px) {
    .h-54 {
      height: 80vh !important;
    }
  }
</style>
