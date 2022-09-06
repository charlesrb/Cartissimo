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
          placeholder="Joueur ou équipe collectionnée"
          class="header__form--input"
          v-model="search"
          @input="searchTeamInput"
        />
        <div class="header__form--list" id="testliste">
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

        <button @click="searchPlayer()" class="header__form--button">
          CHERCHER
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  data: function () {
    return {
      keys: {},
      search: "",
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

        for (const equipe of this.teamsNfl.teams) {
          if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
            listeEquipe.push(this.teamsNfl.name + " - " + equipe);
          }
          this.resultatRecherche = listeEquipe;
        }

        for (const equipe of this.teamsNhl.teams) {
          if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
            listeEquipe.push(this.teamsNhl.name + " - " + equipe);
          }
          this.resultatRecherche = listeEquipe;
        }

        for (const equipe of this.teamsMlb.teams) {
          if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
            listeEquipe.push(this.teamsMlb.name + " - " + equipe);
          }
          this.resultatRecherche = listeEquipe;
        }

        for (const equipe of this.teamsSoccer.teams) {
          if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
            listeEquipe.push(this.teamsSoccer.name + " - " + equipe);
          }
          this.resultatRecherche = listeEquipe;
        }
      } else if (this.search.length < 2) {
        this.resultatRecherche = [];
      }
    },

    searchPlayer() {
      let usersSelected = [];

      localStorage.clear();
      localStorage.setItem("search", this.search);
      for (const user of this.users) {
        if (user.joueur) {
          if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
            usersSelected.push(user);
            localStorage.setItem("users", JSON.stringify(usersSelected));
          }
          if (
            user.equipeNba.includes(this.search.substring(6)) ||
            user.equipeNhl.includes(this.search.substring(6)) ||
            user.equipeNfl.includes(this.search.substring(6)) ||
            user.equipeMlb.includes(this.search.substring(6)) ||
            user.equipeSoccer.includes(this.search.substring(6))
          ) {
            usersSelected.push(user);
            localStorage.setItem("users", JSON.stringify(usersSelected));
          }
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