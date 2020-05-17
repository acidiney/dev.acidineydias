<template>
  <div class="root flex flex-col md:flex-row md:fixed md:overflow-hidden">
          <a id="github-link" href="https://github.com/codepro-ao/Grid-Layout-Flexbox" target="_blank" rel="noopener noreferrer"  class="githubCorne" aria-label="View source on Github"><svg viewBox="0 0 250 250" aria-hidden="true" class="githubCornerSVG"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
    <div class="about-me pt-10 md:py-10 md:h-full md:w-6/12 flex flex-col">
      <header class="flex flex-col">
        <figure>
          <ImageResponsive
            imageURL="avatar.jpg"
            classes="w-32 h-32 rounded-full mx-6 md:mx-20 mb-6 object-cover object-right-top"
            alt="avatar"
          />
        </figure>
      </header>
      <footer class="text-white px-6 md:px-16">
        <h1 class="text-5xl">
          Hello, I’m <br>
          Acidiney Dias.
        </h1>

        <p>
          I'm full stack developer, currently working as Frontend Lead at
          <a
            href="https://www.digitalfactory.co.ao"
            target="__blank"
          >Digital Factory Angola</a>. I'm a frontend addict and user experience, I love css with passion
          and always keep my mouth open when I discover a new possibilities. I
          love to see my systems working from front to back. I share my
          learnings on Youtube/Medium and anywhere that accepts me.
        </p>
        <a class="text-left md:mr-5 block" href="https://drive.google.com/open?id=1YMoSAyeULgir2hk9fp7MAvzqGl-RUm74" target="__blank">
          <i class="icon-download"></i> Download my CV.
        </a>

        <div class="social mt-4 flex-col flex">
          <ul class="flex mb-2">
            <li v-for="social in socials[0]" :key="'content' + social.icon">
              <a class="text" :href="social.link">
                <i class="icon-2x" :class="social.icon" />
              </a>
            </li>
          </ul>
          <ul class="flex">
            <li v-for="social in socials[1]" :key="'social' + social.icon">
              <a class="text" :href="social.link">
                <i class="icon-2x" :class="social.icon" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
    <div class="porfolio md:h-full px-6 md:px-20 py-10 pt-20  md:w-6/12 overflow-y-auto">
      <div class="articles">
        <h2 class="text-white text-xl text-center mb-3 font-light"> Articles </h2>
        <transition-group name="fade">
          <article
            v-for="article in articles"
            :key="article.link"
            v-observe-visibility="(isVisible, entry) => loadFrontMatterDescription(isVisible, entry, article.link)"
            class="py-6 px-6 relative">
            <nuxt-link :to="`/post/${article.link}`">
              <header>
                <div class="categories flex-wrap flex">
                  <p v-for="(category, i) in article.categories" :key="category + i" class="mr-2 text-xs rounded">
                    {{ category }}
                  </p>
                </div>
              </header>
              <h2 class="text-2xl">
                {{ article.title.trim() | capitalize }}
              </h2>
              <p class="my-3">{{ article.description.trim().slice(0, 100) }} ...</p>
              <span class="bottom-0 mb-6">Publicado aos: <time>{{ article.date }}</time></span>
            </nuxt-link>
          </article>
        </transition-group>
        <p v-if="!articles.length" class="text-white nothing-to-show font-light text-center"> Nothing posted yet! </p>
      </div>
      <div class="projects articles">
        <h2 class="text-white text-xl text-center mb-3 font-light"> Projects </h2>
        <transition-group name="fade">
          <article
            v-for="repo in repos"
            :key="repo.id"
            class="py-6 px-6 relative">
            <a :href="repo.html_url" target="__blank">
              <header>
                <div class="categories flex-wrap flex">
                  <p class="mr-2 text-xs rounded">
                    {{ repo.language }}
                  </p>
                </div>
              </header>
              <h2 class="text-2xl">
                {{ repo.name.trim() | capitalize }}
              </h2>
              <p class="my-3">{{ repo.description }}</p>
              <span><i class="icon-star"></i> {{ repo.stargazers_count }}</span> <br />
              <br />
              <span class="bottom-0 mb-6">Publicado aos: <time>{{ new Date(repo.created_at).toLocaleDateString('pt') }}</time></span>
            </a>
          </article>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>

