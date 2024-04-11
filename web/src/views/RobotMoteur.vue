<template>
  <div class=" contenerJeu flex flex-col md:flex-row items-stretch justify-center min-h-screen p-6">
    <div class="md:w-1/4 p-6 bg-white rounded-lg flex-grow">
      <div class="flex flex-col mb-4 space-y-4">

        <h2 class="text-2xl font-bold mb-4 text-center">Paramétrage des capteurs du Robot :</h2>
        <div class="flex space-x-4 px-2">

          <button @click="mode = 'default'"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">Mode Simple</button>
          <button @click="mode = 'custom'"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">Mode Custom</button>

          <RouterLink to="/programmationRobot">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow">Mode liens</button>
          </RouterLink>

        </div>
        <div v-if="mode === 'default'">
          <div class="flex flex-col mb-4">
            <h3 class="text-xl font-bold mb-2">Capteur Gauche :</h3>
            <p class="font-bold">Longueur :</p>
            <input type="number" v-model="numberValue1" placeholder="Entrez un nombre ici"
              class="px-4 py-2 border border-gray-300 rounded-md">
            <div class="flex justify-between mt-2">
              <p class="font-bold">Gauche</p>
              <p class="font-bold">{{ rangeValue1 }} degrés</p>
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

          <div class="flex">
            <p class="font-bold">Capteur 2 Touche : {{ rangeValue3 }}</p>
            <button @click="sensor2touche(0)"
              :class="`px-4 py-2 rounded-md ${activeButton === 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`">
              Gauche
            </button>
            <button @click="sensor2touche(1)"
              :class="`px-4 py-2 rounded-md ${activeButton === 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`">
              Droite
            </button>
          </div>



        </div>
        <div v-if="mode === 'custom'" class="bg-gray-100 p-6 rounded-lg">
          <div class="space-y-4">
            <div class="flex space-x-2">
              <button v-for="sensor in sensors" @click="selectedSensor = sensor" :key="sensor.id"
                class="px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Capteur {{ sensor.id }}
              </button>
            </div>

            <div v-if="selectedSensor" class="bg-white p-4 rounded-lg">
              <h1 class="text-xl font-bold mb-2">Capteur {{ selectedSensor.id }}</h1>
              <p class="font-bold">Longueur :</p>
              <input type="number" v-model="selectedSensor.numberValue" placeholder="Entrez un nombre ici"
                class="px-4 py-2 border border-gray-300 rounded-md">
              <div class="flex justify-between mt-2">
                <p class="font-bold">Gauche</p>
                <p class="font-bold">{{ selectedSensor.rangeValue }} degrés</p>
                <p class="font-bold">Droite</p>
              </div>
              <input type="range" min="-180" max="180" v-model="selectedSensor.rangeValue" class="mt-2">
            </div>
          </div>

        </div>
        <button @click="chargePartie"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Envoyer</button>
      </div>
    </div>


    <div class="md:w-3/4 p-4 flex items-center justify-center bg-white rounded-lg flex-grow mx-4">

      <div>
        <div id="simulation-title">Simulation : </div>
        <div id="game-container"></div>
        <div class="">
          <div class="flex flex-line items-center justify-center">
            <button
              id="demarrer-btn" class="mb-4 max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="restart">Démarrer</button>

            <button
              id="niveau-suivant-btn" class="mb-4 max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="changeScene">Niveau Suivant</button>
          </div>
          <h1 class="text-2xl font-bold mb-4 text-center">Choisissez un niveau :</h1>
          <div class="flex flex-line items-center justify-center">

            <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:dark:shadow-green-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="startLevel(0)">Niveau 1</button>
            <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-yellow-500/50 dark:dark:shadow-yellow-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="startLevel(1)">Niveau 2</button>
            <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-purple-500/50 dark:dark:shadow-purple-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="startLevel(2)">Niveau 3</button>
            <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-purple-500/50 dark:dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="startLevel(3)">Niveau 4</button>
            <button
              class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black dark:focus:ring-black-800 shadow-black-500/50 dark:dark:shadow-black-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105"
              @click="startLevel(4)">Niveau 5</button>

          </div>
          <div v-if="loggedIn">
            <p>loggedIn : {{loggedIn}}</p>
            <button @click="saveParty" class="mb-4 max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
              Sauvegarder la partie</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StartGame from '../game/main';
import { useAuthStore } from "@/store/authStore.js";

import {PARTIES} from "@/apiLiens.js";

import{PARTYBYNIVEAU} from "@/apiLiens.js";

