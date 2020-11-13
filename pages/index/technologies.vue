<template>
  <div class="technologies">
    <app-title>Technologies ‍💻</app-title>
    <div class="md:overflow-y-auto overflow-x-hidden md:h-90">
      <section v-for="tech in technologies" :key="tech.name" class="tech-section py-2">
        <h4 class="text-lg">
          {{ tech.name }}
        </h4>
        <div class="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-12 gap-5 icons py-2">
          <i v-for="(icon, idx) in tech.icons" :key="icon + idx" :class="icon" :title="icon" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { technologies } from '~/assets/technologies.json'
export default {
  name: 'Technologies',
  asyncData () {
    return {
      technologies
    }
  }
}
</script>
<style lang="scss" scoped>
  section {
    h4 {
      font-weight: 300;
      font-family: "Gothic A1", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .icons {
      i::before {
        font-size: 2em;
      }
    }
  }

  .md\:h-90 {
    @media (min-width:768px) {
      height: 86vh;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      &::webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
