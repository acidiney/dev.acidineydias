<template>
    <div :class="['about-me md:h-full  flex-col md:flex']">
      <div class="">
        <header class="flex flex-col">
          <figure>
            <img
                src="/images/avatar.jpeg"
                class="w-32 h-32 rounded-full mb-6 object-cover object-right-top"
                :alt="$t('avatar.alt')"
            >
          </figure>
        </header>
        <footer>
          <h1 class="text-5xl" v-html="$t('hello')" />

          <br />
          <p  class="md:w-4/5" v-html="$t('cover')" />

          <br />
          <a
              class="text-left download-button md:mr-5 block"
              :href="$t('cv_link')"
              target="__blank"
              :aria-label="$t('downloadCV')"
          >
            <i class="icon-download" /> {{ $t('downloadCV') }}.
          </a>

          <div class="social mt-4 md:fixed bottom-0 flex-col flex">
            <ul class="flex mb-2">
              <li v-for="social in socials" :key="'content' + social.icon">
                <a
                    class="text"
                   :href="social.link"
                :aria-label="$t(social['aria-label'])"
                >
                  <i class="icon-2x" :class="social.icon" />
                  <span class="sr-only">{{ $t(social['aria-label']) }}</span>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
</template>

<script setup lang="ts">
import SocialNetworks from '~/assets/social.json'


type SocialNetwork = {
  link: string
  icon: string
  'aria-label': string
}

const socials = computed<SocialNetwork[]>(() => SocialNetworks)

useHead({
  title: 'Acidiney Dias | Full stack developer',
  meta: [
    {
      name: 'description',
      content: 'Hello, I\'m Acidiney Dias a software developer, and it is my little home.'
    }
  ]
})
</script>

<script lang="ts">
export default {
  name: "AboutMe"
}
</script>

<style scoped>
.about-me footer h1 {
  font-weight: 700;
}

.about-me footer {
  line-height: 1.5;
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

</style>
