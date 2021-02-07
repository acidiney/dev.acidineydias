<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="100"
    class="projects"
  >
    <app-title>
      Open source projects 🤜🏽 <br>
      <small class="font-light text-gray-200 gothic-font"> Find one and contribute 😄</small>
    </app-title>
    <section
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="100"
      class="grid grid-cols-1 sm:grid-cols-2 gap-5 px-3 mx-auto md:overflow-y-auto overflow-x-hidden md:h-90 md:pt-6"
    >
      <app-project-item
        v-for="repo of repos"
        :key="repo.id"
        :repo="repo"
      />
    </section>
  </div>
</template>

<script>
const loadRepositories = async (page = 1) => {
  const repos = await fetch('https://api.github.com/users/acidiney/repos?sort=created&page=' + page)
    .then(req => req.json())
    .then(repo => repo.filter(r => !r.fork))
    .then(repo => repo.sort((a, b) => a.stargazers_count > b.stargazers_count ? -1 : 1))

  return repos
}

export default {
  name: 'Projects',
  async asyncData (context) {
    const repos = await loadRepositories()
    return {
      repos
    }
  },
  data () {
    return {
      moreRepos: [],
      page: 1
    }
  },
  computed: {
    listRepos () {
      return [].concat(...this.repos).concat(...this.moreRepos)
    }
  },
  methods: {
    async loadMore () {
      this.page++
      await loadRepositories(this.page)
        .then((repos) => {
          this.moreRepos.push(repos)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.md\:h-90 {
  @media (min-width:768px) {
    height: 86vh;
    padding-bottom: 5em;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::webkit-scrollbar {
      display: none;
    }
  }
}
</style>
