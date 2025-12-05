<template>
  <div class="experiences">
    <AppTitle>{{ $t("menu.experiences") }}</AppTitle>
    <div
      class="list-of-experiences md:overflow-y-auto overflow-x-hidden md:h-90 md:pt-6"
    >
      <ExperienceItem
        v-for="experience in data?.experiences"
        :key="experience.companyName"
        :company-logo="experience.companyLogo"
        :company-name="experience.companyName"
        :role="experience.role"
        :start-date="experience.startDate"
        :end-date="experience.endDate"
        :location="experience.location"
        :website="experience.website"
      />
      <section class="w-full flex items-center flex-col">
        <span class="line" />
        <div class="dot rounded-full" />
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import ExperienceItem from "~/components/ExperienceItem.vue";
import AppTitle from "~/components/Title.vue";

export interface Root {
  scheme: string;
  description: string;
  author: string;
  version: string;
  experiences: Experience[];
}

export interface Experience {
  companyLogo: string;
  companyName: string;
  website: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
}

const { data } = useAsyncData<Root>(() => import("~/assets/experiences.json"), {
  immediate: true,
});

useHead({
  title: computed(() => `Acidiney Dias | ${$t("menu.experiences")}`),
});
</script>

<style scoped>
.experiences .line {
  display: block;
  height: 70px;
}
.experiences .dot {
  height: 30px;
  width: 30px;
}
@media (min-width: 768px) {
  .md\:h-90 {
    height: 86vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .md\:h-90::webkit-scrollbar {
    display: none;
  }
}
</style>
