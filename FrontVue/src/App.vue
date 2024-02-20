<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

// Références au composant PhaserGame (le jeu et la scène sont exposés)
const phaserRef = ref();
const spritePosition = ref({ x: 0, y: 0 });

const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Appelle la méthode changeScene définie dans les scènes `MainMenu`, `Game` et `GameOver`
        scene.changeScene();
    }

}

</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div>
            <button class="button" @click="changeScene">Change Scene</button>
        </div>
    </div>
</template>