export default {
  data() {
    return {
      mode: 'default',
      sensors: [
        { id: 1, numberValue: 0, rangeValue: 0 },
        { id: 2, numberValue: 0, rangeValue: 0 },
        { id: 3, numberValue: 0, rangeValue: 0 },
        { id: 4, numberValue: 0, rangeValue: 0 },
      ],
      selectedSensor: null,
      game: null,
      gameStarted: false,
      currentSceneIndex: 0,
      scenes: ['Niveau1', 'Niveau2', 'Niveau3', 'Niveau4', 'Niveau5'],
      numberValue1: localStorage.getItem('tailleSensorGauche') || 50,
      numberValue2: localStorage.getItem('tailleSensorDroit') || 50,
      rangeValue1: localStorage.getItem('degresGauche') || 50,
      rangeValue2: localStorage.getItem('degresDroit') || 50,
      rangeValue3: localStorage.getItem('degres2Touche'),
    };
  },
  computed: {
    loggedIn() {
      return useAuthStore().isConnected;
    },
    userEmail() {
      return useAuthStore().user_email;
    }
  },
  mounted() {
    this.chargePartie();
  },

  methods: {
    async saveParty(index, user_email) {
      if (this.loggedIn){
        try {

          const getResponse = await this.$api.get(PARTYBYNIVEAU, {
            user_email: user_email,
            niveau: index,
          });

          if (getResponse.status === 200 && getResponse.data) {
            // Si des données sont renvoyées, cela signifie qu'une partie existe déjà
            // Effectuer une requête PATCH pour mettre à jour la partie existante
            const patchResponse = await this.$api.patch(PARTYBYNIVEAU, {
              user_email: user_email,
              niveau: index,
              // Ajoutez ici les données à mettre à jour
              status: "FINISHED",
              score: localStorage.getItem("score"),
              temps: localStorage.getItem("timerFinal"),
              capteurDlongeur: localStorage.getItem("tailleSensorDroit"),
              capteurGlongeur: localStorage.getItem("tailleSensorGauche"),
              capteurDangle: localStorage.getItem("degresDroit"),
              capteurGangle: localStorage.getItem("degresGauche")
            });

            if (patchResponse.status !== 200) {
              this.$toast.error('Echec de la mise à jour de la partie dans la base de données');
            } else {
              this.$toast.success('Partie mise à jour');
            }
          } else {
            // Si aucune donnée n'est renvoyée, cela signifie qu'aucune partie n'existe
            // Effectuer une requête POST pour créer une nouvelle partie
            const postResponse = await this.$api.post(PARTIES, {
              user_email: user_email,
              niveau: index,
            });

            if (postResponse.status !== 200) {
              this.$toast.error('Echec du stockage de la partie dans la base de données');
            } else {
              this.$toast.success('Partie enregistrée');
            }
          }
        } catch (error) {
          this.$toast.error('Echec de l\'enregistrement de la partie dans la base de données');
        }
    }

    },

    sensor2touche(index) {
      if (index === 1) {
        this.rangeValue3 = true;
      } else {
        this.rangeValue3 = false;
      }
    },
    chargePartie() {
      if (this.game) {
        this.game.destroy(true);
        this.game = null;
      }
      this.saveValues();
      this.gameStarted = true;
      this.game = StartGame('game-container');
    },
    changeScene() {
      localStorage.clear();
      this.game.scene.stop(this.scenes[this.currentSceneIndex]);
      this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
      this.game.scene.start(this.scenes[this.currentSceneIndex]);
    },
    startLevel(levelIndex) {
      localStorage.clear();
      if (levelIndex < 0 || levelIndex >= this.scenes.length) {
        console.error(`Invalid level index: ${levelIndex}`);
        return;
      }

      this.scenes.forEach(scene => {
        if (this.game.scene.isActive(scene)) {
          this.game.scene.stop(scene);
        }
      });

      this.currentSceneIndex = levelIndex;
      this.game.scene.start(this.scenes[this.currentSceneIndex]);
      this.saveParty(levelIndex, this.user_email); // Appeler saveParty avec les données appropriées
    },
    restart() {
      localStorage.clear();
      this.game.scene.stop(this.scenes[this.currentSceneIndex]);
      this.game.scene.start(this.scenes[this.currentSceneIndex]);
      this.saveParty(this.currentSceneIndex, this.user_email); // Appeler saveParty avec les données appropriées
    },
    saveValues() {
      localStorage.setItem('tailleSensorGauche', this.numberValue1);
      localStorage.setItem('tailleSensorDroit', this.numberValue2);
      localStorage.setItem('degresGauche', this.rangeValue1);
      localStorage.setItem('degresDroit', this.rangeValue2);
      localStorage.setItem('degres2Touche', this.rangeValue3);
      console.log('Values saved');
    },
  },
};
</script>

<style scoped>
.contenerJeu {
  z-index: 2;
}

#demarrer-btn, #niveau-suivant-btn {
  margin-top: 15px;
}

#simulation-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

