<template>
  <h2 class="app-title sub-title text-xl text-center md:text-left mb-3 mt-3 md:mt-0">
    <slot />
  </h2>
</template>

<script>
export default {
  name: 'AppTitle'
}
</script>

<style scoped>
.sub-title {
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
}
</style>
