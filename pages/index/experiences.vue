<template>
  <div class="experiences">
    <app-title>Experiences 👨‍🔧</app-title>
    <div class="list-of-experiences md:overflow-y-auto overflow-x-hidden h-90 md:pt-6">
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
export default {
  name: 'Experiences',
  components: {
    ExperienceItem
  },
  async asyncData ({ server }) {
    let experiences = []
    if (!server) {
      await fetch('http://localhost:3000/experiences.json')
        .then(redeable => redeable.json())
        .then((data) => {
          experiences = data.experiences && data.experiences.reverse()
        })
    }

    return {
      experiences
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
 .h-90 {
    height: 86vh;
  }
</style>
