<template>
  <div :class="[{'overflow-hidden': showMenu}, `theme-${theme} overflow-y-auto box-border`]">
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
        <button class="collapse flex md:hidden" @click="toogleMenu">
          <i class="extra-th-menu" />
        </button>
      </nav>
      <nuxt />
    </div>
    <transition name="fade">
      <div v-if="showMenu" class="mobile-menu fixed h-full w-full left-0 top-0 ">
        <button class="text-2xl absolute right-0 top-0" @click="toogleMenu">
          &times;
        </button>
        <ul class="justify-center items-center flex h-full flex-col">
          <template v-for="item in menuItens">
            <li :key="item.slug" class="flex text-4xl mb-4">
              <nuxt-link :class="{'active': $route.path === item.slug}" :to="item.slug">
                {{ item.text }}
              </nuxt-link>
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

<style lang="scss">
@import "@/assets/scss/index";

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

.mobile-menu {
  backdrop-filter: blur(2px);
  button.absolute {
    right: 10px;
    top: 10px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content:center;
    height: 35px;
    border-radius:25px;
    align-content: center;
  }
}
</style>
