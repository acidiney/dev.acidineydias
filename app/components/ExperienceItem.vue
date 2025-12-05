<template>
  <div class="experience-item flex-col items-center flex md:mx-8">
    <span class="line" />
    <a target="__blank" rel="noreferrer" :href="website" class="content">
      <div class="thumbnail hidden md:block">
        <img :src="companyLogo" :alt="companyName" />
      </div>
      <div class="description px-3 py-3 border-box">
        <div class="md:hidden flex items-center justify-center mb-2 mb:m-0">
          <img
            class="h-8 w-8 rounded-full"
            :src="companyLogo"
            :alt="companyName"
          />
        </div>
        <header class="text-center md:text-left">
          <h3>{{ role }}</h3>
          <h4>{{ companyName }}</h4>
          <h4>{{ startDate }} - {{ endDate }}</h4>
        </header>
        <footer class="text-center md:text-right md:pr-6">
          <span>{{ location }}</span>
        </footer>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  companyLogo: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  website: string;
}>();
</script>

<script lang="ts">
export default {
  name: "ExperienceItem",
};
</script>

<style scoped>
.experience-item .line {
  display: block;
  height: 70px;
}
.experience-item:first-child .line {
  display: none;
}
.experience-item .content {
  height: 160px;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
}
.experience-item .content .thumbnail {
  flex: 0.25;
  height: 100%;
}
.experience-item .content .thumbnail img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.experience-item .content:hover {
  transform: scale(1.08);
}
.experience-item .content .description {
  flex: 1;
}
.experience-item .content .description header h3 {
  font-size: 14pt;
  font-weight: 600;
}
.experience-item .content .description header h4 {
  font-size: 12pt;
  font-weight: 200 !important;
  font-family: "Gothic A1", -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.experience-item .content .description footer span {
  font-weight: 200;
}
</style>
