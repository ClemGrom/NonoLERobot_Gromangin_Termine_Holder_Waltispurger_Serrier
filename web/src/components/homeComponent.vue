<template>
  <div class="slide-content">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <router-link :to="link">Voir plus</router-link>
  </div>
</template>

<script>
export default {
  name: 'SlideContent',
  props: {
    title: String,
    description: String,
    link: String,
  },
};
</script>

<style scoped>
.slide-content {
  /* Ajoutez vos styles personnalisés pour le contenu des slides ici */
  /* Par exemple : */
  min-height: 800px;
  width: 100%;
  background-color: transparent;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slide-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.slide-content p {
  margin-bottom: 20px;
}

.slide-content router-link {
  text-decoration: none;
  color: var(--vc-clr-white);
  border: 1px solid var(--vc-clr-white);
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.slide-content router-link:hover {
  background-color: var(--vc-clr-white);
  color: #333; /* Changez la couleur du texte en fonction de votre design */
}
</style>
