<script>
import togglePassword from "@/components/togglePassword.vue";


export default {
  components: {togglePassword},
  data() {
    return {
      email: null,
      pseudo: null,
      pwd: null,
      pwdverif: null,
      inscriptionDone: false,
      showPassword: false,
    }
  },
  methods: {
    /**
     * Méthode qui vérifie le format de l'email saisi par l'utilisateur
     * @param email email saisi par l'utilisateur
     * @return {boolean} vrai si email correspond au format tout en étant non null, faux sinon
     */
    verifEmail(email) {
      if (email !== null) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }
    },

    /**
     * Méthode qui vérifie la cohérence entre les deux mots de passes saisis par l'utilisateur
     * @param pwd1 mot de passe saisi par l'utilisateur
     * @param pwd2 vérification du premier mot de passe
     * @return {boolean} vrai si les deux mots de passe correspondent et sont non null, faux sinon
     */
    verifMdp(pwd1, pwd2) {
      if ((pwd1 !== null) && (pwd2 !== null)) {
        return pwd1 === pwd2;
      }
    },

    /**
     * Méthode qui permet à l'utilisateur de finaliser son inscription qui son email a été vérifié et que ses mots de passe sont cohérents
     */
    finirInscription() {
      if (this.verifEmail(this.email) && this.verifMdp(this.pwd, this.pwdverif)) {
        this.inscriptionDone = true;
      }
    },
    /**
     * Permet de basculer entre l'affichage du mot de passe en clair et masqué
     * @returns {void} - return true si le passeport est valide, false sinon
     */
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async userInscription() {
      if (this.verifEmail(this.email) && this.verifMdp(this.pwd, this.pwdverif)) {
        this.inscriptionDone = true;
      }
      if (this.verifEmail(this.email) && this.verifMdp(this.pwd, this.pwdverif)) {
        try {
          const formData = new URLSearchParams();
          formData.append('email', this.email);
          formData.append('pseudo', this.pseudo);
          formData.append('mdp', this.pwd);

          const response = await fetch(SIGNUP, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
          });
          console.log("C1" + response);
          if (response.ok) {
            console.log("C2" + response.status)
            // Inscription réussie
            this.inscriptionDone = true;
            // Réinitialiser les champs
            this.email = null;
            this.pseudo = null;
            this.pwd = null;
            this.pwdverif = null;
          } else {
            // Gérer les erreurs de requête
            console.error('Erreur lors de la requête:', response.status);
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
        }
      }
    },
  }
}
</script>

<template>
  <div v-if="!inscriptionDone" class=" min-h-screen bg-gray-700 flex flex-col justify-center p-8 rounded-2xl m-auto mb-8 mt-8">
    <div>
      <p class="text-white mb-1">Votre e-mail</p>
      <input v-model="email" class="w-full mb-2.5 p-1 border-4 rounded-lg" type="text"
             :class="{'border-red-500': verifEmail(this.email) === false}" placeholder="nom.prenom@mail.fr">
      <p v-if="verifEmail(this.email) === false" class="text-red-500 font-bold mb-2">Email invalide</p>
    </div>
    <div>
      <p class="text-white mb-1">Votre pseudo</p>
      <input v-model="pseudo" class="w-full mb-2.5 p-1 border-4 rounded-lg" type="text"
             placeholder="BlackWarrior">
    </div>
    <div>
      <p class="text-white mb-1">Mot de passe</p>
      <input v-if="!showPassword" v-model="pwd" class="w-full mb-2.5 p-1 border-4 rounded-lg" type="password"
             :class="{'border-red-500': verifMdp(this.pwd, this.pwdverif) === false}"
             placeholder="zmz25e12fkik">
      <input v-else v-model="pwd" class="w-full mb-2.5 p-1 border-4 rounded-lg" type="text"
             :class="{'border-red-500': verifMdp(this.pwd, this.pwdverif) === false}"
             placeholder="zmz25e12fkik">
      <div>
        <togglePassword :showPassword="showPassword" @toggle="togglePassword"/>
      </div>
    </div>
    <div class="mb-4">
      <p class="text-white mb-1">Confirmation du mot de passe</p>
      <input v-if="!showPassword" v-model="pwdverif" class="w-full mb-3 p-1 border-4 rounded-lg" type="password"
             :class="{'border-red-500': verifMdp(this.pwd, this.pwdverif) === false}"
             placeholder="zmz25e12fkik" @keyup.enter="userInscription">
      <input v-else v-model="pwdverif" class="w-full mb-2.5 p-1 border-4 rounded-lg" type="text"
             :class="{'border-red-500': verifMdp(this.pwd, this.pwdverif) === false}"
             placeholder="zmz25e12fkik" @keyup.enter="userInscription">
      <div>
        <togglePassword :showPassword="showPassword" @toggle="togglePassword"/>
      </div>
      <p v-if="verifMdp(this.pwd, this.pwdverif) === false" class="text-red-500 font-bold">Mots de passe
        incompatibles</p>
    </div>
    <button @click="userInscription" class=" bg-blue-400 text-white hover:opacity-70 font-bold py-2 px-4 rounded">Je
      m'inscris
    </button>

    <RouterLink to="/connexion">
      <button
          class="bg-stone-400 text-zinc-600 hover:bg-blue-500 hover:text-zinc-900  py-2 px-4 rounded-xl mt-10 ml-14">
        J'ai déjà un compte
      </button>
    </RouterLink>

  </div>

  <div v-else class="bg-gray-700 flex flex-col justify-center p-8 rounded-2xl m-auto">
    <p class="text-white text-2xl">Merci de votre inscription !</p>
  </div>


</template>