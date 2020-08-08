<template>
  <div class="articles">
    <app-title>Blog Articles  😊</app-title>
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto md:overflow-y-auto overflow-x-hidden md:h-90 md:pt-6">
      <article
        v-for="article in articles"
        :key="article.link"
        :style="{ backgroundImage: `url(${article.image})` }"
        class="relative"
      >
        <nuxt-link class="py-6 px-6" :to="article.link">
          <header>
            <span class="bottom-0 mb-6">{{ article.date | formateDate }}</span>
          </header>
          <h2 class="text-2xl">
            {{ article.title.trim() | capitalize }}
          </h2>
          <!-- <p class="my-3">{{ article.description.trim().slice(0, 100) }} ...</p> -->
          <div class="categories flex-wrap flex">
            <p class="mr-2 text-xs rounded capitalize">
              {{ article.categories }}
            </p>
          </div>
        </nuxt-link>
      </article>
    </section>
  </div>
</template>

<script>
import { formateDate, capitalize } from '~/filters'

export default {
  name: 'Articles',
  filters: {
    capitalize,
    formateDate
  },
  async asyncData ({ $content }) {
    const articles = await $content()
      .only(['title', 'slug', 'date', 'image', 'categories', 'link'])
      .sortBy('date', 'desc')
      .limit(4)
      .fetch()

    return {
      articles
    }
  }
}
</script>

<style lang="scss" scoped>
.articles article {
  height: 280px;
  background-size: cover;
  margin-bottom: 20px;
  border-radius: 25px;
  transition: all .26s linear;
  cursor: pointer;
  overflow: hidden;
}

.md\:h-90 {
    @media (min-width:768px) {
      max-height: 86vh;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      &::webkit-scrollbar {
        display: none;
      }
    }
  }
.articles article a {
  display: block;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.articles article a header .categories p {
  font-weight: 100;
  font-family: 'Gothic A1';
  /* color: white; */
  text-transform: uppercase;
}

.articles article a h2 {
  font-weight: 400;
  /* color: #fff; */
  font-family: 'Roboto', sans-serif;
}

.articles article a p {
  color:rgba(148, 148, 149, 0.9);
}

.articles article a span {
  /* color: #fff; */
  font-family: 'Gothic A1', sans-serif;
  font-weight: 100;
}

</style>
