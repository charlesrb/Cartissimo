<template>
  <nav class="menu">
    <div class="menu__button"><i class="fas fa-bars"></i></div>
    <div class="menu__title">Cartissimo.fr</div>
  </nav>
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
            :value="teamNba"
            :id="teamNba.id"
            v-model="equipeNba"
          />
          <label :for="teamNba.id">{{ teamNba }}</label>
        </div>

        <p>Collectionnez-vous une (des ?) équipe NFL ?</p>
        <div v-for="teamNfl in teamsNfl" :key="teamNfl.id">
          <input
            type="checkbox"
            :value="teamNfl"
            :id="teamNfl.id"
            v-model="equipeNfl"
          />
          <label :for="teamNfl.id">{{ teamNfl }}</label>
        </div>

        <p>Collectionnez-vous une (des ?) équipe NHL ?</p>
        <div v-for="teamNhl in teamsNhl" :key="teamNhl.id">
          <input
            type="checkbox"
            :value="teamNhl"
            :id="teamNhl.id"
            v-model="equipeNhl"
          />
          <label :for="teamNhl.id">{{ teamNhl }}</label>
        </div>

        <p>Collectionnez-vous une (des ?) équipe MLB ?</p>
        <div v-for="teamMlb in teamsMlb" :key="teamMlb.id">
          <input
            type="checkbox"
            :value="teamMlb"
            :id="teamMlb.id"
            v-model="equipeMlb"
          />
          <label :for="teamMlb.id">{{ teamMlb }}</label>
        </div>

        <p>Collectionnez-vous une (des ?) équipe de Soccer ?</p>
        <div v-for="teamSoccer in teamsSoccer" :key="teamSoccer.id">
          <input
            type="checkbox"
            :value="teamSoccer"
            :id="teamSoccer.id"
            v-model="equipeSoccer"
          />
          <label :for="teamSoccer.id">{{ teamSoccer }}</label>
        </div>

        <p>
          Collectionnez-vous un ou des joueurs en particulier ? (Indiquez le
          Prénom et le Nom, et séparez les joueurs par une virgule : Michael
          Jordan, Scottie Pippen)
        </p>
        <input type="text" v-model="joueur" />

        <p>
          Avez-vous un autre type de collection (ni joueur, ni équipe, mais sur
          d'autres thèmes...)
        </p>
        <input type="selec" v-model="collec" />

        <p>En quelle année avez-vous acheté vos premières cartes ?</p>

        <select v-model="premiereCarte">
          <option value="Avant 1986">Avant 1986</option>
          <option value="Entre 1986 et 1990">Entre 1986 et 1990</option>
          <option value="Entre 1991 et 1995">Entre 1991 et 1995</option>
          <option value="Entre 1996 et 2000">Entre 1996 et 2000</option>
          <option value="Entre 2001 et 2005">Entre 2001 et 2005</option>
          <option value="Entre 2006 et 2010">Entre 2006 et 2010</option>
          <option value="Entre 2011 et 2015">Entre 2011 et 2015</option>
          <option value="Entre 2016 et 2020">Entre 2016 et 2020</option>
          <option value="Après 2020">Après 2020</option>
        </select>

        <p>
          Depuis quand êtes vous actif sur votre collection actuelle ? (si vous
          avez collectionné en 1995, puis arrêté, puis repris en 2020...
          indiquez 2020 !)
        </p>

        <select v-model="actif">
          <option value="Avant 1986">Avant 1986</option>
          <option value="Entre 1986 et 1990">Entre 1986 et 1990</option>
          <option value="Entre 1991 et 1995">Entre 1991 et 1995</option>
          <option value="Entre 1996 et 2000">Entre 1996 et 2000</option>
          <option value="Entre 2001 et 2005">Entre 2001 et 2005</option>
          <option value="Entre 2006 et 2010">Entre 2006 et 2010</option>
          <option value="Entre 2011 et 2015">Entre 2011 et 2015</option>
          <option value="Entre 2016 et 2020">Entre 2016 et 2020</option>
          <option value="Après 2020">Après 2020</option>
        </select>

        <p>Dans quel pays habitez-vous ?</p>
        <select v-model="pays">
          <option value="France">France</option>
          <option value="Belgique">Belgique</option>
          <option value="Algérie">Algérie</option>
          <option value="Canada">Canada</option>
          <option value="Etats Unis">Etats Unis</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Maroc">Maroc</option>
          <option value="Monaco">Monaco</option>
          <option value="Suisse">Suisse</option>
          <option value="Tunisie">Tunisie</option>
        </select>

        <p>Quel est le code postal de la ville dans laquelle vous habitez ?</p>
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

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});
const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});
export default {
  name: "Subscribe",
  data: function () {
    return {
      teamsNba: {},
      teamsNfl: {},
      teamsNhl: {},
      teamsMlb: {},
      teamsSoccer: {},
      sport: [],
      equipeNba: [],
      equipeNfl: [],
      equipeNhl: [],
      equipeMlb: [],
      equipeSoccer: [],
      joueur: "",
      collec: "",
      premiereCarte: "",
      actif: "",
      pays: "",
      cp: "",
      message: "",
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
        sport: this.sport,
        equipeNba: this.equipeNba,
        equipeNfl: this.equipeNfl,
        equipeNhl: this.equipeNhl,
        equipeMlb: this.equipeMlb,
        equipeSoccer: this.equipeSoccer,
        joueur: this.joueur,
        collec: this.collec,
        premiereCarte: this.premiereCarte,
        actif: this.actif,
        pays: this.pays,
        cp: this.cp,
        pseudo: this.pseudo,
        message: this.message,
        twitter: this.twitter,
        instagram: this.instagram,
        contact: this.contact,
        mail: this.mail,
      };

      instanceUser
        .post("/", dataForm)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  },

  beforeCreate() {
    instanceSports
      .get("/")
      .then((data) => {
        console.log(data.data.result);
        let teams = data.data.result;
        for (const team of teams) {
          if (team.league.name === "NBA") {
            this.teamsNba = team.league.equipes.name;
          } else if (team.league.name === "NFL") {
            this.teamsNfl = team.league.equipes.name;
          } else if (team.league.name === "NHL") {
            this.teamsNhl = team.league.equipes.name;
          } else if (team.league.name === "MLB") {
            this.teamsMlb = team.league.equipes.name;
          } else if (team.league.name === "Soccer") {
            this.teamsSoccer = team.league.equipes.name;
          }
        }
        // this.teamsNba = data.data.result[0].league.equipes;
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style>
</style>