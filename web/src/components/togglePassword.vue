
<script>
export default {
  props: {
    showPassword: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.$emit('toggle');

    }
  }
}
</script>

<template>
  <button @click="togglePasswordVisibility" class="flex items-start focus:outline-none ml-52">
    <img v-if="!showPassword" src="@/components/icons/invisible.png" alt="Masquer mot de passe" class="h-5 w-5 bg-transparent">
    <img v-else src="@/components/icons/visible.png" alt="Afficher mot de passe" class="h-5 w-5 bg-transparent">
  </button>
</template>