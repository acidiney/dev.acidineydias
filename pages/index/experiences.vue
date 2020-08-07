<template>
  <div class="experiences">
    <app-title>Experiences 👨‍🔧</app-title>
    <div class="list-of-experiences md:overflow-y-auto overflow-x-hidden md:h-90 md:pt-6">
      <experience-item
        v-for="experience in experiences"
        :key="experience.companyName"
        v-bind="experience"
      />
      <section class="w-full flex items-center flex-col">
        <span class="line" />
        <div class="dot rounded-full" />
      </section>
    </div>
  </div>
</template>
<script>
import ExperienceItem from '~/components/experience-item'
import Experiences from '~/assets/experiences.json'

export default {
  name: 'Experiences',
  components: {
    ExperienceItem
  },
  asyncData ({ server }) {
    return {
      experiences: Experiences.experiences.reverse()
    }
  }
}
</script>
<style lang="scss" scoped>
.experiences {
  .line {
    display: block;
    height: 70px;
  }
  .dot {
    height: 30px;
    width: 30px;
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
