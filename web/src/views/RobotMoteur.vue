<template>
    <div class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50">
        <div class="md:w-1/4 p-3">
            <div class="flex flex-col mb-4">
                <h1 class="text-4xl font-bold mb-4">Robot Moteur</h1>
                <div class="flex flex-col mb-4">
                    <p>Longueur du Capteur Gauche {{ numberValue1 }}</p>
                    <input type="number" v-model="numberValue1" placeholder="Entrez un nombre ici" class="px-4 py-2 border border-gray-300 rounded-md">
                    <p class="mt-2">Value: {{ rangeValue1 }}</p>
                    <input type="range" min="-180" max="180" v-model="rangeValue1" class="mt-2">
                </div>

                <div class="flex flex-col mb-4">
                    <p>Longueur du Capteur Droit {{ numberValue2 }}</p>
                    <input type="number" v-model="numberValue2" placeholder="Entrez un autre nombre ici" class="px-4 py-2 border border-gray-300 rounded-md">
                    <p class="mt-2">Value: {{ rangeValue2 }}</p>
                    <input type="range" min="-180" max="180" v-model="rangeValue2" class="mt-2">
                </div>

                <div class="flex flex-col mb-4">
                    <p class="mt-2">Degres si les deux capteurs touchent un objet : {{ rangeValue3 }}</p>
                    <input type="range" min="-180" max="180" v-model="rangeValue3" class="mt-2">
                </div>

                <button @click="saveValues" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Envoyer</button>
            </div>
        </div>
        <div class="md:w-3/4 p-4">
            <div id="game-container"></div>
            <div>
                <div>
                    <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" @click="changeScene">Scène Suivante</button>
                    <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105" @click="restart">Redémarrer</button>
                </div>
            </div>
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
            numberValue1: localStorage.getItem('tailleSensorGauche') || 50,
            numberValue2: localStorage.getItem('tailleSensorDroit') || -50,
            rangeValue1: localStorage.getItem('degresGauche') || 50,
            rangeValue2: localStorage.getItem('degresDroit') || -50,
            rangeValue3: localStorage.getItem('degres2Touche') || 60
        }
    },
    methods: {
        saveValues() {
            localStorage.setItem('tailleSensorGauche', this.numberValue1);
            localStorage.setItem('tailleSensorDroit', this.numberValue2);
            localStorage.setItem('degresGauche', this.rangeValue1);
            localStorage.setItem('degresDroit', this.rangeValue2);
            localStorage.setItem('degres2Touche', this.rangeValue3);
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