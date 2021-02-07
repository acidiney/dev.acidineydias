<template>
  <div
    :class="[
      { 'overflow-hidden': showMenu },
      `theme-${theme} overflow-y-auto box-border`
    ]"
  >
    <div class="w-4/5 mx-auto pb-6 md:pb-0">
      <nav class="py-6">
        <ul class="left hidden items-center md:flex">
          <template v-for="item in menuItens">
            <li :key="item.url" class="flex">
              <nuxt-link
                v-if="!item.external"
                :class="{ active: $route.path === item.url }"
                :to="item.url"
              >
                {{ item.text }}
              </nuxt-link>
              <a
                v-else
                :class="{ active: $route.path === item.url }"
                :href="item.url"
              >
                {{ item.text }}
              </a>
              <span v-if="item.separator" class="separator" />
            </li>
          </template>
        </ul>
        <ul class="right">
          <li>
            <button @click="changeTheme(theme)">
              <i :class="`extra-${theme === 'dark' ? 'light' : 'dark'}`" />
            </button>
          </li>
        </ul>
        <button class="collapse flex md:hidden" @click="toogleMenu">
          <i class="extra-th-menu" />
        </button>
      </nav>
      <nuxt />
    </div>
    <transition name="fade">
      <div
        v-if="showMenu"
        class="mobile-menu fixed h-full w-full left-0 top-0 "
      >
        <button class="text-2xl absolute right-0 top-0" @click="toogleMenu">
          &times;
        </button>
        <ul class="justify-center items-center flex h-full flex-col">
          <template v-for="item in menuItens">
            <li :key="item.url" class="flex text-4xl mb-4">
              <nuxt-link
                v-if="!item.external"
                :class="{ active: $route.path === item.url }"
                :to="item.url"
              >
                {{ item.text }}
              </nuxt-link>
              <a
                v-else
                :class="{ active: $route.path === item.url }"
                :href="item.url"
              >
                {{ item.text }}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    theme () {
      return this.$store.getters.theme
    },
    currentMenu () {
      return this.$store.getters.currentMenu
    },
    menuItens () {
      return [
        {
          url: '/',
          text: 'Open Source Projects',
          separator: true
        },
        {
          url: 'https://blog.acidineydias.me',
          text: 'Blog Articles',
          separator: true,
          external: true
        },
        {
          url: '/technologies',
          text: 'Technologies',
          separator: true
        },
        {
          url: '/experiences',
          text: 'Experiences',
          separator: true
        },
        {
          url: '/contact',
          text: 'Contact',
          separator: false
        }
      ]
    }
  },
  watch: {
    $route () {
      this.showMenu = false
    }
  },
  methods: {
    changeTheme (currentTheme) {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      this.$store.commit('setTheme', nextTheme)
    },
    changePage (nextPage) {
      this.$router.push(nextPage)
    },
    toogleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
