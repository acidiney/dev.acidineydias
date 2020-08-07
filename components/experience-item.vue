<template functional>
  <div class="experience-item flex-col items-center flex md:mx-8">
    <span class="line" />
    <a target="__blank" rel="noreferrer" :href="props.website" class="content">
      <div class="thumbnail hidden md:block">
        <img :src="props.companyLogo" :alt="props.companyName">
      </div>
      <div class="description px-3 py-3 border-box">
        <header class="text-center md:text-left">
          <h3>{{ props.role }}</h3>
          <h4>{{ props.companyName }}</h4>
          <h4>{{ props.startDate }} - {{ props.endDate }}</h4>
        </header>
        <footer class="text-center md:text-right md:pr-6">
          <span>{{ props.location }}</span>
        </footer>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.experience-item {
  .line {
    display: block;
    height: 70px;
  }

  &:first-child {
    .line {
      display: none;
    }
  }

  .content {
    height: 130px;
    width: 100%;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    .thumbnail {
      flex: 0.25;
      height: 100%;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

    &:hover {
      transform: scale(1.08);
    }

    .description {
      flex: 1;
      header {
        h3 {
          font-size: 14pt;
          font-weight: 600;
        }

        h4 {
          font-weight: 200;
        }
      }

      footer {
        span {
          font-weight: 200;
        }
      }
    }
  }
}
</style>
