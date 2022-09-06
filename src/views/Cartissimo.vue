<template>
  <main>
    <Navigation></Navigation>
    <Header
      :teamsNba="teamsNba"
      :teamsNfl="teamsNfl"
      :teamsNhl="teamsNhl"
      :teamsMlb="teamsMlb"
      :teamsSoccer="teamsSoccer"
      :users="users"
    ></Header>

    <RechercheTeam
      :teamsNba="teamsNba"
      :teamsNfl="teamsNfl"
      :teamsNhl="teamsNhl"
      :teamsMlb="teamsMlb"
      :teamsSoccer="teamsSoccer"
      :users="users"
    ></RechercheTeam>
    <Videos></Videos>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import Header from "../components/Header.vue";
import RechercheTeam from "../components/RechercheTeam.vue";
import Videos from "../components/Videos.vue";

import axios from "axios";

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
    };
  },
  components: {
    Navigation,
    Header,
    RechercheTeam,
    Videos,
  },
  beforeCreate() {
    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;
        console.log(data.data.result);
      })
      .catch((error) => {
        error;
      });

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


