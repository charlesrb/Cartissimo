<template>
  <main>
    <Navigation></Navigation>

    <Header></Header>
    <RechercheTeam></RechercheTeam>
    <!-- <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>

      <form action="" class="collection__form">
        <select
          name="NBA"
          id="NBA"
          class="collection__form--select"
          v-model="selectNba"
          @change="selectTeam()"
        >
          <option value="NBA" disabled>NBA</option>

          <option
            v-for="teamNba in teamsNba.teams"
            :key="teamNba.id"
            :value="teamNba"
          >
            {{ teamNba }}
          </option>
        </select>
        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="selectNfl"
          @change="selectTeam()"
        >
          <option value="NFL" disabled>NFL</option>
          <option
            v-for="teamNfl in teamsNfl.teams"
            :key="teamNfl.id"
            :value="teamNfl"
          >
            {{ teamNfl }}
          </option>
        </select>
        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="selectNhl"
          @change="selectTeam()"
        >
          <option value="NHL" disabled>NHL</option>
          <option
            v-for="teamNhl in teamsNhl.teams"
            :key="teamNhl.id"
            :value="teamNhl"
          >
            {{ teamNhl }}
          </option>
        </select>

        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="selectMlb"
          @change="selectTeam()"
        >
          <option value="MLB" disabled>MLB</option>
          <option
            v-for="teamMlb in teamsMlb.teams"
            :key="teamMlb.id"
            :value="teamMlb"
          >
            {{ teamMlb }}
          </option>
        </select>

        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="selectSoccer"
          @change="selectTeam()"
        >
          <option value="SOCCER" disabled>SOCCER</option>
          <option
            v-for="teamSoccer in teamsSoccer.teams"
            :key="teamSoccer.id"
            :value="teamSoccer"
          >
            {{ teamSoccer }}
          </option>
        </select>
      </form>
    </section> -->
    <!-- <Subscribe></Subscribe> -->
    <section class="video">
      <div class="video__title">
        <h2>Découvrez nos vidéos sur YouTube</h2>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/Z7iNNc7rzhc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          showinfo="0"
          rel="0"
          controls="1"
        ></iframe>
        <legend>9 cartes qui résument mon parcours de collectionneur</legend>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/makTdonwPyA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <legend>Les premiers prototypes de cartes Cartissimo</legend>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/SfTkkzHT0XA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <legend>Après les Bulls elle va bosser pour Cartissimo</legend>
      </div>
    </section>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
