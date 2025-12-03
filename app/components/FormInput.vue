<template>
  <input
    :type="type"
    :name="name"
    required
    :aria-label="arialabel"
    :placeholder="placeholder"
    @input="writeText(name, $event)"
  >
</template>

<script setup lang="ts">
defineProps<{
  name: string
  type: string
  placeholder: string
  arialabel: string
  writeText: (name: string, event: any) => void
}>()
</script>

<script lang="ts">
export default {
  name: 'FormInput',
}
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 30px;
}
</style>
