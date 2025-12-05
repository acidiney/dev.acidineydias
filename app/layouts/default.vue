<template>
  <div
    v-if="canRender"
    :class="[
      `h-screen overflow-hidden md:fixed theme-${website.theme} md:overflow-y-hidden box-border`,
    ]"
  >
    <NavMobileTop :available-locales="availableLocales" :website="website" />

    <div
      class="w-4/5 mx-auto pt-14 md:pt-0 h-[calc(100vh-64px-56px)] md:h-auto overflow-hidden"
    >
      <NavDesktop
        :menu-items="menuItems"
        :available-locales="availableLocales"
        :website="website"
      />

      <MainContent />
    </div>

    <NavMobileBottom :menu-items="menuItems" />
  </div>
</template>

<script lang="ts" setup>
import NavDesktop from "@/components/navigation/NavDesktop.vue";
import MenuItems from "~/assets/menu.json";
import MainContent from "~/components/layout/MainContent.vue";
import NavMobileBottom from "~/components/navigation/NavMobileBottom.vue";
import NavMobileTop from "~/components/navigation/NavMobileTop.vue";
import type { Locale } from "~/types/locale.type";

const { locale, locales } = useI18n();

const website = useWebsiteStore();
const canRender = ref(false);

const availableLocales = computed<Locale[]>(() => {
  return locales.value
    .filter((i) => i.code !== locale.value)
    .map((i) => ({
      code: i.code,
    }));
});

const menuItems = computed(() => {
  const basePath = locale.value === "en" ? "" : `/${locale.value}`;

  return MenuItems.map((i) => ({
    ...i,
    url: i.external ? i.url : `${basePath}${i.url}`,
  }));
});

onBeforeMount(() => {
  website.initTheme();
  canRender.value = true;
});

useHead({
  bodyAttrs: {
    class: {
      "md:fixed": true,
      "theme-light": () => website.theme === "light",
      "theme-dark": () => website.theme === "dark",
    },
  },
  meta: computed(() => {
    const themeColor = website.theme === "dark" ? "#212121" : "#f0f0f0";

    return [
      { name: "msapplication-TileColor", content: themeColor },
      { name: "theme-color", content: themeColor },
    ];
  }),
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
});
</script>

<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>
