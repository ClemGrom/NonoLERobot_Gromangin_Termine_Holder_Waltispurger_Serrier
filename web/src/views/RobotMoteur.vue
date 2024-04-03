<template>
   <div class="flex flex-col md:flex-row items-stretch justify-center min-h-screen p-6">
    <div class="md:w-1/4 p-6 bg-white shadow-lg rounded-lg flex-grow">
      <div class="flex flex-col mb-4 space-y-4">

        <h2 class="text-2xl font-bold mb-4 text-center">Paramétrage des capteurs du Robot :</h2>
        <div class="flex space-x-4 px-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">Mode Simple</button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">Mode Custom</button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow">Mode Gojs</button>
        </div>
        <div class="flex flex-col mb-4">
          <h3 class="text-xl font-bold mb-2">Capteur Gauche :</h3>
          <p class="font-bold">Longueur :</p>
          <input type="number" v-model="numberValue1" placeholder="Entrez un nombre ici"
            class="px-4 py-2 border border-gray-300 rounded-md">
          <div class="flex justify-between mt-2">
            <p class="font-bold">Gauche</p>
            <p class="font-bold">{{ rangeValue1}} degrés</p>
            <p class="font-bold">Droite</p>
          </div>
          <input type="range" min="-180" max="180" v-model="rangeValue1" class="mt-2">
        </div>

        <div class="flex flex-col mb-4">
          <h3 class="text-xl font-bold mb-2">Capteur Droit :</h3>
          <p class="font-bold">Longueur :</p>
          <input type="number" v-model="numberValue2" placeholder="Entrez un autre nombre ici"
            class="px-4 py-2 border border-gray-300 rounded-md">
            <div class="flex justify-between mt-2">
            <p class="font-bold">Gauche</p>
            <p class="font-bold">{{ rangeValue2 }} degrés</p>
            <p class="font-bold">Droite</p>
          </div>
          <input type="range" min="-180" max="180" v-model="rangeValue2" class="mt-2">
        
        </div>

        <div class="flex flex-col mb-4">
          <h3 class="text-xl font-bold mb-2">Si les 2 capteurs touchent un objet : {{ rangeValue3 }}</h3>
          <input type="range" min="-180" max="180" v-model="rangeValue3" class="mt-2">
        </div>

        <button @click="chargePartie"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Envoyer</button>
      </div>
    </div>
    <div class="md:w-3/4 p-4 flex items-center justify-center bg-white shadow-lg rounded-lg flex-grow mx-4">
      
      <div>
        <div id="game-container"></div>
        <div>
          <button
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
            @click="restart">Démarrer</button>
          <button
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
            @click="restart">Redémarrer</button>
          <button
            class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
            @click="changeScene">Niveau Suivant</button>
          <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" 
          @click="startLevel(0)">Niveau 1</button>
          <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" 
          @click="startLevel(1)">Niveau 2</button>
          <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" 
          @click="startLevel(2)">Niveau 3</button>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import StartGame from '../game/main';

export default {
  setup() {
    const game = ref(null);
    const gameStarted = ref(false);
    const currentSceneIndex = ref(0);
    const scenes = ref(['Niveau1', 'Niveau2', 'Niveau3']);
    const numberValue1 = ref(localStorage.getItem('tailleSensorGauche') || 50);
    const numberValue2 = ref(localStorage.getItem('tailleSensorDroit') || -50);
    const rangeValue1 = ref(localStorage.getItem('degresGauche') || 50);
    const rangeValue2 = ref(localStorage.getItem('degresDroit') || 50);
    const rangeValue3 = ref(localStorage.getItem('degres2Touche') || 60);

    onMounted(() => {
      chargePartie();
    });

    const chargePartie = () => {
      if (game.value) {
        game.value.destroy(true);
        game.value = null;
      }
      saveValues();
      gameStarted.value = true;
      game.value = StartGame('game-container');
    };

    const changeScene = () => {
        // Stop the current scene
  game.value.scene.stop(scenes.value[currentSceneIndex.value]);
      currentSceneIndex.value = (currentSceneIndex.value + 1) % scenes.value.length;
      game.value.scene.start(scenes.value[currentSceneIndex.value]);
    };
    const startLevel = (levelIndex) => {
  // Ensure the level index is valid
  if (levelIndex < 0 || levelIndex >= scenes.value.length) {
    console.error(`Invalid level index: ${levelIndex}`);
    return;
  }

  // Stop the current scene
  game.value.scene.stop(scenes.value[currentSceneIndex.value]);

  // Reset the game state here
  // This depends on how your game is designed
  // For example, if you have game objects or scores to reset, do it here

  // Start the new level
  currentSceneIndex.value = levelIndex;
  game.value.scene.start(scenes.value[currentSceneIndex.value]);
};

    const restart = () => {
        // Stop the current scene
  game.value.scene.stop(scenes.value[currentSceneIndex.value]);
      game.value.scene.start(scenes.value[currentSceneIndex.value]);
    };

    const saveValues = () => {
      localStorage.setItem('tailleSensorGauche', numberValue1.value);
      localStorage.setItem('tailleSensorDroit', numberValue2.value);
      localStorage.setItem('degresGauche', rangeValue1.value);
      localStorage.setItem('degresDroit', rangeValue2.value);
      localStorage.setItem('degres2Touche', rangeValue3.value);
      console.log('Values saved');
    };
    
    


    return { game, gameStarted, chargePartie, numberValue1, numberValue2, rangeValue1, rangeValue2, rangeValue3, changeScene, restart, startLevel};
  },
};
</script>