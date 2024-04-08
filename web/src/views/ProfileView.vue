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
      <div v-for="(partie, index) in parties" :key="index" class="card">
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