<template>
  <div
    class="projects"
  >
    <AppTitle>
      {{ $t('menu.openSource') }}<br>
      <small class="font-light text-gray-200 gothic-font">{{ $t('findAnyProjectToContribute') }}</small>
    </AppTitle>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 gap-5 px-3 mx-auto md:overflow-y-auto overflow-x-hidden md:h-90 md:pt-6"
    >
      <ProjectItem
        v-for="repo of repos"
        :key="repo.id"
        :repo="repo"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import AppTitle from "~/components/Title.vue";
import ProjectItem from "~/components/ProjectItem.vue";
import type {GithubRepo} from "~/types/github.type";



const loadRepositories = async (page = 1) => {
  return await $fetch<GithubRepo[]>('https://api.github.com/users/acidiney/repos?sort=created&page=' + page)
      .then(repo => repo.filter(r => !r.fork))
      .then(repo => repo.sort((a, b) => a.stargazers_count > b.stargazers_count ? -1 : 1))
}


const { data: repos } = await useAsyncData(() => loadRepositories(), { immediate: true })

</script>


<style scoped>
@media (min-width: 768px) {
  .md\:h-90 {
    height: 86vh;
    padding-bottom: 5em;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
