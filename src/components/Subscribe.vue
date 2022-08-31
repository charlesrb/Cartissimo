<template>
  <section class="form">
    <div>
      <p>Référencez-vous !</p>
    </div>
    <div>
      <form action="" @submit.prevent="onSubmit">
        <p>Quel sport collectionnez-vous ?</p>
        <div>
          <input type="checkbox" id="NBA" value="NBA" v-model="sport" />
          <label for="NBA">NBA</label>

          <input type="checkbox" id="NFL" value="NFL" v-model="sport" />
          <label for="NFL">NFL</label>

          <input type="checkbox" id="NHL" value="NHL" v-model="sport" />
          <label for="NHL">NHL</label>

          <input type="checkbox" id="MLB" value="MLB" v-model="sport" />
          <label for="MLB">MLB</label>

          <input type="checkbox" id="Soccer" value="Soccer" v-model="sport" />
          <label for="Soccer">Soccer</label>

          <input type="checkbox" id="other" value="other" />
          <label for="other">Autre</label>
          <input type="text" id="otherValue" name="other" />
        </div>

        <p>Collectionnez-vous une (des ?) équipe NBA ?</p>
        <div v-for="teamNba in teamsNba" :key="teamNba.id">
          <input
            type="checkbox"
            :value="teamNba.name"
            :id="teamNba.id"
            v-model="equipeNba"
          />
          <label :for="teamNba.id">{{ teamNba.name }}</label>
        </div>
        <p>
          Collectionnez-vous un ou des joueurs en particulier ? (Indiquez le
          Prénom et le Nom, et séparez les joueurs par une virgule : Michael
          Jordan, Scottie Pippen)
        </p>
        <input type="text" v-model="joueur" />

        <p>Avez-vous une collection plus spécifique de joueurs ou équipe ?</p>
        <input type="text" v-model="collec" />
        <p>En quelle année avez-vous acheté vos premières cartes NBA ?</p>

        <input type="number" min="1950" max="2099" step="1" v-model="annee" />
        <p>
          Depuis quand êtes vous actif sur votre collection actuelle ? (si vous
          avez collectionné en 1995, puis arrêté, puis repris en 2020...
          indiquez 2020 !)
        </p>

        <input type="number" min="1950" max="2099" step="1" v-model="actif" />
        <p>
          Quel est le code postal de la ville dans laquelle vous habitez ? (Si
          vous n'habitez pas en France, préciser votre pays de résidence)
        </p>
        <input type="text" v-model="cp" />
        <p>
          Sous quel Nom ou Pseudonyme souhaitez-vous apparaître dans l'annuaire
          ?
        </p>
        <input type="text" v-model="pseudo" />
        <p>
          Laissez un message court décrivant votre passion pour les cartes, vos
          recherches, etc...
        </p>
        <input type="textarea" v-model="message" />
        <p>
          Peut-on vous contacter via Twitter ? Si oui, précisez votre alias !
          (exemple : @panini)
        </p>
        <input type="text" v-model="twitter" />
        <p>
          Peut-on vous contacter via Instagram ? Si oui, précisez votre alias !
          (exemple : @panini)
        </p>
        <input type="text" v-model="instagram" />
        <p>
          Souhaitez-vous indiquer une autre façon de vous contacter ? (Ne
          laissez ni email, ni numéro de téléphone)
        </p>
        <input type="text" v-model="contact" />
        <p>
          Quel est votre email ? (Il ne sera pas diffusé : il ne servira que
          pour vous envoyer le lien d'accès à l'annuaire)
        </p>
        <input type="email" v-model="mail" />
        <button @click="createUser()">CHERCHER</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const instanceNba = axios.create({
  baseURL: "http://localhost:3000/api/nba",
});

const instanceUser = axios.create({
  baseURL: "http://localhost:3000/api/user",
});
export default {
  name: "Subscribe",
  data: function () {
    return {
      teamsNba: {},
      sport: [],
      equipeNba: [],
      equipeNfl: "",
      equipeNhl: "",
      equipeMlb: "",
      equipeSoccer: "",
      joueur: {},
      collec: "",
      premiereCarte: "",
      actif: "",
      pays: "",
      cp: "",
      pseudo: "",
      twitter: "",
      instagram: "",
      contact: "",
      mail: "",
    };
  },

  methods: {
    createUser() {
      let dataForm = {
        annee: this.annee,
        joueur: this.joueur,
      };

      instanceUser
        .post("/", dataForm)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  },

  beforeCreate() {
    instanceNba
      .get("/")
      .then((data) => {
        this.teamsNba = data.data.result;
        console.log(data.data);
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style>
</style>