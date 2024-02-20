<script>

export default {

}

</script>

<template>
  <div class="h-min-screen flex flex-col items-center justify-center">
    <div class=" w-1/2 rounded-xl flex flex-col overflow-hidden border-2 border-gray-100 mx-auto my-10 bg-stone-400 text-zinc-900">
      <img src="@/components/icons/lost.jpeg" alt="lost">
      <div class="flex flex-col items-center mt-1 mb-1 ">
        <h2 class="text-4xl m-2 font-bold ">Oups il semble que</h2>
        <h2 class="text-4xl m-2 font-bold ">vous vous soyez perdu ...</h2>
      </div>
      <RouterLink to="/">
        <div class="flex flex-col items-center mt-4">
          <p class="text-4xl p-2"> Retour à la home page par ici :</p>
          <button class="bg-blue-500 border-b-blue-900 hover:bg-blue-900 text-white text-2xl font-bold py-2 px-4 rounded-xl mb-10 mt-5">
            Clic ici
          </button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>


<style scoped>

</style>