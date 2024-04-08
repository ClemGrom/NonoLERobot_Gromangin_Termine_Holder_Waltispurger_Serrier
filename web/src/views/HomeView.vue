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
          link: "/"
        },
        {
          title: "A propos",
          description: "Qu'est-ce que Nono le robot?",
          link: "/"
        },
        {
          title: "Tutoriel",
          description: "Apprends comment programmer nono!",
          link: "/"
        },
        {
          title: "Jouer",
          description: "Il est temps de commencer à jouer!",
          link: "/robotMoteur"
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
        <SlideContent :title="slide.title" :description="slide.description" :link="index === 0 ? '' : slide.link" />
      </Slide>

      <template #addons>
        <navigation>
          <template #next>
            <span> >> </span>
          </template>
          <template #prev>
            <span> << </span>
          </template>
        </navigation>
        <pagination />
      </template>

    </Carousel>
  </main>
</template>

<style scoped>
.carousel__item {
  min-height: 800px;
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

span {
  border: 5px solid white;
  background-color: red;
  border-radius: 25px;
}
</style>
