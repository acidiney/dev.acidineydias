<template>
  <div
    class="w-full flex gap-5 flex-col md:flex-row md:justify-between md:overflow-hidden h-full"
  >
    <div class="hidden md:flex w-full md:w-1/2 h-full overflow-hidden">
      <AboutMe />
    </div>

    <div class="w-full md:w-1/2 pt-2 md:pt-0 md:overflow-auto">
      <slot />
    </div>
  </div>
</template>
