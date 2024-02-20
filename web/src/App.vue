<script>
import {RouterView} from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import HeaderBar from "@/components/headerBar.vue";


export default {

  components: {
    HeaderBar,
    HomeView,
    RouterView,

  },
  data() {
    return {
      isConnected: false,
    }
  },
  computed: {
    isHomeRoute() {
      return this.$route.path === '/';
    },
  },
};
</script>

<template>
  <HeaderBar/>

  <RouterView/>

  <footer class="bg-zinc-900 text-zinc-500 text-center p-4 flex flex-row justify-between frelative bottom-0 w-full">
    <p>Nono le robot - 2024</p>
    <p>Copyright IUT-Charlemagne</p>
  </footer>
</template>

<style scoped>

</style>