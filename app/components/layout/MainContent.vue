<template>
  <div
    class="w-full flex gap-5 flex-col md:flex-row md:justify-between md:overflow-hidden h-full"
  >
    <div class="w-full md:w-1/2 h-full overflow-hidden">
      <AboutMe />
    </div>

    <div class="w-full md:w-1/2 hidden md:block">
      <NuxtPage />
    </div>
  </div>
</template>
