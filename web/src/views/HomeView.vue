<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import SlideContent from "@/components/homeComponent.vue";

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    SlideContent,
  },
  data() {
    return {
      slidesData: [
        {
          title: "NONO LE ROBOT",
          description: "Nono, le robot à programmer!",
          link: "/",
          index: 0
        },
        {
          title: "A propos",
          description: "Qu'est-ce que Nono le robot?",
          link: "/",
          index: 1
        },
        {
          title: "Tutoriel",
          description: "Apprends comment programmer nono!",
          link: "/",
          index: 2
        },
        {
          title: "Jouer",
          description: "Il est temps de commencer à jouer!",
          link: "/robotMoteur",
          index: 3
        },
      ]
    }
  }
})
</script>

<template>
  <main>
    <Carousel>
      <Slide v-for="(slide, index) in slidesData" :key="index">
        <SlideContent class="carousel__item" :title="slide.title" :description="slide.description" :link="index === 0 ? '' : slide.link" :index="slide.index" />
      </Slide>

      <template #addons>
        <navigation>
          <template #next>
            <span class="text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-14 "> >> </span>
          </template>
          <template #prev>
            <span class="text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-14 "> << </span>
          </template>
        </navigation>
        <pagination />
      </template>

    </Carousel>
  </main>
</template>

<style scoped>
.carousel__item {
  min-height: 78vh;
  width: 100%;
  background-color: transparent;
  color:white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  background-color: red;
}

.custom-navigation,
.custom-pagination {
  color: white !important;
}

:root {
  --carousel-color-primary: red;
}

</style>
