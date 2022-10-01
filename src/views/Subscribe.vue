<template>
  <Navigation></Navigation>
  <section class="header">
    <div class="header__text">
      <h1>Référencez-vous !</h1>
    </div>
  </section>
  <section class="form">
    <div>
      <form action="" class="form__detail" @submit.prevent="onSubmit">
        <div>
          <p class="form__detail--legende">Quel sport collectionnez-vous ?</p>

          <!-- <VueMultiselect
            v-model="sportSelected"
            :multiple="true"
            :options="sport"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            selected-label="Selectionné"
            :close-on-select="false"
            tag-placeholder="Ajouter ce sport"
            placeholder="Chercher ou sélectionner un sport"
            :taggable="true"
            @tag="addTag"
          >
          </VueMultiselect> -->
          <div class="inline-block">
            <div>
              <input
                type="checkbox"
                id="nba"
                value="NBA"
                v-model="sportSelected"
              />
              <label for="nba">NBA</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="nfl"
                value="NFL"
                v-model="sportSelected"
              />
              <label for="nfl">NFL</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="nhl"
                value="NHL"
                v-model="sportSelected"
              />
              <label for="nhl">NHL</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="mlb"
                value="MLB"
                v-model="sportSelected"
              />
              <label for="mlb">MLB</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="soccer"
                value="SOCCER"
                v-model="sportSelected"
              />
              <label for="soccer">SOCCER</label>
            </div>
          </div>
          <!-- <select v-model.lazy="sportSelected" @change.prevent="addTag($event)">
            <option v-for="test of sport" :key="test.id">{{ test }}</option>
          </select> -->
          <p>{{ sportSelected }}</p>
        </div>
        <div>
          <p class="form__detail--legende">
            Collectionnez-vous une (des ?) équipe NBA ?
          </p>
          <!-- <VueMultiselect
            v-model="equipeNba"
            :multiple="true"
            :options="teamsNba"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            selected-label="Selectionné"
            placeholder="Sélectionner une ou plusieurs équipes"
            :close-on-select="false"
          >
          </VueMultiselect> -->
          <input
            type="text"
            placeholder="Joueur ou équipe collectionnée"
            class="header__form--input"
            v-model="search"
            @input="searchTeamInput"
          />
          <div class="test-input" id="testliste">
            <ul>
              <li
                v-for="resultat in resultatRecherche"
                :key="resultat.id"
                @click="updateSearch(resultat)"
              >
                {{ resultat }}
                <!-- <router-link
                  :to="{
                    name: 'resultatsteam',
                    path: '/resultatsteam/:sport/:team',
                    params: {
                      sport: resultat.substring(0, 3),
                      team: resultat.substring(6),
                    },
                  }"
                  >{{ resultat }}</router-link
                > -->
              </li>
            </ul>
          </div>
        </div>

        <div>
          <p class="form__detail--legende">
            Collectionnez-vous une (des ?) équipe NFL ?
          </p>
          <VueMultiselect
            v-model="equipeNfl"
            :multiple="true"
            :options="teamsNfl"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            selected-label="Selectionné"
            placeholder="Sélectionner une ou plusieurs équipes"
            :close-on-select="false"
          >
          </VueMultiselect>
        </div>

        <div>
          <p class="form__detail--legende">
            Collectionnez-vous une (des ?) équipe NHL ?
          </p>
          <VueMultiselect
            v-model="equipeNhl"
            :multiple="true"
            :options="teamsNhl"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            selected-label="Selectionné"
            placeholder="Sélectionner une ou plusieurs équipes"
            :close-on-select="false"
          >
          </VueMultiselect>
        </div>

        <div>
          <p class="form__detail--legende">
            Collectionnez-vous une (des ?) équipe MLB ?
          </p>
          <VueMultiselect
            v-model="equipeMlb"
            :multiple="true"
            :options="teamsMlb"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            selected-label="Selectionné"
            placeholder="Sélectionner une ou plusieurs équipes"
            :close-on-select="false"
          >
          </VueMultiselect>
        </div>
        <div>
          <p class="form__detail--legende">
            Collectionnez-vous une (des ?) équipe Soccer ?
          </p>
          <VueMultiselect
            v-model="equipeSoccer"
            :multiple="true"
            :options="teamsSoccer"
            select-label="Selectionner"
            deselect-label="Déselectionner"
            placeholder="Sélectionner une ou plusieurs équipes"
            selected-label="Selectionné"
            :close-on-select="false"
          >
          </VueMultiselect>
        </div>
        <div class="form__detail--text">
          <p class="form__detail--legende">
            Collectionnez-vous un ou des joueurs en particulier ? (Indiquez le
            Prénom et le Nom, et séparez les joueurs par une virgule : Michael
            Jordan, Scottie Pippen)
          </p>
          <input class="subscribe__form--input" type="text" v-model="joueur" />
        </div>
        <div>
          <p class="form__detail--legende">
            Avez-vous un autre type de collection (ni joueur, ni équipe, mais
            sur d'autres thèmes...)
          </p>
          <input type="selec" class="subscribe__form--input" v-model="collec" />
        </div>
        <div>
          <p class="form__detail--legende">
            En quelle année avez-vous acheté vos premières cartes ?
          </p>

          <VueMultiselect
            v-model="premiereCarte"
            :options="periode"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Sélectionner une période"
          ></VueMultiselect>
        </div>
        <div>
          <p class="form__detail--legende">
            Depuis quand êtes vous actif sur votre collection actuelle ? (si
            vous avez collectionné en 1995, puis arrêté, puis repris en 2020...
            indiquez 2020 !)
          </p>

          <VueMultiselect
            v-model="actif"
            :options="periode"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Sélectionner une période"
          ></VueMultiselect>
        </div>
        <div>
          <p class="form__detail--legende">Dans quel pays habitez-vous ?</p>
          <VueMultiselect
            v-model="pays"
            :options="listePays"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Sélectionner un pays"
          ></VueMultiselect>
        </div>
        <div>
          <p class="form__detail--legende">
            Quel est le code postal de la ville dans laquelle vous habitez ?
          </p>
          <input class="subscribe__form--input" type="text" v-model="cp" />
        </div>
        <div>
          <p class="form__detail--legende">
            Sous quel Nom ou Pseudonyme souhaitez-vous apparaître dans
            l'annuaire ?
          </p>
          <input class="subscribe__form--input" type="text" v-model="pseudo" />
        </div>
        <div>
          <p class="form__detail--legende">
            Laissez un message court décrivant votre passion pour les cartes,
            vos recherches, etc...
          </p>
          <!-- <textarea class="subscribe__form--textarea" v-model="message" placeholder="coucou"> -->
          <textarea
            v-model="message"
            class="subscribe__form--textarea"
          ></textarea>
        </div>
        <div>
          <p class="form__detail--legende">
            Peut-on vous contacter via Twitter ? Si oui, précisez votre alias !
            (exemple : @panini)
          </p>
          <input class="subscribe__form--input" type="text" v-model="twitter" />
        </div>
        <div>
          <p class="form__detail--legende">
            Peut-on vous contacter via Instagram ? Si oui, précisez votre alias
            ! (exemple : @panini)
          </p>
          <input
            class="subscribe__form--input"
            type="text"
            v-model="instagram"
          />
        </div>
        <div>
          <p class="form__detail--legende">
            Souhaitez-vous indiquer une autre façon de vous contacter ? (Ne
            laissez ni email, ni numéro de téléphone)
          </p>
          <input class="subscribe__form--input" type="text" v-model="contact" />
        </div>
        <div>
          <p class="form__detail--legende">
            Quel est votre email ? (Il ne sera pas diffusé : il ne servira que
            pour vous envoyer le lien d'accès à l'annuaire)
          </p>
          <input class="subscribe__form--input" type="email" v-model="mail" />
        </div>
        <div>
          <button @click="createUser()" class="subscribe__form--button">
            S'INSCRIRE
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Navigation from "../components/Navigation.vue";
import VueMultiselect from "vue-multiselect";

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
      sportSelected: [],
      sport: ["NBA", "NFL", "NHL", "MLB", "Soccer"],
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
      search: "",
      equipeNba: [],
      equipeNfl: [],
      equipeNhl: [],
      equipeMlb: [],
      equipeSoccer: [],
      playersNba: [],
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
      resultatRecherche: "",
      resultatRechercheSport: "",
      periode: [
        "Avant 1986",
        "Entre 1986 et 1990",
        "Entre 1991 et 1995",
        "Entre 1996 et 2000",
        "Entre 2001 et 2005",
        "Entre 2006 et 2010",
        "Entre 2011 et 2015",
        "Entre 2016 et 2020",
        "Après 2020",
      ],
      listePays: [
        "France",
        "Belgique",
        "Algérie",
        "Canada",
        "Etats Unis",
        "Luxembourg",
        "Maroc",
        "Monaco",
        "Suisse",
        "Tunisie",
      ],
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
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    updateSearch(resultat) {
      this.search = resultat;
      document.getElementById("testliste").style.display = "none";
    },
    searchTeamInput() {
      let listeEquipe = [];

      document.getElementById("testliste").style.display = "block";
      if (this.search.length > 2) {
        for (const equipe of this.teamsNba.teams) {
          if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
            listeEquipe.push(this.teamsNba.name + " - " + equipe);
          }
          this.resultatRecherche = listeEquipe;
        }

        // for (const player of this.teamsNba.players) {
        //   if (player.toLowerCase().includes(this.search.toLowerCase())) {
        //     listeEquipe.push(this.teamsNba.name + " - " + player);
        //   }
        //   this.resultatRecherche = listeEquipe;
        // }
      } else if (this.search.length < 2) {
        this.resultatRecherche = [];
      }
    },

    // updateSearch(resultat) {
    //   this.search = resultat;
    //   document.getElementById("testliste").style.display = "none";
    // },
    // searchTeamInput() {
    //   let listeEquipe = [];

    //   document.getElementById("testliste").style.display = "block";
    //   if (this.search.length > 2) {
    //     for (const equipe of this.teamsNba.teams) {
    //       if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //         listeEquipe.push(this.teamsNba.name + " - " + equipe);
    //       }
    //       this.resultatRecherche = listeEquipe;
    //     }

    //     // for (const player of this.teamsNba.players) {
    //     //   if (player.toLowerCase().includes(this.search.toLowerCase())) {
    //     //     listeEquipe.push(this.teamsNba.name + " - " + player);
    //     //   }
    //     //   this.resultatRecherche = listeEquipe;
    //     // }
    //   } else if (this.search.length < 2) {
    //     this.resultatRecherche = [];
    //   }
    // },

    // addTag(event) {
    //   this.sportSelected.push(event.target.value);
    // },
  },
  mounted() {
    instanceSports
      .get("/")
      .then((data) => {
        let teams = data.data.result;
        for (const team of teams) {
          if (team.name == "NBA") {
            this.teamsNba = team;
          } else if (team.name == "NFL") {
            this.teamsNfl = team;
          } else if (team.name == "NHL") {
            this.teamsNhl = team;
          } else if (team.name == "MLB") {
            this.teamsMlb = team;
          } else if (team.name == "SOCCER") {
            this.teamsSoccer = team;
          }
        }
      })
      .catch((error) => {
        error;
      });
  },
  components: { Navigation, VueMultiselect },
};
</script>
<style>
.inline-block {
  display: flex !important;
  flex-direction: row !important;
  gap: 20px;
}
</style>