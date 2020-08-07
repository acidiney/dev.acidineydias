<template>
  <div class="root flex flex-col md:flex-row md:overflow-hidden">
    <div :class="[{'hidden': !showPresentation}, 'about-me md:h-full md:w-2/4 flex-col md:flex']">
      <div class="">
        <header class="flex flex-col">
          <figure>
            <img
              src="~/assets/images/avatar.jpg"
              class="w-32 h-32 rounded-full mb-6 object-cover object-right-top"
              alt="avatar"
            >
          </figure>
        </header>
        <footer class="text-white">
          <h1 class="text-5xl">
            Hello, I’m <br>
            Acidiney Dias.
          </h1>

          <p class="md:w-4/5">
            I'm full stack developer, currently working as Frontend Lead at
            <a
              href="https://www.itgest.co.ao"
              target="__blank"
            >ITGest</a>. I'm a frontend addict and user experience, I love css with
            passion and always keep my mouth open when I discover a new
            possibilities. I love to see my systems working from front to back.
            I share my learnings on Youtube/Medium and anywhere that accepts me.
          </p>
          <a
            class="text-left md:mr-5 block"
            href="https://drive.google.com/file/d/1yVMbA1UqreruBaAi2mUT3otRwq2Wt4XB/view?usp=sharing"
            target="__blank"
          >
            <i class="icon-download" /> Download my CV.
          </a>

          <div class="social mt-4 md:fixed bottom-0 flex-col flex">
            <ul class="flex mb-2">
              <li v-for="social in socials" :key="'content' + social.icon">
                <a class="text" :href="social.link">
                  <i class="icon-2x" :class="social.icon" />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
    <div class="porfolio md:h-full md:w-2/4">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  data () {
    return {
      showPresentation: true
    }
  },
  computed: {
    socials () {
      return [
        { link: 'https://github.com/acidiney', icon: 'icon-github' },
        {
          link: 'https://www.youtube.com/channel/UCMjOcKmA1UjiimzRDNZ_uOQ',
          icon: 'icon-youtube'
        },
        // { link: 'https://medium.com/@acidiney', icon: 'icon-medium' },
        { link: 'https://linkedin.com/in/acidineydias', icon: 'icon-linkedin' },
        { link: 'https://twitter.com/acidineydias', icon: 'icon-twitter' },
        {
          link: 'https://www.instagram.com/acidineydias/',
          icon: 'icon-instagram'
        }
      ]
    },
    currentMenu () {
      return this.$store.getters.currentMenu
    }
  },
  watch: {
    $route: {
      handler () {
        this.showPresentation = false
        if (this.$route.path === '/') {
          this.showPresentation = true
        }
      },
      immediate: true
    }
  },
  head () {
    return {
      title: 'Acidiney Dias | Full stack developer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Hello, I'm Acidiney Dias a software developer, and it is my little home."
        }
      ]
    }
  }
}
</script>

<style scoped>
.root {
  position: relative;
}
.about-me footer h1 {
  font-weight: 700;
}

.about-me footer p {
  font-weight: 300;
}

.about-me footer p a {
  text-decoration: underline;
}

.icon-2x {
  margin-right: 10px;
}

.nothing-to-show {
  color: rgba(148, 148, 149, 0.9);
}

@media (min-width: 768px) {
  .root {
    height: 100%;
  }
}
</style>
