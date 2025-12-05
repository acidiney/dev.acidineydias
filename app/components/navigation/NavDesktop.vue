<template>
  <nav class="py-6 hidden md:flex">
    <!-- Left menu -->
    <ul class="left hidden md:flex items-center">
      <template v-for="item in menuItems" :key="item.url">
        <li class="flex">
          <nuxt-link v-if="!item.external" :to="item.url">
            {{ $t(item.text) }}
          </nuxt-link>

          <a v-else :href="item.url" class="underline">
            {{ $t(item.text) }}
          </a>

          <span v-if="item.separator" class="separator" />
        </li>
      </template>
    </ul>

    <!-- Right controls -->
    <ul class="right flex">
      <li class="mr-4">
        <NuxtLink
          v-for="l in availableLocales"
          :key="l.code"
          :to="switchLocalePath(l.code as any)"
        >
          {{ l.code.toUpperCase() }}
        </NuxtLink>
      </li>

      <li>
        <button
          :title="$t('toggle-theme')"
          :aria-label="$t('toggle-theme')"
          @click="website.toggleTheme"
        >
          <i :class="`icon-${website.theme === 'dark' ? 'sun' : 'moon'}`" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { Locale } from "~/types/locale.type";
import type { MenuItem } from "~/types/menu-item.type";

const website = useWebsiteStore();
const switchLocalePath = useSwitchLocalePath();

defineProps<{
  menuItems: MenuItem[];
  availableLocales: Locale[];
}>();
</script>
