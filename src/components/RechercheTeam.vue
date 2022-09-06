<template>
  <section class="collection">
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
  name: "RechercheTeam",
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
  methods: {
    selectTeam() {
      let testUser = [];
      localStorage.clear();

      if (this.selectNba != "NBA") {
        localStorage.setItem("select", this.selectNba);
        for (const user of this.users) {
          for (const use of user.equipeNba) {
            if (use) {
              if (use.includes(this.selectNba)) {
                testUser.push(user);
                localStorage.setItem("users", JSON.stringify(testUser));
                this.$router.push({
                  name: "resultatsteam",
                  path: "/resultatsteam/:sport/:team",
                  params: { sport: "NBA", team: `${this.selectNba}` },
                });
              } else {
                this.$router.push({
                  name: "resultatsteam",
                  path: "/resultatsteam/:sport/:team",
                  params: { sport: "NBA", team: `${this.selectNba}` },
                });
              }
            }
          }
        }
      }
      if (this.selectNfl != "NFL") {
        localStorage.setItem("select", this.selectNfl);
        for (const user of this.users) {
          // for (const use of user.equipeNfl) {
          if (user.equipeNfl.includes(this.selectNfl)) {
            // if (use.includes(this.selectNfl)) {
            testUser.push(user);
            localStorage.setItem("users", JSON.stringify(testUser));
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "NFL", team: `${this.selectNfl}` },
            });
          } else {
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "NFL", team: `${this.selectNfl}` },
            });
          }
          // }
        }
      }
      if (this.selectNhl != "NHL") {
        localStorage.setItem("select", this.selectNhl);
        for (const user of this.users) {
          if (user.equipeNhl.includes(this.selectNhl)) {
            testUser.push(user);
            localStorage.setItem("users", JSON.stringify(testUser));
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "NHL", team: `${this.selectNhl}` },
            });
          } else {
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "NHL", team: `${this.selectNhl}` },
            });
          }
        }
      }
      if (this.selectMlb != "MLB") {
        localStorage.setItem("select", this.selectMlb);
        for (const user of this.users) {
          if (user.equipeMlb.includes(this.selectMlb)) {
            testUser.push(user);
            localStorage.setItem("users", JSON.stringify(testUser));
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "MLB", team: `${this.selectMlb}` },
            });
          } else {
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "MLB", team: `${this.selectMlb}` },
            });
          }
        }
      }

      if (this.selectSoccer != "SOCCER") {
        localStorage.setItem("select", this.selectSoccer);
        for (const user of this.users) {
          if (user.equipeSoccer.includes(this.selectSoccer)) {
            testUser.push(user);
            localStorage.setItem("users", JSON.stringify(testUser));
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "SOCCER", team: `${this.selectSoccer}` },
            });
          } else {
            this.$router.push({
              name: "resultatsteam",
              path: "/resultatsteam/:sport/:team",
              params: { sport: "SOCCER", team: `${this.selectSoccer}` },
            });
          }
        }
      }

      console.log(testUser);

      // e.preventDefault();
    },
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
</style>