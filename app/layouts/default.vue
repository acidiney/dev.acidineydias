<template>
  <ClientOnly>
    <div
      :class="[
        `h-screen overflow-hidden fixed theme-${website.theme} md:overflow-y-hidden box-border`,
      ]"
    >
      <NavMobileTop :available-locales="availableLocales" />

      <div
        ref="mainContent"
        class="px-4 md:px-0 md:w-4/5 mx-auto pt-14 h-[calc(100svh-7.5svh)] md:pt-0 md:h-auto overflow-y-auto"
      >
        <NavDesktop
          :menu-items="menuItems"
          :available-locales="availableLocales"
        />

        <MainContent>
          <NuxtPage />
        </MainContent>
      </div>

      <NavMobileBottom :menu-items="menuItems" />
    </div>
  </ClientOnly>
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
const mainContent = ref<HTMLDivElement>();
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

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  mainContent.value?.scrollTo(0, 0);
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
