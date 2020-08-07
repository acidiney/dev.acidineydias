<template>
  <div :class="`theme-${theme} overflow-y-auto box-border`">
    <div class="w-4/5 mx-auto pb-6 md:pb-0">
      <nav class="py-6">
        <ul class="left hidden items-center md:flex">
          <template v-for="item in menuItens">
            <li :key="item.slug" class="flex">
              <nuxt-link :class="{'active': $route.path === item.slug}" :to="item.slug">
                {{ item.text }}
              </nuxt-link>
              <span v-if="item.separator" class="separator" />
            </li>
          </template>
        </ul>
        <ul class="right">
          <li>
            <button @click="changeTheme(theme)">
              <i :class="`extra-${ theme === 'dark' ? 'light' : 'dark' }`" />
            </button>
          </li>
        </ul>
        <button class="collapse flex md:hidden">
          <i class="extra-th-menu" />
        </button>
      </nav>
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
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
          slug: '/',
          text: 'Blog Articles',
          separator: true
        },
        {
          slug: '/technologies',
          text: 'Technologies',
          separator: true
        },
        {
          slug: '/experiences',
          text: 'Experiences',
          separator: true
        },
        {
          slug: '/projects',
          text: 'Projects',
          separator: false
        }
      ]
    }
  },
  methods: {
    changeTheme (currentTheme) {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      this.$store.commit('setTheme', nextTheme)
    },
    changePage (nextPage) {
      this.$router.push(nextPage)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/index";
html {
  font-family: "Gothic A1", 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul.left {
    span.separator {
      margin: 0 5px;
    }
  }
  ul.left, ul.right {
    a {
      outline: none;
      display: flex;
    }
  }
}
</style>