import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  components: {},
  filters: {
    capitalize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }
  },
  directives: {
    'observe-visibility': ObserveVisibility
  },
  async asyncData (context) {
    const req = require.context('~/content', true, /\.md$/)
    const posts = []
    req.keys().forEach((filename) => {
      posts.push(filename.slice(2, filename.length))
    })

    let repos = await fetch('https://api.github.com/users/acidiney/repos?sort=created')
      .then(req => req.json())

    repos = repos.filter((repo) => !repo.fork)
      //.sort((a, b) => a.stargazers_count < b.stargazers_count ? 1 : -1)
      .slice(0, 5)

    return {
      posts: posts.slice(0, 5),
      repos
    }
  },
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  data () {
    return {
      articles: []
    }
  },
  computed: {
    socials () {
      return [
        [
          { link: 'https://github.com/acidiney', icon: 'icon-github' },
          { link: 'https://www.youtube.com/channel/UCMjOcKmA1UjiimzRDNZ_uOQ', icon: 'icon-youtube' },
          { link: 'https://medium.com/@acidiney', icon: 'icon-medium' }
        ],
        [
          { link: 'https://linkedin.com/in/acidineydias', icon: 'icon-linkedin' },
          { link: 'https://twitter.com/acidiney', icon: 'icon-twitter' },
          { link: 'https://www.instagram.com/acidineydias/', icon: 'icon-instagram' }
        ]
      ]
    }
  },
  methods: {
    async loadFrontMatterDescription (visibility, entry, link) {
      let post = await import(`~/content/${link}.md`)
      this.articles = this.articles.map(article => {
        if (article.link === link) {
          return {
            ...article,
            description: post.attributes.description,
            categories: post.attributes.categories.split(',')
          }
        }
        return {
          ...article
        }
      })
    },
    loadArticles () {
      return this.posts.map((post) => {
        const date = post.slice(0, 10)
        // const bruteTitle = post.slice(10, (post.length - 3)).split('.')
        const title = post.slice(10, (post.length - 3)).split('-').join(' ')
        // const categories = bruteTitle[1].split(',')
        this.articles.push({
          date: new Date(date).toLocaleDateString('pt'),
          title,
          description: '',
          link: post.slice(0, post.length - 3),
          categories: []
        })
      })
    }
  },
  mounted () {
    this.loadArticles()
  },
  head () {
    return {
      title: 'Acidiney Dias | Full stack developer',
      meta: [
        { hid: 'description', name: 'description', content: 'Hello, I\'m Acidiney Dias a software developer, and it is my little home.' },
      ]
    }
  }
}
</script>

<style scoped>
.root {
  /* position: fixed; */
  width: 100vw;
}

.about-me footer h1 {
  font-weight: 700;
}

.about-me footer p {
  color: rgba(148, 148, 149, 0.9);
  font-weight: 300;
}

.about-me footer p a {
  text-decoration: underline;
  color: #fff;
}

.icon-2x {
  margin-right: 10px;
}

.nothing-to-show {
  color: rgba(148, 148, 149, 0.9);
}

.icon-2x:hover::before {
  color:rgba(148, 148, 149, 0.9);
}

.icon-2x::before {
  font-size: 2em;
  color: #fff;
}

.articles article {
  min-height: 200px;
  background-color:rgba(21,21,21, .82);
  margin-bottom: 20px;
  transition: all .26s linear;
  transform: scale(1);
  cursor: pointer;
}

.articles article:hover {
  transform: scale(1.06);
  background-color:rgb(21,21,21);
}

.articles article a header .categories p {
  font-weight: 100;
  font-family: 'Gothic A1';
  color: white;
  text-transform: uppercase;
}

.articles article a h2 {
  font-weight: 400;
  color: #fff;
}

.articles article a p {
  color:rgba(148, 148, 149, 0.9);
}


.articles article a span {
  color: #fff;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 100;
}

/* open-source */
 .githubCornerSVG{
    fill:#1db954;
    color:#fff;
    position: absolute;
    top: 0!important;
    border: 0;
    right: 0;
    z-index: 999;
    height: 65px;
    width:65px;
}

@media (min-width: 768px) {
  .githubCornerSVG{
        height: 50px;
        width: 50px;
  }
  .root {
    height: 100vh;
  }
}
</style>
