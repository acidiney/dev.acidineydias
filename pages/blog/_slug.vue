<template>
  <div class="text-white pt-10">
    <header class="w-4/5 md:w-2/4 mx-auto mb-3 text-white">
      <h1 class="text-5xl">Acidiney blog</h1>
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

      <nuxt-link to='/'> <i class="icon-arrow-left"></i>Go Back </nuxt-link>
    </header>
    <hr />
    <ImageResponsive
      v-if="image"
      :imageURL="'blog/' + image"
      :classes="`h-54 w-full object-cover ${imagePosition}`"
      alt="avatar"
    />
    <footer class="w-4/5 markdown md:w-2/4 mt-6 mx-auto text-justify mb-3">
      <div class="head-post">
        <div class="time-categories flex-col md:flex-row flex justify-between md:items-center">
          <time class="text-xs"> {{ new Date(date).toLocaleDateString('pt') }} </time>
          <div class="categories flex-wrap flex">
            <p v-for="(category, i) in categories" :key="category + i" class="mr-2 text-xs rounded">
              {{ category }}
            </p>
          </div>
        </div>
        <h2 class="text-left">{{ title }}</h2>
      </div>
      <client-only>
        <DynamicMarkdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
        />
      </client-only>
      <div class="adx-sense">
        <adsbygoogle />
      </div>
    </footer>
    <nuxt-link class="my-5 block text-center" to='/'> <i class="icon-arrow-left"></i> Go Home</nuxt-link>
    <div class="comments w-4/5 md:w-2/4 mx-auto">
      <vue-disqus shortname="acidineydias" :identifier="getUrl" :url="getUrl"></vue-disqus>
    </div>
  </div>
</template>

<script>
import DynamicMarkdown from '~/components/Markdown/DynamicMarkdown'
export default {
  name: 'Blog',
  validate (context) {
    const { slug } = context.params
    if (slug) {
      return true
    }

    context.redirect('/')
  },
  data () {
    return {
      attributes: {}
    }
  },
  async asyncData({params}) {
    try {
      let post = await import(`~/content/${params.slug}.md`)
      return {
        date: post.attributes.date,
        title: post.attributes.title,
        image: post.attributes.image,
        imagePosition: post.attributes.imagePosition,
        categories: post.attributes.categories.split(','),
        // extraComponent: post.attributes.extraComponent,
        renderFunc: `(${post.vue.render})`,
        staticRenderFuncs: `[${post.vue.staticRenderFns}]`,
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
  components: { DynamicMarkdown },
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
    }
  },
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  head () {
    const { fullPath } = this.$route
    return {
      title: this.title + '- Acidiney Dias\' Blog',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          vmid:'og:image',
          name: 'og:image',
          content: `https://acidineydias.me/blog/${this.image}`
        },
        {
          vmid:'og:type',
          name: 'og:type',
          content: 'article'
        },
        {
          vmid:'og:url',
          name: 'og:url',
          content: `https://acidineydias.me${fullPath}`
        },
        {
          vmid:'og:title',
          name: 'og:title',
          content: this.title
        },
        {
          vmid:'og:description',
          name: 'og:description',
          content: this.description
        },
        {
          vmid:'twitter:image',
          name: 'twitter:image',
          content: `https://acidineydias.me/blog/${this.image}`
        },
        {
          vmid:'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          vmid:'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          vmid:'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        }
      ]
    }
  }
}
</script>

<style scoped>
header h1 {
  font-weight: 900;
  text-transform: uppercase;
  font-family: 'Gothic A1', sans-serif;
}

header p {
  font-weight: 300;
  color:rgba(148, 148, 149, 0.9);
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

.adx-sense {
  height: 100px;
  width: 100%;
}

.icon-2x:hover::before {
  color:rgba(148, 148, 149, 0.9);
}

.icon-2x::before {
  font-size: 1.5em;
  color: #fff;
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

  footer.markdown .dynamicMarkdown p {
    margin: 1.2rem 0;
    text-align: left;
    font-size: 13pt;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Source Serif Pro, sans-serif;
    line-height: 1.5rem;
  }

  footer.markdown p::first-line {
    padding-left: 10px !important;
  }

  footer code {
    word-break: break-all;
    font-family: monospace, monospace;
    background-color: #282a36;
    padding: 2px 10px;
    border-radius: 12px;
    display: inline-block;
    font-weight: 100;
    border: 0;
    outline: none;
  }

  footer.markdown h3 {
    margin: unset !important;
    font-weight: unset !important;
    font-size: 20pt !important;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 2;
  }

  footer.markdown h3::before {
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
</style>