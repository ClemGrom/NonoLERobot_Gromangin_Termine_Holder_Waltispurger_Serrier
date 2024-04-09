<script>
import {RouterView, RouterLink} from 'vue-router';
//import AccueilRobot from "@/components/AccueilRobot.vue";
import HomeView from "@/views/HomeView.vue";


export default {

  components: {
    HomeView,
    RouterLink,
    RouterView,

  },
  data() {
    return {
      isConnected: true,
      showMenu: false,
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
    <header class="">
    <div class="header flex flex-wrap p-1 m-2 lg:flex-row lg:justify-center max-lg:flex-col max-lg:items-center">
      <div class="headerLogoText flex flex-row flex-wrap max-lg:mb-8 max-lg:mr-20">
      

        <router-link to="/" class="logo">
          <!-- <img class="w-20" src="@/components/icons/logo.png" alt="logo"> -->
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
        </router-link>

       
      </div>
      
      <div class="flex  items-center">
        <div
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/">
            <button class="h-full w-full ">Accueil</button>
          </RouterLink>
        </div>
        <div
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/">
            <button class="h-full w-full ">Tutoriel</button>
          </RouterLink>
        </div>
        <div
            class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/robotMoteur">
            <button class="h-full w-full">Jouer</button>
          </RouterLink>
        </div>
        <div
            class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/previous-levels">
            <button class="h-full w-full">Jouer aux anciens niveaux</button>
          </RouterLink>
        </div>

        <div class="relative inline-block text-left">
          <div class="relative inline-block text-left">
    <div>
      <button @click="showMenu = !showMenu" type="button" class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" id="options-menu" aria-haspopup="true" aria-expanded="true">
        Profil
      </button>
    </div>
   

    <div v-if="showMenu" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div v-if="!isConnected">
        <RouterLink to="/inscription" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Inscription</RouterLink>
        <RouterLink to="/connexion" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Connexion</RouterLink>
        </div>
        <div v-else>
          <RouterLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Mes parties</RouterLink>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Déconnexion</button>
        </div>
      </div>
    </div>
  </div>
      
  </div>
      </div>
    </div>
  </header>

  <AccueilRobot v-if="isHomeRoute"/>

  <!-- affiche les routes -->
  <RouterView/>
  <!--
  <footer v-if="!isHomeRoute"  class="bg-zinc-900 text-zinc-500 text-center p-4 flex flex-row justify-between frelative bottom-0 w-full">
    <p>Nono le robot - 2024</p>
    <p>Copyright IUT-Charlemagne</p>
  </footer>-->
</template>

<style >
.logo {
  padding-right: 20px;
}
</style>