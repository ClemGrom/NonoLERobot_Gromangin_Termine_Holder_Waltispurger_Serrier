<script>
import { RouterView, RouterLink } from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/store/authStore.js";
import router from "@/router/index.js";



export default {

  components: {
    HomeView,
    RouterLink,
    RouterView,

  },
  data() {
    return {
      showMenu: false,
      //isConnected: true,
    }

  },
  computed: {
    isConnected() {
      return useAuthStore().isConnected;
    }
  },
  methods: {
    disconnect() {
      const authstore = useAuthStore();
      authstore.disconnect();
      this.$router.push('/');
    },
  }
};
</script>

<template>
  <header class="">
    <div class="header flex flex-wrap m-2 lg:flex-row lg:justify-center max-lg:flex-col max-lg:items-center">
      <div class="headerLogoText flex flex-row flex-wrap max-lg:mb-8 max-lg:mr-20 items-center">

        <router-link to="/" class="logo flex items-center">
          <img class="w-16 rounded mr-4" src="@\assets\images\logonono.jpg" alt="logo">
          <div>
            <h1 class="text-3xl font-extrabold drop-shadow-[0_8px_4px_rgba(34,0,4,6)] text-red-600">
              NONO
            </h1>
            <h1 class="text-2xl font-extrabold text-white">
              Le Robot
            </h1>
          </div>
        </router-link>

      </div>

      <div class="flex items-center ">
        <div
          class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/">
            <button class="h-full w-full ">Accueil</button>
          </RouterLink>
        </div>
        <div
          class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/tutoriel">
            <button class="h-full w-full ">Tutoriel</button>
          </RouterLink>
        </div>
        <div
          class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/robotMoteur">
            <button class="h-full w-full">Lancer la simulation</button>
          </RouterLink>
        </div>
        <div
          class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
          <RouterLink to="/previous-levels">
            <button class="h-full w-full">Anciens niveaux</button>
          </RouterLink>
        </div>

        <div class="relative inline-block text-left">
          <div class="relative inline-block text-left">
            <div>
              <button @click="showMenu = !showMenu" type="button"
                class=" max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
                id="options-menu" aria-haspopup="true" aria-expanded="true">
                Profil
              </button>
            </div>


            <div v-if="showMenu"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              style="z-index: 3; background-color: white;">
              <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div v-if="!isConnected">
                  <RouterLink to="/inscription"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Inscription</RouterLink>
                  <RouterLink to="/connexion"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Connexion</RouterLink>
                </div>
                <div v-else>
                  <RouterLink to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Mes parties</RouterLink>
                  <button @click="disconnect"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">Déconnexion</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </header>

  <!-- affiche les routes -->
  <RouterView />
  <!--
  <footer v-if="!isHomeRoute"  class="bg-zinc-900 text-zinc-500 text-center p-4 flex flex-row justify-between frelative bottom-0 w-full">
    <p>Nono le robot - 2024</p>
    <p>Copyright IUT-Charlemagne</p>
  </footer>-->
</template>

<style>
.logo {
  padding-right: 20px;
}
</style>