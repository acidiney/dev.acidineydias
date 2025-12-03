<template>
  <div
      :class="[
      { 'overflow-hidden': showMenu },
      `md:fixed theme-${website.theme} md:overflow-y-hidden box-border`
    ]"
  >
    <div class="w-4/5 mx-auto pb-6 md:pb-0">
      <nav class="py-6">
        <ul class="left hidden items-center md:flex">
          <template v-for="item in menuItems" :key="item.url">
            <li class="flex">
              <nuxt-link
                  v-if="!item.external"
                 :to="item.url"
              >
                {{ $t(item.text) }}
              </nuxt-link>
              <a
                  v-else
                  :href="item.url"
                  class="underline"
              >
                {{ $t(item.text) }}
              </a>
              <span v-if="item.separator" class="separator" />
            </li>
          </template>
        </ul>
        <ul class="right flex">
          <li class="mr-4">
            <NuxtLink
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
            >
              {{ locale.code.toUpperCase() }}
            </NuxtLink>
          </li>
          <li>
            <button
                :title="$t('toggle-theme')"
                :aria-label="$t('toggle-theme')" @click="website.toggleTheme">
              <i :class="`extra-${website.theme === 'dark' ? 'light' : 'dark'}`" />
            </button>
          </li>
        </ul>
        <button class="menu-button flex md:hidden" @click="toggleMenu">
          <i class="extra-th-menu" />
          <span class="sr-only">Menu</span>
        </button>
      </nav>

      <div class="w-full flex gap-5 flex-col md:justify-between md:flex-row md:overflow-hidden">
        <div class="w-full md:w-1/2">
        <AboutMe />
        </div>
        <div class="w-full md:w-1/2">
        <NuxtPage />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="showMenu"
          class="mobile-menu fixed h-full w-full left-0 top-0 "
      >
        <button class="text-2xl absolute right-0 top-0" @click="toggleMenu">
          &times;
        </button>
        <ul class="justify-center items-center flex h-full flex-col">
          <template v-for="item in menuItems" :key="item.url">
            <li class="flex text-4xl mb-4">
              <nuxt-link
                  v-if="!item.external"
                  :to="item.url"
              >
                {{ $t(item.text) }}
              </nuxt-link>
              <a
                  v-else
                  class="underline"
                  :href="item.url"
              >
                {{ $t(item.text) }}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const website = useWebsiteStore()

const showMenu = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const menuItems  = computed(() => {


const basePath = locale.value === 'en' ? '' : `/${locale.value}`


return      [
  {
    url: 'https://blog.acidineydias.dev',
    text: 'menu.blog',
    separator: true,
    external: true
  },
        {
          url: `${basePath}/`,
          text: 'menu.openSource',
          separator: true
        },

        {
          url: `${basePath}/technologies`,
          text: 'menu.technologies',
          separator: true
        },
        {
          url: `${basePath}/experiences`,
          text: 'menu.experiences',
          separator: true
        },
        {
          url: `${basePath}/contact`,
          text: 'menu.contact',
          separator: false
        }
      ]
    }
)


const toggleMenu = ()=> {
  showMenu.value = !showMenu.value
}

onMounted(() => {
  website.initTheme()
})

useHead({
  bodyAttrs: {
    class: {
      'md:fixed': true,
      'theme-light': () => website.theme === 'light',
      'theme-dark': () => website.theme === 'dark'
    }
  },
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})

const router = useRouter()

watch(router.currentRoute, () => showMenu.value = false)

</script>

<script lang="ts">
export default {
  name: "DefaultLayout",
}
</script>
