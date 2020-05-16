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
    <footer class="w-4/5 markdown md:w-2/4 mt-6 mx-auto break-all mb-3">
      <div class="head-post">
        <div class="time-categories flex-col md:flex-row flex justify-between md:items-center">
          <time class="text-xs"> {{ attributes.date }} </time>
          <div class="categories flex-wrap flex">
            <p v-for="(category, i) in attributes.categories" :key="category + i" class="mr-2 text-xs rounded">
              {{ category }}
            </p>
          </div>
        </div>
        <h2>{{ attributes.title }}</h2>
      </div>
      <client-only>
        <DynamicMarkdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
        />
      </client-only>
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
        date: new Date(post.attributes.date).toLocaleDateString('pt'),
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
    return {
      title: this.title + '- Acidiney Dias\' Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid:'og:image',
          name: 'og:image',
          content: this.image
        },
        {
          hid:'og:type',
          name: 'og:type',
          content: 'article'
        },
        {
          hid:'og:title',
          name: 'og:title',
          content: this.title
        },
        {
          hid:'og:description',
          name: 'og:description',
          content: this.description
        },
        {
          hid:'twitter:image',
          name: 'twitter:image',
          content: this.image
        },
        {
          hid:'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          hid:'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          hid:'twitter:card',
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
  }

  footer.markdown p {
    margin-bottom: 10px;
  }

  footer.markdown p::first-line {
    padding-left: 10px !important;
  }
</style>