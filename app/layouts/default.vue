<template>
  <div
    v-if="canRender"
    :class="[
      `h-screen overflow-hidden md:fixed theme-${website.theme} md:overflow-y-hidden box-border`,
    ]"
  >
    <div class="w-4/5 mx-auto h-[calc(100vh-64px)] md:h-auto overflow-hidden">
      <nav class="py-6 hidden md:block">
        <ul class="left hidden items-center md:flex">
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
        <ul class="right flex">
          <li class="mr-4">
            <NuxtLink
              v-for="l in availableLocales"
              :key="l.code"
              :to="switchLocalePath(l.code)"
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
              <i
                :class="`extra-${website.theme === 'dark' ? 'light' : 'dark'}`"
              />
            </button>
          </li>
        </ul>
      </nav>

      <div
        class="w-full flex gap-5 flex-col md:justify-between md:flex-row md:overflow-hidden h-full"
      >
        <div class="w-full md:w-1/2 h-full overflow-hidden">
          <AboutMe />
        </div>
        <div class="w-full md:w-1/2 hidden md:block">
          <NuxtPage />
        </div>
      </div>
    </div>
    <nav
      class="px-4 fixed w-full block bottom-0 left-0 right-0 md:hidden border-t bg-secondary backdrop-blur"
    >
      <ul class="flex justify-between items-center h-16 px-4">
        <template v-for="item in menuItems" :key="item.url">
          <li>
            <nuxt-link
              v-if="!item.external"
              :to="item.url"
              class="p-3"
              :aria-label="$t(item.text)"
            >
              <svg
                v-if="item.text === 'menu.experiences'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 7h18" />
                <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                <path d="M8 13h8" />
              </svg>
              <svg
                v-else-if="item.text === 'menu.technologies'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <svg
                v-else-if="item.text === 'menu.openSource'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 18a4 4 0 0 0-8 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <svg
                v-else-if="item.text === 'menu.contact'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8v8H8z" />
              </svg>
            </nuxt-link>
            <a
              v-else
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3"
              :aria-label="$t(item.text)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8v8H8z" />
              </svg>
            </a>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const website = useWebsiteStore();
const canRender = ref(false);

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const menuItems = computed(() => {
  const basePath = locale.value === "en" ? "" : `/${locale.value}`;

  return [
    {
      url: "https://blog.acidineydias.dev",
      text: "menu.blog",
      separator: true,
      external: true,
    },
    {
      url: `${basePath}/`,
      text: "menu.experiences",
      separator: true,
    },

    {
      url: `${basePath}/technologies`,
      text: "menu.technologies",
      separator: true,
    },
    {
      url: `${basePath}/open-source`,
      text: "menu.openSource",
      separator: true,
    },
    {
      url: `${basePath}/contact`,
      text: "menu.contact",
      separator: false,
    },
  ];
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
