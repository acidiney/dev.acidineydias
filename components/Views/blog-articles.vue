<template>
  <div class="articles">
    <h2 class="sub-title text-xl text-left mb-3 font-light">
      Blog Articles  😊
    </h2>
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto">
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
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

.articles article {
  min-height: 280px;
  background-size: cover;
  margin-bottom: 20px;
  border-radius: 25px;
  transition: all .26s linear;
  cursor: pointer;
  overflow: hidden;
}

.articles article a {
  display: block;
  height: 100%;
  background-color:rgba(21,21,21, .82);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  font-family: 'Roboto', sans-serif;
}

.articles article a p {
  color:rgba(148, 148, 149, 0.9);
}

.articles article a span {
  color: #fff;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 100;
}

</style>
