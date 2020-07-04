<template>
  <div
    :class="`image-placeholder`"
  >
    <img
      :data-src="imageUrl"
      :data-loading="imageUrl"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt"
    >
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.image-placeholder {
  overflow: hidden;
  line-height: 0;
}
.image-placeholder--rounded {
  border-radius: 100%;
}
img {
  transition: all ease 0.3s;
  opacity: 0;
}
img[lazy='loading'] {
  opacity: 1;
  filter: blur(5px);
}
img[lazy='loaded'] {
  opacity: 1;
}

.h-54 {
  height: 80vh !important;
}

</style>