// import Subscribe from "../components/Subscribe.vue";
import axios from "axios";
import Navigation from "../components/Navigation.vue";
import Header from "../components/Header.vue";
import RechercheTeam from "../components/RechercheTeam.vue";
const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});
const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});
export default {
  name: "Cartissimo",
  data: function () {
    return {
      keys: {},
      users: {},
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
      search: "",
      selectNba: "NBA",
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "SOCCER",
      resultatRecherche: "",
      resultatRechercheSport: "",
      test: "",
    };
  },
  computed: {},

  methods: {
    //   updateSearch(resultat) {
    //     this.search = resultat;
    //     document.getElementById("testliste").style.display = "none";
    //   },
    //   searchTeamInput() {
    //     let listeEquipe = [];
    //     document.getElementById("testliste").style.display = "block";
    //     if (this.search.length > 2) {
    //       for (const equipe of this.teamsNba.teams) {
    //         if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //           listeEquipe.push(this.teamsNba.name + " - " + equipe);
    //         }
    //         this.resultatRecherche = listeEquipe;
    //       }
    //       for (const equipe of this.teamsNfl.teams) {
    //         if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //           listeEquipe.push(this.teamsNfl.name + " - " + equipe);
    //         }
    //         this.resultatRecherche = listeEquipe;
    //       }
    //       for (const equipe of this.teamsNhl.teams) {
    //         if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //           listeEquipe.push(this.teamsNhl.name + " - " + equipe);
    //         }
    //         this.resultatRecherche = listeEquipe;
    //       }
    //       for (const equipe of this.teamsMlb.teams) {
    //         if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //           listeEquipe.push(this.teamsMlb.name + " - " + equipe);
    //         }
    //         this.resultatRecherche = listeEquipe;
    //       }
    //       for (const equipe of this.teamsSoccer.teams) {
    //         if (equipe.toLowerCase().includes(this.search.toLowerCase())) {
    //           listeEquipe.push(this.teamsSoccer.name + " - " + equipe);
    //         }
    //         this.resultatRecherche = listeEquipe;
    //       }
    //     } else if (this.search.length < 2) {
    //       this.resultatRecherche = [];
    //     }
    //   },
    //   searchPlayer() {
    //     let usersSelected = [];
    //     localStorage.clear();
    //     localStorage.setItem("search", this.search);
    //     for (const user of this.users) {
    //       if (user.joueur) {
    //         if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
    //           usersSelected.push(user);
    //           localStorage.setItem("users", JSON.stringify(usersSelected));
    //         }
    //         if (
    //           user.equipeNba.includes(this.search.substring(6)) ||
    //           user.equipeNhl.includes(this.search.substring(6)) ||
    //           user.equipeNfl.includes(this.search.substring(6)) ||
    //           user.equipeMlb.includes(this.search.substring(6)) ||
    //           user.equipeSoccer.includes(this.search.substring(6))
    //         ) {
    //           usersSelected.push(user);
    //           localStorage.setItem("users", JSON.stringify(usersSelected));
    //         }
    //       }
    //     }
    //     this.$router.push("/resultats");
    //     e.preventDefault();
    //   },
    //   selectTeam() {
    //     let testUser = [];
    //     localStorage.clear();
    //     if (this.selectNba != "NBA") {
    //       localStorage.setItem("select", this.selectNba);
    //       for (const user of this.users) {
    //         for (const use of user.equipeNba) {
    //           if (use) {
    //             if (use.includes(this.selectNba)) {
    //               testUser.push(user);
    //               localStorage.setItem("users", JSON.stringify(testUser));
    //               this.$router.push({
    //                 name: "resultatsteam",
    //                 path: "/resultatsteam/:sport/:team",
    //                 params: { sport: "NBA", team: `${this.selectNba}` },
    //               });
    //             } else {
    //               this.$router.push({
    //                 name: "resultatsteam",
    //                 path: "/resultatsteam/:sport/:team",
    //                 params: { sport: "NBA", team: `${this.selectNba}` },
    //               });
    //             }
    //           }
    //         }
    //       }
    //     }
    //     if (this.selectNfl != "NFL") {
    //       localStorage.setItem("select", this.selectNfl);
    //       for (const user of this.users) {
    //         // for (const use of user.equipeNfl) {
    //         if (user.equipeNfl.includes(this.selectNfl)) {
    //           // if (use.includes(this.selectNfl)) {
    //           testUser.push(user);
    //           localStorage.setItem("users", JSON.stringify(testUser));
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "NFL", team: `${this.selectNfl}` },
    //           });
    //         } else {
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "NFL", team: `${this.selectNfl}` },
    //           });
    //         }
    //         // }
    //       }
    //     }
    //     if (this.selectNhl != "NHL") {
    //       localStorage.setItem("select", this.selectNhl);
    //       for (const user of this.users) {
    //         if (user.equipeNhl.includes(this.selectNhl)) {
    //           testUser.push(user);
    //           localStorage.setItem("users", JSON.stringify(testUser));
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "NHL", team: `${this.selectNhl}` },
    //           });
    //         } else {
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "NHL", team: `${this.selectNhl}` },
    //           });
    //         }
    //       }
    //     }
    //     if (this.selectMlb != "MLB") {
    //       localStorage.setItem("select", this.selectMlb);
    //       for (const user of this.users) {
    //         if (user.equipeMlb.includes(this.selectMlb)) {
    //           testUser.push(user);
    //           localStorage.setItem("users", JSON.stringify(testUser));
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "MLB", team: `${this.selectMlb}` },
    //           });
    //         } else {
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "MLB", team: `${this.selectMlb}` },
    //           });
    //         }
    //       }
    //     }
    //     if (this.selectSoccer != "SOCCER") {
    //       localStorage.setItem("select", this.selectSoccer);
    //       for (const user of this.users) {
    //         if (user.equipeSoccer.includes(this.selectSoccer)) {
    //           testUser.push(user);
    //           localStorage.setItem("users", JSON.stringify(testUser));
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "SOCCER", team: `${this.selectSoccer}` },
    //           });
    //         } else {
    //           this.$router.push({
    //             name: "resultatsteam",
    //             path: "/resultatsteam/:sport/:team",
    //             params: { sport: "SOCCER", team: `${this.selectSoccer}` },
    //           });
    //         }
    //       }
    //     }
    //     console.log(testUser);
    //     // e.preventDefault();
    //   },
    // },
    // beforeCreate() {
    //   instanceUser
    //     .get("/")
    //     .then((data) => {
    //       this.users = data.data.result;
    //       console.log(data.data.result);
    //     })
    //     .catch((error) => {
    //       error;
    //     });
    //   // MODIFIER AVEC NOUVELLE BDD
    //   instanceSports
    //     .get("/")
    //     .then((data) => {
    //       let teams = data.data.result;
    //       for (const team of teams) {
    //         if (team.name == "NBA") {
    //           this.teamsNba = team;
    //         } else if (team.name == "NFL") {
    //           this.teamsNfl = team;
    //         } else if (team.name == "NHL") {
    //           this.teamsNhl = team;
    //         } else if (team.name == "MLB") {
    //           this.teamsMlb = team;
    //         } else if (team.name == "SOCCER") {
    //           this.teamsSoccer = team;
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       error;
    //     });
    // },
  },
  mounted() {
    document.title = "Cartissimo";
  },
  components: {
    Navigation,
    Header,
    RechercheTeam,
  },
};
</script>

<style>
.pseudo {
  font-weight: 700;
}

.collection__form select {
  height: 36px;
  width: 300px;
  text-decoration: none;
  border-radius: 20px;
  border: 1px solid #707070;
  padding-left: 15px;
  padding-right: 15px;
}

.video__title--detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

legend {
  margin-top: 10px;
  text-align: center;
}

h2 {
  text-align: center;
}
</style>


