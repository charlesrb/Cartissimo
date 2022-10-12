<template>
  <Navigation></Navigation>

  <section class="user">
    <div class="user__header">
      <span><i class="fas fa-circle-user"></i></span>
      <h1>{{ user.pseudo }}</h1>
    </div>
  </section>
  <section class="p-2">
    Email : {{ user.mail }}
    <AffichageEquipe
      :user="user"
      :userTeam="user.NBA"
      league="NBA"
      :teams="teamsNba"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.NFL"
      league="NFL"
      :teams="teamsNfl"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.NHL"
      league="NHL"
      :teams="teamsNhl"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.MLB"
      league="MLB"
      :teams="teamsMlb"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.SOCCER"
      league="SOCCER"
      :teams="teamsSoccer"
    ></AffichageEquipe>

    <!-- <h4>Joueurs :</h4>
    <p v-for="joueur in user.joueur" :key="joueur.id" class="box">
      {{ joueur }}
    </p>

    <h4>Collection :</h4>
    <p>{{ user.collec }}</p> -->
  </section>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";
import AffichageEquipe from "../components/AffichageEquipe.vue";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});

export default {
  name: "profile",
  components: { Navigation, AffichageEquipe },
  data() {
    return {
      user: {},
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
      selectNba: "NBA",
      mode: "",
    };
  },
  methods: {
    addTeam(league, selectedTeam) {
      if (this.user[league].includes(selectedTeam)) {
        document.getElementById("err").innerHTML =
          "Vous collectionnez déjà cette équipe !";
      } else {
        document.getElementById("err").innerHTML = "";
        this.user[league].push(selectedTeam);
        this.selectNba = "NBA";
      }
    },

    deleteTeam(league, selectedTeam) {
      const pos = this.user[league].indexOf(selectedTeam);
      this.user[league].splice(pos, 1);
    },

    changeMode(league) {
      if (league == "close") {
        this.mode = "";
      } else {
        this.mode = "edit" + league;
      }
    },

    modifyAccount() {
      const userId = localStorage.getItem("userId");
      const user = { ...this.user };
      instanceUser
        .put(`/${userId}`, user)
        .then((res) => (this.mode = ""))
        .catch((error) => error);
    },
  },

  beforeCreate() {
    const userId = localStorage.getItem("userId");
    instanceUser
      .get(`/${userId}`)
      .then((data) => (this.user = data.data.result))
      .catch((error) => {
        error;
      });

    instanceSports
      .get("/")
      .then((data) => {
        let teams = data.data.result;
        for (const team of teams) {
          if (team.name == "NBA") {
            this.teamsNba = team.teams;
          } else if (team.name == "NFL") {
            this.teamsNfl = team.teams;
          } else if (team.name == "NHL") {
            this.teamsNhl = team.teams;
          } else if (team.name == "MLB") {
            this.teamsMlb = team.teams;
          } else if (team.name == "SOCCER") {
            this.teamsSoccer = team.teams;
          }
        }
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style scoped>
a {
  color: white !important;
}
</style>