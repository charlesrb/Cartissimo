<template>
  <Navigation></Navigation>

  <section class="user">
    <div class="user__header">
      <span><i class="fas fa-circle-user"></i></span>
      <h1>{{ user.pseudo }}</h1>
    </div>
  </section>
  <section class="test">Email : {{ user.mail }}</section>
  <div class="test2">
    <section>
      <div>
        <div>
          <i class="fa fa-pen" @click="changeMode('Nba')"></i>
          <h4>Equipe NBA :</h4>
        </div>
        <p v-for="team in user.NBA" :key="team.id" class="box">
          <router-link
            :to="{
              name: 'resultatsteam',
              params: { sport: 'NBA', team: `${team}` },
            }"
            >{{ team }}</router-link
          ><i
            class="fa-solid fa-xmark"
            v-if="mode == 'editNba'"
            @click="deleteTeam('NBA', team)"
          ></i>
        </p>
        <div v-if="mode == 'editNba'">
          <select v-model="selectNba" @change="addTeam('NBA', selectNba)">
            <option
              v-for="teamNba in teamsNba"
              :key="teamNba.id"
              :value="teamNba"
            >
              {{ teamNba }}
            </option>
          </select>
          <button @click="modifyAccount()">Modifier</button>
        </div>
      </div>
      <div>
        <h4>Equipe NFL :</h4>
        <p v-for="team in user.NFL" :key="team.id" class="box">
          <router-link :to="{ path: `/NFL/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div v-if="user.NHL.length">
        <h4>Equipe NHL :</h4>
        <p v-for="team in user.NHL" :key="team.id" class="box">
          <router-link :to="{ path: `/NHL/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div v-if="user.MLB.length">
        <h4>Equipe MLB :</h4>
        <p v-for="team in user.MLB" :key="team.id" class="box">
          <router-link :to="{ path: `/MLB/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div v-if="user.SOCCER.length">
        <h4>Equipe Soccer :</h4>
        <p v-for="team in user.SOCCER" :key="team.id" class="box">
          <router-link :to="{ path: `/SOCCER/${team}` }">{{
            team
          }}</router-link>
        </p>
      </div>
    </section>
    <section>
      <h4>Joueurs :</h4>
      <p v-for="joueur in user.joueur" :key="joueur.id" class="box">
        {{ joueur }}
      </p>
    </section>
    <section>
      <h4>Collection :</h4>
      <p>{{ user.collec }}</p>
    </section>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});

export default {
  name: "profile",
  components: { Navigation },
  data() {
    return {
      user: {},
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
      selectNba: "",
      mode: "",
    };
  },
  methods: {
    addTeam(league, selectedTeam) {
      this.user[league].push(selectedTeam);
    },

    deleteTeam(league, selectedTeam) {
      const pos = this.user[league].indexOf(selectedTeam);
      this.user[league].splice(pos, 1);
    },

    changeMode(league) {
      this.mode = "edit" + league;
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