<script>
export default {
  data() {
    return {
      parties: [] // Les données seront chargées depuis l'API et assignées à cette propriété
    };
  },
  methods: {
    async fetchProfileInfo() {
      try {
        const userEmail = 'RobJohn@gmail.com';
        const response = await this.$api.post("api/profile/parties", { user_email: userEmail });
        this.parties = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations du profil:", error);
      }
    }

  },
  mounted() {
    this.fetchProfileInfo();
  }
};
</script>

<template>
  <div class="profile-view">
    <h2>Profil de l'utilisateur</h2>
    <div class="card-container">
      <div v-for="(partie, index) in parties" :key="index" class="card text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105 mb-14 ">
        <h3>Partie {{ partie.niveau }}</h3>
        <p>Statut: {{ partie.status }}</p>
        <p>Temps: {{ partie.temps }}</p>
        <p>Score: {{ partie.score }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>