<template>
  <div class=" contenerJeu flex flex-col md:flex-row items-stretch justify-center min-h-screen p-6">

    <div class="md:w-1/4 p-6 bg-white rounded-lg flex-grow flex flex-col justify-center items-center ">
      <h2 class="text-l font-bold mb-4 text-center">Paramétrage des liens entre les capteurs et les moteurs du Robot :</h2>

      <div class="flex flex-col mb-4 space-y-4">
        <div class="graph-container  flex">

          <div ref="paper" class="contenerDiag" style="width: 100%; height: 100%;" >

          </div>

        </div>
        <h1 class="text-l font-bold mb-4 text-center">Sélectionner les liens entre les capteurs et les moteurs :</h1>
        <div class=" ">
          <p class="font-bold">Liens entre les capteurs et les moteur (0 pour que le lien n'existe pas):</p>
          <p class="">Lien A, entre le capteur 1 et le moteur 1</p>
          <input type="number" v-model="weigthA" placeholder="Entrez un nombre ici"
                 class="px-4 py-2 border border-gray-300 rounded-md">
          <p class="">Lien B, entre le capteur 1 et le moteur 2</p>
          <input type="number" v-model="weigthB" placeholder="Entrez un nombre ici"
                 class="px-4 py-2 border border-gray-300 rounded-md">
          <p class="">Lien C, entre le capteur 2 et le moteur 1</p>
          <input type="number" v-model="weigthC" placeholder="Entrez un nombre ici"
                 class="px-4 py-2 border border-gray-300 rounded-md">
          <p class="">Lien D, entre le capteur 2 et le moteur 2</p>
          <input type="number" v-model="weigthD" placeholder="Entrez un nombre ici"
                 class="px-4 py-2 border border-gray-300 rounded-md">
        </div>
      </div>
    </div>
    <div class="md:w-3/4 p-4 flex items-center justify-center bg-white rounded-lg flex-grow mx-4">

      <div>
        <div class="text-2xl" id="simulation-title">Simulation : </div>
        <div id="game-container"></div>
        <div class="">
          <div class="flex flex-line items-center justify-center">

          </div>

          <div class="flex flex-line items-center justify-center">


            <button
                class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold my-5 py-2 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-yellow-800 shadow-yellow-500/50 dark:dark:shadow-yellow-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
                @click="startLevel(2)">Lancer la simulation</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as joint from '@joint/core';
import {onMounted, ref, watch} from "vue";
import StartGame from "@/game/main.js";


export default {
  mounted() {
    const graph = new joint.dia.Graph();

    const paper = new joint.dia.Paper({
      el: this.$refs.paper,
      width: 250,
      height:300 ,
      zIndex: 2,
      model: graph,
      interactive: {
        draggable: false //ne marche pas
      }
    });

    // Dimensions et positionnement du rectangle principal
    const rectWidth = 200;
    const rectHeight = 200;
    const rectX = (paper.options.width - rectWidth) / 2;
    const rectY = (paper.options.height - rectHeight) / 2;

    const rect = new joint.shapes.standard.Rectangle({
      position: { x: rectX, y: rectY },
      size: { width: rectWidth, height: rectHeight },
      attrs: {
        body: {
          fill: 'red',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'Nono',
          fill: 'white',
          fontSize: 25,
          fontWeight: 'bold',
        },
      },
    });

    // Ajout des capteurs
    const sensorWidth = 70;
    const sensorHeight = 30;
    const sensorOffset = 0; // Espacement entre les capteurs et le bord supérieur du rectangle principal

    const sensor1 = new joint.shapes.standard.Rectangle({
      position: { x: rectX, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'green',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'Capteur 1',
          fill: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },

    });

    const sensor2 = new joint.shapes.standard.Rectangle({
      position: { x: rectX + rectWidth - sensorWidth, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'green',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'Capteur 2',
          fill: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
    });



    // Ajout des éléments au graphique

    graph.addCell(rect);
    graph.addCell(sensor1);
    graph.addCell(sensor2);


    // Dimensions et positionnement des carrés
    const squareWidth = 50;
    const squareHeight = 60;

    // Ajout du carré à gauche
    const leftSquare = new joint.shapes.standard.Rectangle({
      position: { x: rectX - squareWidth + 50, y: rectY + 100 },
      size: { width: squareWidth, height: squareHeight },
      attrs: {
        body: {
          fill: 'lightgray',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'Moteur gauche',
          fill: 'black',
          fontWeight: 'bold',
          fontSize: 12,
        },
      },
    });

    // Ajout du carré à droite
    const rightSquare = new joint.shapes.standard.Rectangle({
      position: { x: rectX + rectWidth - 50, y: rectY + 100 },
      size: { width: squareWidth, height: squareHeight },
      attrs: {
        body: {
          fill: 'lightgray',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'Moteur droit',
          fill: 'black',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
    });

    // Ajout des carrés au graphique
    graph.addCell(leftSquare);
    graph.addCell(rightSquare);


    // Créer une flèche du capteur 1 au moteur gauche
    const linkA = new joint.shapes.standard.Link({
      source: { id: sensor1.id },
      target: { id: leftSquare.id },
      labels : [
        { position: 0.5, attrs: { text: { text: 'A' } } }
      ],
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });

    // Créer une flèche du capteur 1 au moteur droit
    const linkB = new joint.shapes.standard.Link({
      source: { id: sensor1.id },
      target: { id: rightSquare.id },
      labels : [
        { position: 0.5, attrs: { text: { text: 'B' } } }
      ],
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });

    // Créer une flèche du capteur 2 au moteur gauche
    const linkC = new joint.shapes.standard.Link({
      source: { id: sensor2.id },
      target: { id: leftSquare.id },
      labels : [
        { position: 0.5, attrs: { text: { text: 'C' } } }
      ],
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });
// Créer une flèche du capteur 2 au moteur droit
    const linkD = new joint.shapes.standard.Link({
      source: { id: sensor2.id },
      target: { id: rightSquare.id },
      labels : [
        { position: 0.5, attrs: { text: { text: 'D' } } }
      ],
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });
    // Ajouter les flèches au graphique
    graph.addCell(linkA);
    graph.addCell(linkB);
    graph.addCell(linkC);
    graph.addCell(linkD);
    paper.model = graph;
  },


  setup() {
    const game = ref(null);
    const gameStarted = ref(false);
    const currentSceneIndex = ref(0);
    const scenes = ref(['synaptic']);
    const numberValue1 = ref(localStorage.getItem('tailleSensorGauche') || 50);
    const numberValue2 = ref(localStorage.getItem('tailleSensorDroit') || 50);

    // Initialisation des variables réactives liées aux inputs
    const weigthA = ref(localStorage.getItem('weigthA') || 0);
    const weigthB = ref(localStorage.getItem('weigthB') || 0);
    const weigthC = ref(localStorage.getItem('weigthC') || 0);
    const weigthD = ref(localStorage.getItem('weigthD') || 0);


// Observer les variables pour sauvegarder leurs valeurs dans localStorage quand elles changent
    watch(weigthA, (newVal) => localStorage.setItem('weigthA', newVal));
    watch(weigthB, (newVal) => localStorage.setItem('weigthB', newVal));
    watch(weigthC, (newVal) => localStorage.setItem('weigthC', newVal));
    watch(weigthD, (newVal) => localStorage.setItem('weigthD', newVal));

    onMounted(() => {
      chargePartie();
    });

    const activeButton = ref(null);

    const sensor2touche = (index) => {
      rangeValue3.value = index === 1;

    };

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
      localStorage.setItem('weigthA', weigthA.value);
      localStorage.setItem('weigthB', weigthB.value);
      localStorage.setItem('weigthC', weigthC.value);
      localStorage.setItem('weigthD', weigthD.value);
      console.log('Values saved');
    };
    return { game, gameStarted, weigthA,
      weigthB,
      weigthC,
      weigthD, chargePartie, changeScene, restart, startLevel, sensor2touche };  },
};
</script>

<style scoped>
.graph-container {
  z-index: 1000;
}
</style>
