<template>
  <div class="slide-content">
    <div class="grid-container" v-if="index ===0">
      <div class="rocket-image" >
        <img src="../assets/images/rocket.png" alt="Rocket" />
      </div>
      <div class="content" >
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <router-link v-if="link" :to="link">Voir plus</router-link>
      </div>
      <div class="image">
        <img src="../assets/images/saturne.png" alt="saturne image" />
      </div>
    </div>
    <div class="grid-container" v-if="index === 1">
      <div class="rocket-image" >
        <img src="../assets/images/rocket.png" alt="Rocket" />
      </div>
      <div class="content" >
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <router-link v-if="link" :to="link">En savoir plus</router-link>
      </div>
      <div class="image">
        <img src="../assets/images/moon.png" alt="saturne image" />
      </div>
    </div>
    <div class="grid-container" v-if="index === 2">
      <div class="rocket-image" >
        <img src="../assets/images/rocket.png" alt="Rocket" />
      </div>
      <div class="content" >
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <router-link v-if="link" :to="link">En savoir plus</router-link>
      </div>
      <div class="image">
        <img src="../assets/images/neptune.png" alt="neptune image" />
      </div>
    </div>
      <div class="grid-container" v-if="index === 3">
        <div class="rocket-image" >
          <img src="../assets/images/rocket.png" alt="Rocket" />
        </div>
        <div class="content" >
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
          <router-link v-if="link" :to="link">En savoir plus</router-link>
        </div>
        <div class="image">
          <img src="../assets/images/saturne.png" alt="saturne image" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideContent',
  props: {
    title: String,
    description: String,
    link: String,
    index: Number
  }
};
</script>

<style scoped>
.slide-content {
  min-height: 300vh;
  max-height: 90%;
  width: 100%;
  background-color: transparent;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 5vh;
}

.grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.rocket-image {
  grid-row: 1 / 1;
  grid-column: 3 / 3;
  justify-self: end;
}

.rocket-image img {
  width: auto;
  height: 25%;
}

.content {
  grid-row: 2 / 1;
  grid-column: 2 / 1;
}

.image {
  padding-top: 25vh;
  grid-row: 2 / 1;
  grid-column: 2 / 3;
}

.image img {
  width: 100%;
  height: auto;
}
</style>
