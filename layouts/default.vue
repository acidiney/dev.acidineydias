<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
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
  background: #212121;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

</style>
