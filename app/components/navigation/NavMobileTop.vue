<template>
  <nav class="fixed top-0 left-0 right-0 md:hidden h-14">
    <div class="w-4/5 mx-auto h-full flex items-center justify-between">
      <div class="flex gap-3">
        <NuxtLink
          v-for="locale in availableLocales"
          :key="locale.code"
          class="text-primary"
          :to="switchLocalePath(locale.code as any)"
        >
          {{ locale.code.toUpperCase() }}
        </NuxtLink>
      </div>

      <button
        :title="$t('toggle-theme')"
        :aria-label="$t('toggle-theme')"
        class="text-primary"
        @click="website.toggleTheme"
      >
        <i :class="`icon-${website.theme === 'dark' ? 'sun' : 'moon'}`" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { Locale } from "~/types/locale.type";

const website = useWebsiteStore();
const switchLocalePath = useSwitchLocalePath();

defineProps<{
  availableLocales: Locale[];
}>();
</script>
