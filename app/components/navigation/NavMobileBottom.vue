<template>
  <nav
    class="px-4 fixed w-full bottom-0 left-0 right-0 md:hidden border-t bg-secondary backdrop-blur"
  >
    <ul class="flex justify-between items-center h-16 px-4">
      <template v-for="item in menuItems" :key="item.url">
        <li>
          <!-- Internal -->
          <nuxt-link
            v-if="!item.external"
            :to="item.url"
            class="p-3"
            :aria-label="$t(item.text)"
          >
            <NavIcon :name="item.text" />
          </nuxt-link>

          <!-- External -->
          <a
            v-else
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3"
            :aria-label="$t(item.text)"
          >
            <NavIcon name="default" />
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import NavIcon from "~/components/navigation/NavIcon.vue";
import type { MenuItem } from "~/types/menu-item.type";

defineProps<{
  menuItems: MenuItem[];
}>();
</script>
