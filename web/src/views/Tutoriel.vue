<template>
    <div class="container mx-auto p-6 bg-white rounded shadow-lg">
        <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2">Tutoriel</h1>
            <p class="text-lg text-gray-700">Apprends comment programmer Nono le robot!</p>
        </div>

        <div>
            <h2 class="text-2xl font-semibold mb-2">Introduction</h2>
            <p class="text-lg text-gray-700 mb-4">Nono est un petit robot perdu dans le grand vaisseau d'Ulysse. Règle ses capteurs pour l'aider à sortir du terrible labyrinthe qui l'attend.</p>
            
            <h2 class="text-2xl font-semibold mb-2">Les véhicules de Braitenberg</h2>
            <div class="flex items-center mb-4">
                <img src="..\assets\images\Braitenberg.png" alt="Braitenberg" class="w-1/4 rounded shadow" />
                <p class="text-lg text-gray-700 w-3/4 ml-4">Les véhicules de Braitenberg sont des dispositifs imaginés par Valentino Braitenberg pour explorer la réactivité simple des robots en connectant des capteurs à des moteurs de manière à créer des comportements complexes. Les véhicules de Braitenberg sont couramment utilisés dans les cours d'introduction à la robotique et à l'IA. Nous pourrons nous servir de ce modèle pour modéliser les capteurs (capteurs de lumière, de proximité ou de chaleur). En ajustant les connexions entre les capteurs et les actionneurs, nous allons pouvoir créer des robots qui sont attirés par la lumière, évitent les obstacles ou suivent des gradients de chaleur.</p>
            </div>
            
            <h2 class="text-2xl font-semibold mb-2">Capteurs</h2>
            <p class="text-lg text-gray-700 mb-4">Les capteurs sont des éléments essentiels pour Nono. Il lui permet de détecter les obstacles et de changer de direction.</p>
            <img src="..\assets\images\Nonoetsescapteurs .png" alt="Capteur" class="mb-4 rounded shadow" />
            
            <h2 class="text-2xl font-semibold mb-2">Mode Simple</h2>
            <img src="../assets/images/NonoModeSimple.png" alt="Capteur" class="mb-4 rounded shadow" />
            <p class="text-lg text-gray-700 mb-4">Le mode simple vous permet de changer la taille des deux capteurs ainsi que l'angle de rotation que Nono.</p>
        </div>
    </div>
</template>

<style>
  .container {
   x:1
  }
</style>