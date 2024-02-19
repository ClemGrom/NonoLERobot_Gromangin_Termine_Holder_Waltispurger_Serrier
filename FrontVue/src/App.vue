<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

// Le sprite ne peut être déplacé que dans la scène MainMenu
const canMoveSprite = ref();

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

const moveSprite = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Appelle la méthode `moveLogo` dans la scène `MainMenu` et capture la position du sprite
        scene.moveLogo(({ x, y }) => {

            spritePosition.value = { x, y };

        });
    }

}

const addSprite = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Ajoute un nouveau sprite à la scène actuelle à une position aléatoire
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        // `add.sprite` est une méthode Phaser GameObjectFactory et elle retourne une instance de Sprite Game Object
        const star = scene.add.sprite(x, y, 'star');

        // ... sur laquelle vous pouvez ensuite agir. Ici, nous créons un Phaser Tween pour faire apparaître et disparaître le sprite étoile.
        // Vous pourriez, bien sûr, faire cela à partir du code de la scène Phaser elle-même, mais c'est juste un exemple
        // montrant que les objets et systèmes Phaser peuvent être agis de l'extérieur de Phaser lui-même.
        scene.add.tween({
            targets: star,
            duration: 500 + Math.random() * 1000,
            alpha: 0,
            yoyo: true,
            repeat: -1
        });
    }

}

// Cet événement est émis depuis le composant PhaserGame :
const currentScene = (scene) => {

    canMoveSprite.value = (scene.scene.key !== 'MainMenu');

}
</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div>
            <button class="button" @click="changeScene">Change Scene</button>
        </div>
        <div>
            <button :disabled="canMoveSprite" class="button" @click="moveSprite">Toggle Movement</button>
        </div>
        <div class="spritePosition">Position du Sprite :
            <pre>{{ spritePosition }}</pre>
        </div>
        <div>
            <button class="button" @click="addSprite">Ajouter un nouveau Sprite</button>
        </div>
    </div>
</template>