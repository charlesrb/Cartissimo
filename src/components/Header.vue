<template>
  <section class="header">
    <div class="header__text">
      <p>
        Trouvez d’autres collectionneurs et partagez ensemble votre passion pour
        le Hobby !
      </p>
    </div>
    <div class="header__form">
      <form action="" class="header__form--detail" @submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="Equipe ou joueur collectionné"
          class="header__form--input"
          v-model="search"
          @input="searchTeamInput"
        />
        <div class="header__form--list" id="listeEquipes">
          <ul>
            <li
              v-for="resultat in resultatRecherche"
              :key="resultat.id"
              @click="updateSearch(resultat)"
            >
              {{ resultat }}
            </li>
          </ul>
        </div>
        <!-- <input
          type="text"
          placeholder="Joueur collectionné"
          class="header__form--input"
          v-model="searchJoueur"
          @input="searchPlayerInput"
        />
        <div class="header__form--list" id="listeJoueurs">
          <ul>
            <li
              v-for="resultat in resultatRecherche"
              :key="resultat.id"
              @click="updateSearchPlayer(resultat)"
            >
              {{ resultat }}
            </li>
          </ul>
        </div> -->

        <button @click="searchPlayer()" class="header__form--button">
          CHERCHER
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});

export default {
  name: "Header",
  data: function () {
    return {
      keys: {},
      search: "",
      searchJoueur: "",
      selectNba: "NBA",
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "SOCCER",
      resultatRecherche: "",
      resultatRechercheSport: "",
    };
  },
  props: [
    "teamsNba",
    "teamsNfl",
    "teamsNhl",
    "teamsMlb",
    "teamsSoccer",
    "users",
  ],
  methods: {
    updateSearch(resultat) {
      this.search = resultat;
      document.getElementById("listeEquipes").style.display = "none";
    },

    updateSearchPlayer(resultat) {
      this.searchPlayer = resultat;
      document.getElementById("listeJoueurs").style.display = "none";
    },

    searchTeamInput() {
      let listeEquipe = [];

      document.getElementById("listeEquipes").style.display = "block";

      if (this.search.length > 2) {
        instanceSports
          .get(`/${this.search}`)
          .then((data) => {
            this.resultatRecherche = data.data;
          })
          .catch((error) => {
            error;
          });
      } else if (this.search.length < 2) {
        this.resultatRecherche = [];
      }
    },

    searchPlayerInput() {
      let listeJoueur = [];

      document.getElementById("listeJoueurs").style.display = "block";

      if (this.searchJoueur.length > 2) {
        instanceSports
          .get("/")
          .then((data) => {
            for (const sport of data.data.result) {
              for (const joueur of sport.players) {
                if (
                  joueur.toLowerCase().includes(this.searchJoueur.toLowerCase())
                ) {
                  listeJoueur.push(sport.name + " - " + joueur);
                }
                this.resultatRecherche = listeJoueur;
              }
            }
          })
          .catch((error) => {
            error;
          });
      } else if (this.searchJoueur.length < 2) {
        this.resultatRecherche = [];
      }
    },

    searchPlayer() {
      let usersSelected = [];

      localStorage.clear();
      localStorage.setItem("search", this.search);
      for (const user of this.users) {
        if (user.joueur) {
          for (const player of user.joueur) {
            if (
              player
                .toLowerCase()
                .includes(this.search.substring(6).toLowerCase())
            ) {
              usersSelected.push(user);
              localStorage.setItem("users", JSON.stringify(usersSelected));
            }
          }
        }

        if (
          user.NBA.includes(this.search.substring(6)) ||
          user.NHL.includes(this.search.substring(6)) ||
          user.NFL.includes(this.search.substring(6)) ||
          user.MLB.includes(this.search.substring(6)) ||
          user.SOCCER.includes(this.search.substring(6))
        ) {
          usersSelected.push(user);
          localStorage.setItem("users", JSON.stringify(usersSelected));
        }
      }

      this.$router.push("/resultats");

      e.preventDefault();
    },
  },
  //   beforeCreate() {
  //     instanceUser
  //       .get("/")
  //       .then((data) => {
  //         this.users = data.data.result;
  //         console.log(data.data.result);
  //       })
  //       .catch((error) => {
  //         error;
  //       });

  //     instanceSports
  //       .get("/")
  //       .then((data) => {
  //         let teams = data.data.result;
  //         for (const team of teams) {
  //           if (team.name == "NBA") {
  //             this.teamsNba = team;
  //           } else if (team.name == "NFL") {
  //             this.teamsNfl = team;
  //           } else if (team.name == "NHL") {
  //             this.teamsNhl = team;
  //           } else if (team.name == "MLB") {
  //             this.teamsMlb = team;
  //           } else if (team.name == "SOCCER") {
  //             this.teamsSoccer = team;
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         error;
  //       });
  //   },
};
</script>

<style>
</style>