<template>
  <div class="flex flex-col md:flex-row items-stretch justify-center min-h-screen p-6">
    <div class="md:w-3/4 p-4 flex items-center justify-center bg-white shadow-lg rounded-lg flex-grow mx-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4 text-center"> Ancien niveau actuellement chargé: {{ this.currentLevel }}</h2>
        <p class="text-xl italic mb-4 text-center">Ces niveaux ont été réalisés durant le développement de
          l'application.</p>
        <div id="game-container"/>
        <div class="mt-4">
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level1.js')">Niveau 1
          </button>
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level2.js')">Niveau 2
          </button>
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level3.js')">Niveau 3
          </button>
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level4.js')">Niveau 4
          </button>
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level4bis.js')">Niveau 4 bis
          </button>
          <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="loadLevel('level5.js')">Niveau 5
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#game-container {
  z-index: 2;
}
</style>


<script>

export default {
  data() {
    return {
      currentScript: null,
      currentLevel: null,
      mathScript: "https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.4.0/math.min.js",
      phaserScript: "https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js"
    }
  },
  methods: {
    init() {
      let scriptPhaser = document.createElement('script');
      scriptPhaser.src = this.phaserScript
      document.head.appendChild(scriptPhaser);

      let scriptMath = document.createElement('script');
      scriptMath.src = this.mathScript
      document.head.appendChild(scriptMath);

      const script = document.createElement('script');
      script.src = `/anciensNiveaux/level1.js`;
      script.id = "scriptLevel";
      document.body.appendChild(script);

      this.currentScript = script;
      this.currentLevel = "level1.js";
    },
    loadLevel(level) {
      this.currentLevel = level;
      const oldScript = document.getElementById('scriptLevel');
      const newScript = document.createElement('script');
      newScript.src = `/anciensNiveaux/${level}`;
      newScript.id = "scriptLevel";
      document.getElementById('game-container').innerHTML = "";
      oldScript.parentNode.replaceChild(newScript, oldScript);
      this.currentScript = newScript;
    }
  },
  mounted() {
    this.init();
  }
};
</script>