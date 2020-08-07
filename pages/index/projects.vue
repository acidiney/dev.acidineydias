<template>
  <div class="projects">
    <app-title>Projects 🤜🏽</app-title>
    <section
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="100"
      class="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto md:overflow-y-auto overflow-x-hidden h-90 md:pt-6"
    >
      <article
        v-for="repo in repos"
        :key="repo.id"
        class="relative"
      >
        <a target="_blank" class="py-6 px-6" rel="noreferrer" :href="repo.html_url">
          <span><i class="icon-star" /> {{ repo.stargazers_count }}</span>

          <header>
            <span class="bottom-0 mb-6">{{ repo.updated_at | formateDate }}</span>
          </header>
          <h2 class="text-2xl">
            {{ repo.name.trim() | capitalize }}
          </h2>
          <p class="my-3">
            {{ repo.description.trim() }}
          </p>
          <br>
          <div class="categories flex-wrap flex">
            <p class="mr-2 text-xs rounded capitalize">
              {{ repo.language }}
            </p>
          </div>
        </a>
      </article>
    </section>
  </div>
</template>

<script>
import { formateDate, capitalize } from '~/filters'

const loadRepositories = async (page = 1) => {
  const repos = await fetch('https://api.github.com/users/acidiney/repos?sort=created&page=' + page)
    .then(req => req.json())
    .then(repo => repo.filter(r => !r.fork))
    .then(repo => repo.sort((a, b) => a.stargazers_count > b.stargazers_count ? -1 : 1))

  return repos
}

export default {
  name: 'Projects',
  filters: {
    capitalize,
    formateDate
  },
  async asyncData (context) {
    const repos = await loadRepositories()
    return {
      repos
    }
  },
  data () {
    return {
      repos: [],
      page: 1
    }
  },
  async mounted () {
    this.repos = await loadRepositories()
  },
  methods: {
    async loadMore ($state) {
      this.page++
      this.repos = await loadRepositories(this.page)
        .catch(() => {
          $state.complete()
        })
      $state.loaded()
    }
  }
}
</script>

<style lang="scss" scoped>

.projects article {
  min-height: 280px;
  background-size: cover;
  margin-bottom: 20px;
  border-radius: 25px;
  transition: all .26s linear;
  cursor: pointer;
  overflow: hidden;
}

.h-90 {
  height: 86vh;
   -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::webkit-scrollbar {
    display: none;
  }
}

.projects article a {
  display: block;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.projects article a header .categories p {
  font-weight: 100;
  font-family: 'Gothic A1';
  /* color: white; */
  text-transform: uppercase;
}

.projects article a h2 {
  font-weight: 400;
  /* color: #fff; */
  font-family: 'Roboto', sans-serif;
}

.projects article a p {
  color:rgba(148, 148, 149, 0.9);
}

.projects article a span {
  /* color: #fff; */
  font-family: 'Gothic A1', sans-serif;
  font-weight: 100;
}
</style>
