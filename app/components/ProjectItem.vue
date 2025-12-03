<template>
  <article class="relative">
    <a target="_blank" class="py-6 px-6" rel="noreferrer" :href="repo.html_url">
      <span><i class="icon-star" /> {{ repo.stargazers_count }}</span>

      <header>
        <span class="bottom-0 mb-6">{{ formateDate(repo.updated_at) }}</span>
      </header>
      <h2 class="text-2xl">
        {{ capitalize(repo.name.trim()) }}
      </h2>
      <br>
      <div class="categories flex-wrap flex">
        <p class="mr-2 text-xs rounded capitalize">
          {{ repo.language }}
        </p>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import { formateDate, capitalize } from '~/filters'
import type {GithubRepo} from "~/types/github.type";

defineProps<{
  repo: GithubRepo
}>()
</script>

<script lang="ts">
export default {
  name: 'ProjectItem',
}
</script>

<style scoped>
article {
  height: 250px;
  background-size: cover;
  margin-bottom: 20px;
  border-radius: 25px;
  transition: all .26s linear;
  cursor: pointer;
  overflow: hidden;
}

article a {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

article a header .categories p {
  font-weight: 100;
  font-family: 'Gothic A1',sans-serif;
  /* color: white; */
  text-transform: uppercase;
}

article a h2 {
  font-weight: 400;
  /* color: #fff; */
  font-family: 'Roboto', sans-serif;
}

article a p {
  color:rgba(148, 148, 149, 0.9);
}

article a span {
  /* color: #fff; */
  font-family: 'Gothic A1', sans-serif;
  font-weight: 100;
}
</style>
