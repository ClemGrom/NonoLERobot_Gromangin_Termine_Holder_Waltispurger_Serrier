<script>
import {RouterView, RouterLink} from 'vue-router';
import AccueilRobot from "@/components/AccueilRobot.vue";


export default {

  components: {
    AccueilRobot,
    RouterLink,
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
  <header v-if="!isHomeRoute" class="">
    <div class="header flex flex-wrap p-1 m-2 lg:flex-row lg:justify-between max-lg:flex-col max-lg:items-center">
      <div class="headerLogoText flex flex-row flex-wrap max-lg:mb-8 max-lg:mr-20">
        <!-- Logo à gauche -->

        <router-link to="/" class="logo">
          <img class="w-20" src="@/components/icons/logo.png" alt="logo">
        </router-link>

        <!-- Textes à gauche -->
        <div class="flex-col ml-4 w-20">
          <div>
            <h1 class="text-7xl font-extrabold drop-shadow-[0_8px_4px_rgba(34,0,4,6)] text-red-500">
              NONO
            </h1>
          </div>
          <div>
            <h1 class="text-5xl font-extrabold text-gray-400">
              Le Robot
            </h1>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center">
        <div
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/">
            <button class="h-full w-full ">Home</button>
          </RouterLink>
        </div>
        <div
            class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/simulation">
            <button class="h-full w-full">Jouer</button>
          </RouterLink>
        </div>

        <div class="notConnected flex flex-row items-center sm:flex-row">
          <!-- Boutons de connexion et inscription -->
          <div>
            <RouterLink to="/inscription">
              <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">Inscription</button>
            </RouterLink>
            <RouterLink to="/connexion">
              <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">Connexion</button>
            </RouterLink>
          </div>

          <!-- Bouton de déconnexion -->
          <div >
            <button class="max-sm:text-sm sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">Déconnexion</button>
          </div>
        </div>
        <div class="connected flex flex-row items-center">
        </div>
      </div>
    </div>
  </header>

  <AccueilRobot v-if="isHomeRoute"/>

  <!-- affiche les routes -->
  <RouterView/>

  <footer v-if="!isHomeRoute"  class="bg-zinc-900 text-zinc-500 text-center p-4 flex flex-row justify-between frelative bottom-0 w-full">
    <p>Nono le robot - 2024</p>
    <p>Copyright IUT-Charlemagne</p>
  </footer>
</template>

<style scoped>

</style>