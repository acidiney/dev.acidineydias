<template>
  <div class="technologies">
    <AppTitle>{{ $t("menu.technologies") }}</AppTitle>
    <div class="md:overflow-y-auto overflow-x-hidden md:h-90">
      <section
        v-for="tech in data?.technologies"
        :key="tech.name"
        class="tech-section py-2"
      >
        <h3 class="text-lg text-primary">
          {{ $t(`technologies.${tech.name}`) }}
        </h3>
        <div
          class="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-12 gap-5 icons py-2"
        >
          <i
            v-for="(icon, idx) in tech.icons"
            :key="icon + idx"
            :class="icon"
            :title="icon"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppTitle from "~/components/Title.vue";

export interface Root {
  scheme: string;
  description: string;
  author: string;
  version: string;
  technologies: Technology[];
}

export interface Technology {
  name: string;
  icons: string[];
}

const { data } = useAsyncData<Root>(async () => {
  return await import("~/assets/technologies.json");
});
useHead({
  title: computed(() => `Acidiney Dias | ${$t("menu.technologies")}`),
});
</script>

<script lang="ts">
export default {
  name: "Technologies",
};
</script>
<style scoped>
section h4 {
  font-weight: 300;
  font-family: "Gothic A1", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
section .icons i::before {
  font-size: 2em;
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
