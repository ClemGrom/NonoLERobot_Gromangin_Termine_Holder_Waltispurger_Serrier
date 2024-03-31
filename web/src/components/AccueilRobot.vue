<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- Bouton "Lancer la simulation" -->
    <div class="mb-6">
      <RouterLink to="/robotMoteur">
        <button class="text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-14 ">
          Lancer la simulation !
        </button>
      </RouterLink>
    </div>

    <!-- Boutons "À propos" et "Options" -->
    <div class="flex justify-between w-full max-w-screen-md">
      <RouterLink to="/option">
        <button class="text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-2">
          Options
        </button>
      </RouterLink>

      <RouterLink to="/about">
        <button class="text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-2">
          À propos
        </button>
      </RouterLink>
    </div>
  </div>
</template>




<style scoped>

</style>