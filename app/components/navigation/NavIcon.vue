<template>
  <i :key="icon" class="text-primary" :class="icon" :title="icon" />
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
}>();
</script>
