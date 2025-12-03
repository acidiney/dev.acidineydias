<template>
  <div :class="['about-me md:h-full  flex-col md:flex']">
    <div class="">
      <header class="flex flex-col">
        <figure>
          <img
            src="/images/24493328.jpg"
            class="w-32 h-32 rounded-full mb-6 object-cover object-right-top"
            :alt="$t('avatar.alt')"
          />
        </figure>
      </header>
      <footer>
        <h1 class="text-5xl" v-html="$t('hello')" />

        <br />
        <p class="md:w-4/5" v-html="$t('cover')" />

        <br />
        <a
          class="text-left download-button md:mr-5 block"
          :href="$t('cv_link')"
          target="__blank"
          :aria-label="$t('downloadCV')"
        >
          <i class="icon-download" /> {{ $t("downloadCV") }}.
        </a>

        <!-- last article published -->

        <br />
        <div v-if="lastPost">
          <AppTitle>{{ $t("last-article") }}</AppTitle>
          <section class="last-article w-4/5 py-6">
            <a
              target="_blank"
              class="block text-base/6"
              rel="noreferrer"
              :href="lastPost.link"
            >
              <span class="mt-4">{{ formateDate(lastPost.pubDate) }}</span>
              <p class="title text-2xl">
                {{ capitalize(lastPost.title.trim()) }}
              </p>
              <div class="categories flex-wrap mt-2 flex">
                <p class="mr-2 text-xs rounded capitalize">
                  {{ lastPost.description }}
                </p>
              </div>
            </a>
          </section>
        </div>

        <div class="social mt-4 md:fixed bottom-0 flex-col flex">
          <ul class="flex mb-2">
            <li v-for="social in socials" :key="'content' + social.icon">
              <a
                class="text"
                :href="social.link"
                :aria-label="$t(social['aria-label'])"
              >
                <i class="icon-2x" :class="social.icon" />
                <span class="sr-only">{{ $t(social["aria-label"]) }}</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialNetworks from "~/assets/social.json";
import { capitalize, formateDate } from "~/filters";
import AppTitle from "~/components/Title.vue";

type SocialNetwork = {
  link: string;
  icon: string;
  "aria-label": string;
};

const socials = computed<SocialNetwork[]>(() => SocialNetworks);

useHead({
  title: "Acidiney Dias | Full stack developer",
  meta: [
    {
      name: "description",
      content:
        "Hello, I'm Acidiney Dias a software developer, and it is my little home.",
    },
  ],
});

type LastPost = {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
};

const lastPost = ref<LastPost | null>(null);
const loadingPost = ref(true);

const fetchLatestPost = async () => {
  try {
    lastPost.value = await $fetch<LastPost | null>("/api/latest-article", {
      method: "GET",
    });
  } catch (e) {
    lastPost.value = null;
  } finally {
    loadingPost.value = false;
  }
};

onMounted(fetchLatestPost);
</script>

<script lang="ts">
export default {
  name: "AboutMe",
};
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
