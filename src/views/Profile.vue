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
    <div>
      <div
        class="
          flex
          align-middle
          gap-2
          justify-between
          border-solid border-b border-b-tertiaryBis
          mb-2
          pb-2
          mt-3
        "
      >
        <h4 class="font-bold">Equipes NBA :</h4>
        <span v-if="mode == ''"
          ><i class="fa fa-pen text-primary" @click="changeMode('Nba')"></i
        ></span>
        <span v-if="mode == 'editNba'"
          ><i class="fa fa-xmark text-primary" @click="changeMode('close')"></i
        ></span>
      </div>
      <div class="flex flex-row flex-wrap gap-2 mb-3">
        <p
          v-for="team in user.NBA"
          :key="team.id"
          class="
            text-white
            bg-primary
            rounded-lg
            flex
            gap-2
            pt-1
            pb-1
            px-2
            py-2
            align-middle
            font-small
            text-sm
          "
        >
          <router-link
            :to="{
              name: 'resultatsteam',
              params: { sport: 'NBA', team: `${team}` },
            }"
            >{{ team }}</router-link
          ><span
            ><i
              class="fa-solid fa-xmark"
              v-if="mode == 'editNba'"
              @click="deleteTeam('NBA', team)"
            ></i
          ></span>
        </p>
      </div>
      <div v-if="mode == 'editNba'">
        <select
          v-model="selectNba"
          @change="addTeam('NBA', selectNba)"
          class="
            block
            h-10
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            text-sm
            mb-2
          "
        >
          <option value="NBA" disabled class="font-small">NBA</option>
          <option
            v-for="teamNba in teamsNba"
            :key="teamNba.id"
            :value="teamNba"
            class="font-small"
          >
            {{ teamNba }}
          </option>
        </select>
        <p class="text-primary font-bold" id="err"></p>
        <button
          @click="modifyAccount()"
          class="bg-tertiary rounded-lg pt-1 pb-1 px-2 py-2 text-white"
        >
          Modifier
        </button>
      </div>
    </div>
    <div v-if="user.NFL.length">
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
        <router-link :to="{ path: `/SOCCER/${team}` }">{{ team }}</router-link>
      </p>
    </div>

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