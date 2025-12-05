<template>
  <div class="root">
    <div class="block md:hidden">
      <AboutMe />
    </div>

    <Experiences class="hidden md:block" />
  </div>
</template>
<script setup lang="ts">
import Experiences from "./experiences.vue";

useHead({
  title: computed(() => `Acidiney Dias | Full stack developer`),
});
</script>
