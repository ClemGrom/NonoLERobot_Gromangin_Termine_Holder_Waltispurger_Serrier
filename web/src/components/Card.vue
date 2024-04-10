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
      default: 'white',
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
        'mb-14',
        'w-80',
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
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #f8f9fa;
  }

  .card {
    height: 80%;
    align-content: center;
    align-items: center;
    text-align: justify;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  .title {
    color: #343a40;
  }

  .description {
    color: #6c757d;
  }

  .link {
    text-decoration: none;
    color: #3b9cdd;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 10px;
  }

  .link:hover {
    color: #1e6bb8;
  }
</style>