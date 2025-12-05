<template>
  <nav
    class="nav__mobile__bottom px-4 fixed w-full bottom-0 left-0 right-0 md:hidden bg-secondary"
  >
    <ul
      class="flex w-full gap-4 justify-between items-center h-16 border-box py-2"
    >
      <template
        v-for="item in menuItems.filter((i) => !i.external)"
        :key="item.url"
      >
        <li
          class="flex items-center w-1/5 h-full text-center rounded-full overflow-hidden"
        >
          <!-- Internal -->
          <nuxt-link
            v-if="!item.external"
            :to="item.url"
            class="h-full w-full flex items-center justify-center"
            :aria-label="$t(item.text)"
          >
            <NavIcon :icon="item.icon" />
          </nuxt-link>
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

<style scoped>
.nav__mobile__bottom .router-link-active {
  background-color: var(--bg);

  & i {
    color: #ffdb11;
  }
}

.nav__mobile__bottom {
  height: 60px !important;
}
</style>
