<!-- MyComponent.vue -->
<template>
  <RouterLink :to="routerLink">
    <div :class="cardClasses" class="card justify-center items-center block m-2">
    <div class="title">{{ title }}</div>
    <div class="description">{{ description }}</div>
    <router-link class="link" :to="routerLink">{{ routerText }}</router-link>
  </div>
  </RouterLink>
  
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    routerLink: {
      type: String,
      required: true
    },
    routerText: {
      type: String,
      default: 'En savoir plus'
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    cardClasses() {
      const classes = [
        'card',
        'text-white',
        'text-2xl',
        'font-bold',
        'py-2',
        'px-4',
        'rounded-xl',
        'hover:bg-gradient-to-br',
        'focus:ring-4',
        'focus:outline-none',
        'focus:ring-green-300',
        'dark:focus:ring-red-800',
        'mr-3',
        'hover:transition',
        'duration-300',
        'ease-in-out',
        'transform',
        'hover:scale-105',
        'mb-14'
      ];

      if (this.backgroundColor) {
        classes.push(this.backgroundColor);
      }

      return classes.join(' ');
    }
  }
};
</script>

<style>
.card {
  height: 80%;
  align-content: center;
  align-items: center;
  text-align: justify;
}
</style>
