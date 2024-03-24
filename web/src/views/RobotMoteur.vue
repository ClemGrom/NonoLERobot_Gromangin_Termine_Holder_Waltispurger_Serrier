<template>
    <div>
        <h1>Robot Moteur</h1>
        <input type="number" v-model="numberValue1" placeholder="Entrez un nombre ici">
        <input type="number" v-model="numberValue2" placeholder="Entrez un autre nombre ici">
        <p>Value: {{ rangeValue1 }}</p>
        <input type="range" min="-180" max="180" v-model="rangeValue1">
        <p>Value: {{ rangeValue2 }}</p>
        <input type="range" min="-180" max="180" v-model="rangeValue2">

        <button @click="saveValues">Envoyer</button>
    </div>
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

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import StartGame from '../game/main';

const game = ref();
const scenes = ['NiveauTest'];
let currentSceneIndex = 0;

export default {
    data() {
        return {
            numberValue1: 50,
            numberValue2: 50,
            rangeValue1: 50,
            rangeValue2: -50
        }
    },
    methods: {
        saveValues() {
            localStorage.setItem('tailleSensorGauche', this.numberValue1);
            localStorage.setItem('tailleSensorDroit', this.numberValue2);
            localStorage.setItem('degresGauche', this.rangeValue1);
            localStorage.setItem('degresDroit', this.rangeValue2);
        },
        changeScene() {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
            game.value.scene.start(scenes[currentSceneIndex]);
        },
        restart() {
            game.value.scene.start(scenes[currentSceneIndex]);
        }
    },
    setup() {
        onMounted(() => {
            game.value = StartGame('game-container');
        });

        onUnmounted(() => {
            if (game.value) {
                game.value.destroy(true);
                game.value = null;
            }
        });

        return { game };
    }
}
</script>