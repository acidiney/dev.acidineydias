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
          separator: true
        },
        {
          slug: '/contact',
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

<style lang="scss">
@import "@/assets/scss/index";
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  transition: all .26s linear;
}

/* transaction animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Scroll 2 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #11171a;
  border-radius: 10px;
}

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

/// light
$light_primary_color: #f0f0f0;
$light_secondary_color: #212121;
$light_white_color: #fafafa;

.theme-light {
  background-color: $light_primary_color;
  height: 100%;
  width: 100%;
  position: fixed;

  nav {
    ul.left {
      a {
        font-weight: 100;

        &:hover {
          font-weight: 300;
        }
      }
      a.active {
        font-weight: 400;
      }
    }

    ul.right {
      li {
        button {
          i::before {
            color: $light_secondary_color;
            font-size: 18pt;
          }
        }
      }
    }

    .collapse {
      height: 30px;
      width: 30px;
      align-items: center;
      outline: none;
      justify-content: center;
      border: 1.5px solid $light_secondary_color;
      border-radius: 25px;
      i::before {
        color: $light_secondary_color;
      }

      &:hover {
        border-color: $light_secondary_color;

        i::before {
          color: $light_secondary_color;
        }
      }
    }
  }

  .mobile-menu {
    background-color: rgb(231,231,231, 0.81);
    color: $light_secondary_color;

    button.absolute {
      border: 1px solid $light_secondary_color;
      color: $light_secondary_color;
    }
  }

  .about-me {
    h1 {
      color: $light_secondary_color;
    }

    p {
      color: #333333;

      a {
        color: #222;
      }
    }

    a {
      color: #333;
    }

    .icon-2x:hover::before {
      color:rgba(148, 148, 149, 0.9);
    }

    .icon-2x::before {
      font-size: 2em;
      color: #333;
    }
  }

  .articles {
    article a {
      background-color: #3b3b3bbd;

      .categories p, h2, span {
        color: $light_primary_color;
      }
    }
    h2.sub-title {
      color: rgba(21,21,21, .82);
    }
  }

  .projects {
    article a {
      background: #fff;

      .categories p, h2, span {
        color: #3b3b3bbd;
      }

      h2.sub-title {
        color: #3b3b3bbd;
      }
    }

  }

  .contact {
    form {
      p {
        color: $light_secondary_color;
      }

      input::placeholder, textarea::placeholder {
        color: #444;
      }
    }

    button {
      background: $light_secondary_color;
      color: $light_primary_color;
      padding: 12px 30px;
      font-family: 'Gothic A1', sans-serif;
      &:hover {
        background:rgba(21, 21, 21, .82);
      }
    }
  }

  .app-title.sub-title {
    color: $light_secondary_color;
  }

  .article {
    color: #444;

    header {
      & p {
        color: #777;
      }

      .icon-2x::before {
        color: $light_secondary_color;
      }

      .icon-2x:hover::before {
        color:rgba(148, 148, 149, 0.9);
      }
    }
  }

  .technologies .tech-section h4 {
    color: $light_secondary_color;
  }

  .icon-instagram::before, .icon-linkedin::before, .icon-twitter::before {
    color: $light_secondary_color;
  }

  .experiences {

    .content, .dot {
      background-color:#fff;;
    }

    .content .description {
      color: $light_secondary_color;
    }

    .line {
      border-left: 1px solid #fff;
    }
  }
}
/// dark
$dark_primary_color: #212121;
$dark_secondary_color: #BABABA;
$dark_white_color: #fafafa;
$white: #fff;

.theme-dark {
  background-color: $dark_primary_color;
  height: 100%;
  width: 100%;
  position: fixed;

  nav {
    ul.left {
      color: $dark_white_color;
      a {
        font-weight: 100;
        transition: all .26s linear;

        &:hover {
          font-weight: 300;
        }
      }
      a.active {
        font-weight: 400;
      }
    }

    ul.right {
      li {
        button {
          i::before {
            color: $dark_secondary_color;
            font-size: 18pt;
          }
        }
      }
    }

    .collapse {
      height: 30px;
      width: 30px;
      align-items: center;
      outline: none;
      justify-content: center;
      border: 1.5px solid $dark_secondary_color;
      border-radius: 25px;
      i::before {
        color: $dark_secondary_color;
      }

      &:hover {
        border-color: $dark_white_color;

        i::before {
          color: $dark_white_color;
        }
      }
    }
  }

  .mobile-menu {
    background-color: rgba(21,21,21, .82);
    color: $dark_white_color;

    button.absolute {
      border: 1px solid #fff;
      color: #fff;
    }
  }

  .about-me {
    h1 {
      color: $dark_white_color;
    }

    p {
      color: #BABABA;

      a {
        color: #fff;
      }
    }

    .icon-2x:hover::before {
      color:rgba(148, 148, 149, 0.9);
    }

    .icon-2x::before {
      font-size: 2em;
      color: #fff;
    }
  }

  .contact {
    form {
      p {
        color: $dark_secondary_color;
      }

      input::placeholder, textarea::placeholder {
        color:$dark_secondary_color;
      }

      input, textarea {
        background-color:rgba(21, 21, 21, .82);
        color:$white;
      }
    }

    button {
      background: rgba(21, 21, 21, .82);
      color: $white;
      padding: 12px 30px;
      font-family: 'Gothic A1', sans-serif;
      &:hover {
        background: rgba(15, 15, 15, 1);
      }
    }
  }

  .articles, .projects {
    article a {
      background-color: rgba(21,21,21, .82);

      .categories p, h2, span {
        color: $dark_white_color;
      }
    }
    h2.sub-title {
      color: $dark_white_color;
    }
  }

  .article {
    color: $dark_white_color;

    header {

      & p {
        color:rgba(148, 148, 149, 0.9);
      }
      .icon-2x::before {
        color: $dark_white_color;
      }

      .icon-2x:hover::before {
        color:rgba(148, 148, 149, 0.9);
      }
    }
  }
  .app-title.sub-title {
    color: $white;
  }

  .technologies .tech-section h4 {
    color: $dark_white_color;
  }

  .icon-github::before, .icon-medium::before, .icon-steam::before, .icon-rust::before, .icon-stylus::before, .icon-deno::before, .icon-jetbrains::before {
    color: $dark_white_color;
  }

  .experiences {

    .content, .dot {
      background-color: rgba(21,21,21, .82);
    }

    .content .description {
      color: $dark_white_color;
    }

    .line {
      border-left: 1px solid rgba(21, 21, 21, .82);
    }
  }
}

</style>
