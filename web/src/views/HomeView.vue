<template>
  <main>
    <div class="grid-container">
      <!-- Première section -->
      <div >
        <Card title="Présentation" :router-link="'/presentation'" :description="'Présentation du projet'" backgroundColor="bg-red-600">
          <template #routerText>
            En savoir plus
          </template>
        </Card>
      </div>

      <!-- Deuxième section -->
      <div>
        <Card title="Tutoriel" :router-link="'/tutoriel'" :description="'Tutoriel pour la simulation'" backgroundColor="bg-blue-600">
            En savoir plus
        </Card>
      </div>

      <div>
        <Card title="Qui sommes-nous?" :router-link="'/about'" :description="'En apprendre plus sur les membres du projet '" backgroundColor="bg-yellow-600">
          <template #routerText>
            En savoir plus
          </template>
        </Card>
      </div>

      <div>
        <Card title="Lancer la simulation" :router-link="'/robotmoteur'" :description="''" backgroundColor="bg-green-600">
          <template #routerText>
            
          </template>
        </Card>
      </div>
    </div>
  </main>
</template>

<script>
  import Card from "@/components/Card.vue"

  export default {
    components: {
      Card
    }
  }

</script>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  height: 80vh;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
}
</style>
