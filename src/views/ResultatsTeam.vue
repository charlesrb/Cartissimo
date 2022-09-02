<template>
  <main>
    <Navigation></Navigation>
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>

      <div class="collection__form">
        <select
          name="NBA"
          id="NBA"
          class="collection__form--select"
          @change="selectTeamNba()"
          v-model="selectNba"
        >
          <option :value="this.selectNba" disabled>NBA</option>

          <option
            v-for="teamNba in teamsNba"
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
          @change.prevent="selectTeamNfl()"
        >
          <option :value="this.selectNfl" disabled>NFL</option>
          <option
            v-for="teamNfl in teamsNfl"
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
          @change="selectTeamNhl()"
        >
          <option :value="this.selectNhl" disabled>NHL</option>
          <option
            v-for="teamNhl in teamsNhl"
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
          @change="selectTeamMlb()"
        >
          <option :value="this.selectMlb" disabled>MLB</option>
          <option
            v-for="teamMlb in teamsMlb"
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
          @change="selectTeamSoccer()"
        >
          <option :value="this.selectSoccer" disabled>Soccer</option>
          <option
            v-for="teamSoccer in teamsSoccer"
            :key="teamSoccer.id"
            :value="teamSoccer"
          >
            {{ teamSoccer }}
          </option>
        </select>
      </div>
      >
    </section>
    <section class="title-2">
      <p>Resultats pour</p>
      <p>"{{ select }}"</p>
    </section>
    <section v-if="user != null && user.length >= 1" class="resultats">
      <article v-for="use in user" :key="use.id" class="resultats__detail">
        <div class="resultats__detail--user">
          <span><i class="fas fa-circle-user"></i></span>
          <h3>
            <router-link
              :to="{ path: '/utilisateur', query: { user: use.pseudo } }"
              >{{ use.pseudo }}</router-link
            >
          </h3>
        </div>
        <div v-if="use.contact">
          <p class="collection-detail">Contact :</p>
          <p class="collection-detail">{{ use.contact }}</p>
        </div>
        <div
          class="resultats__detail--socialmedia"
          v-if="
            use.twitter.toLowerCase() != non ||
            use.instagram.toLowerCase() != non
          "
        >
          <div v-if="use.twitter.toLowerCase() != 'non'">
            <img src="../assets/img/twitter_logo.png" alt="" />
            <a :href="'https://twitter.com/' + use.twitter">
              <p>{{ use.twitter }}</p>
            </a>
          </div>
          <div v-if="use.instagram.toLowerCase() != 'non'">
            <img src="../assets/img/instagram_logo.png" alt="" />
            <a :href="'https://instagram.com/' + use.instagram.substr(1)">
              <p>{{ use.instagram }}</p>
            </a>
          </div>
        </div>
      </article>
    </section>

    <section v-else-if="user == null || !user.length" class="resultats">
      <article class="resultats__detail">
        <h3>Pas encore de collectionneurs !</h3>
        <p>
          Vous collectionnez cette équipe ?
          <router-link class="link__subscribe" :to="{ path: '/subscribe' }"
            >Inscrivez-vous</router-link
          >
          !
        </p>
      </article>
    </section>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
import axios from "axios";
import Navigation from "../components/Navigation.vue";

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});
const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  name: "ResultatsTeam",
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("users")),
      select: localStorage.getItem("select"),

      users: {},
      teamsNba: {},
      teamsNfl: {},
      teamsNhl: {},
      teamsMlb: {},
      teamsSoccer: {},
      selectNba: "NBA",
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "Soccer",
    };
  },
  computed: {},
  methods: {
    selectTeamNba() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeNba.includes(this.selectNba)) {
          this.select = this.selectNba;
          this.user.push(user);
        }
      }
      if (this.select != this.selectNba) {
        this.select = this.selectNba;
      }
    },

    selectTeamNfl() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeNfl.includes(this.selectNfl)) {
          this.select = this.selectNfl;
          this.user.push(user);
        }
      }
      if (this.select != this.selectNfl) {
        this.select = this.selectNfl;
      }
    },
    selectTeamNhl() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeNhl.includes(this.selectNhl)) {
          this.select = this.selectNfl;
          this.user.push(user);
        }
      }
      if (this.select != this.selectNhl) {
        this.select = this.selectNhl;
      }
    },
    selectTeamMlb() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeMlb.includes(this.selectMlb)) {
          this.select = this.selectMlb;
          this.user.push(user);
        }
      }
      if (this.select != this.selectMlb) {
        this.select = this.selectMlb;
      }
    },
    selectTeamSoccer() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeSoccer.includes(this.selectSoccer)) {
          this.select = this.selectSoccer;
          this.user.push(user);
        }
      }
      if (this.select != this.selectSoccer) {
        this.select = this.selectSoccer;
      }
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

    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;
        console.log(data.data);
      })
      .catch((error) => {
        error;
      });
  },
  components: { Navigation },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}

.title-2 {
  background-color: #c22c25;
  color: white;
  height: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
}

.link__subscribe {
  color: #c22c25;
  font-weight: 700;
}
</style>