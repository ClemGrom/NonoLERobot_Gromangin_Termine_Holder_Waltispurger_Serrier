<template>
  <div id="pres" class="bg-white rounded m-2">
    <h1 class="text-4xl font-bold mb-2 p-2">Présentation</h1>
    <div>
      <h2 class="text-2xl font-semibold p-2 m-5">Introduction:</h2>
      <img class="float-left m-5" src="https://m.media-amazon.com/images/I/61wubGbULDL._AC_UF1000,1000_QL80_.jpg"
           alt="flatland" height="250px" width="175">
      <p class="p-2 m-5">Nono est une créature qui vit dans la planète Flatland. Il se déplace dans un univers 2D, ce
        qui lui permet d’explorer et trouver la nourriture qui lui permet de survivre. Il perçoit son environnement
        proche et ne voit rien au delà d’une certaine limite. Cependant, Nono n’a pas de cerveau évolué qui l’aide à
        décider quelle direction suivre, ou que faire dans une situation donnée, il repose sur l’utilisateur pour lui en
        créer un. Ce dernier doit, régler et bien connecter les neurones de Nono, pour qu'il puisse se déplacer
        correctement dans son environnement et pouvoir survivre.
      </p>
      <p class="p-2 m-5">
        <img class="float-right" src="https://storage.canalblog.com/57/86/58047/129488939.jpg" alt="nono le robot" width="179" height="133">
        En intelligence artificielle, construire un cerveau (on parle dans ce cas de contrôleur) est une problématique
        centrale et il existe plusieurs solutions automatiques (sans intervention de l’utilisateur) pour le faire.
        Ici le projet est de permettre à l’utilisateur de se mettre à la place de l’intelligence artificielle et tester
        de manière interactive différents réglages et d’observer leur effets sur le comportement de Nono.
      </p>
    </div>


    <div>
      <br>
      <br>
      <h2 class="text-2xl font-semibold p-2 m-5">Sujet initial:</h2>
      <p class="p-2 m-5">Le projet est de concevoir et construire une application Web qui simule un environnement
        simple dans lequel Nono se déplacera. L’application doit permettre à l’utilisateur de modifier les paramètres du
        cerveau de Nono et visualiser le résultat en temps réel sur son comportement. L’utilisateur peut sauvegarder et
        charger les contrôleurs qu’il conçoit et décider de la forme et des capacités du robot (type de capteurs etc.).
        <br>
        En plus des outils et technologie de développement Web classiques (frameworks sur client et serveur, base de
        données etc.), il peut y avoir l’intégration d’un moteur de jeux pour la simulation et utilisation d’un
        bibliothèque de visualisation et d’interaction de graphes, etc.
      </p>
    </div>

    <div class="float-right">
      <h2 class="text-2xl font-semibold p-2 m-5">Conception du projet: </h2>
      <img class="float-left m-10" src="https://www.researchgate.net/profile/Alban-Laflaquiere/publication/281015368/figure/fig2/AS:6715248308
        46989@1537115404243/Vehicule-de-VBraitenberg-faisant-preuve-de-phototaxie-par-le-simple-branchement-de.ppm"
           height="400px" width="400px" alt="véhicules de braitenberg">
      <p class="p-2 m-5">
        Les principes du comportement du robot se basent sur les véhicules de Braintenberg: des robots qui réagissent à
        la lumière de leur environnement, en fonction de la distance et de l’intensité de la lumière. <br>
        L'intensité de la lumière est captée par des capteurs, qui envoient des signaux électriques aux moteurs du
        robot. Selon si le capteur gauche ou droit est déclenché, le robot tournera à gauche ou à droite selon les
        branchements réalisés par l'utilisateur: il s'agit de phototaxie positive lorsque le robot se dirige vers la
        lumière et de phototaxie négative lorsqu'il s'en éloigne.
      </p>
      <p class="italic p-2 m-5">Ci-contre, une illustration des véhicules de Braitenberg: celui de gauche a une
        phototaxie
        négative, celui de droite a une phototaxie positive. Cette phototaxie s'explique par le côté du capteur auquel
        est relié la roue: dans l'exemple (a), le capteur droit est relié à la roue droite, faisant tourner la roue
        droite uniquement et donc déplace le robot vers la gauche. Dans l'exemple (b), c'est l'inverse: la roue droite
        est activée par le capteur gauche, et donc le robot tourne dans la direction de la source de lumière</p>
      <p class="p-2 m-5">
        Dans le cas de notre robot, celui-ci agira avec un comportement de phototaxie négative, c'est à dire qu'il
        s'orientera de façon à éviter un obstacle et se tournant du côté opposé à celui-ci.
      </p>
      <p class="p-2 m-5">
        Le robot évolue dans un monde en 2D, issue d'une librairie utilisée pour des jeux-vidéos. Nono est
        programmable à l'aide d'une interface de programmation visuelle basée sur différents éléments représentant les
        moteurs et les capteurs du robot. Les utilisateurs peuvent définir ainsi le comportement du robot en réaction à
        son environnement, grâce aux capteurs qui détectent des obstacles. <br>
        <br>
        Certains niveaux proposent à l'utilisateur de simplement traverser l'environnement en allant de gauche vers la
        droite, en essayant d'obtenir le meilleur score basé sur le nombre d'éléments ramassés et le temps imparti
        restant, tandis que d'autres niveaux proposent à l'utilisateur de faire faire la course à leur robot avec leur
        configuration face à un robot prédéfini.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>
#pres {
  z-index: 2;
}
</style>