<script setup>
import { onMounted, onUnmounted, ref, toRaw } from 'vue';
import StartGame from '../game/main';

const game = ref();
const scenes = ['MainMenu', 'Niveau1', 'Niveau2', 'Niveau3', 'Niveau4', 'Niveau5'];
let currentSceneIndex = 0;

onMounted(() => {
    game.value = StartGame('game-container');
});

onUnmounted(() => {
    if (game.value) {
        game.value.destroy(true);
        game.value = null;
    }
});

defineExpose({ game });

const changeScene = () => {
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
    game.value.scene.start(scenes[currentSceneIndex]);
};

const restart = () => {
    game.value.scene.start(scenes[currentSceneIndex]);
};

</script>

<template>
    <div id="game-container"></div>
    <div>
      <div>
            <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" 
            @click="changeScene">Scène Suivante</button>
            <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" 
            @click="restart">Redémarrer</button>
      </div>
    </div>
</template>