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
          @change="selectTeamByLeague('NBA', selectNba)"
          v-model="selectNba"
        >
          <option :value="this.selectNba" disabled>NBA</option>

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
          @change="selectTeamByLeague('NFL', selectNfl)"
        >
          <option :value="this.selectNfl" disabled>NFL</option>
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
          @change="selectTeamByLeague('NHL', selectNhl)"
        >
          <option :value="this.selectNhl" disabled>NHL</option>
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
          @change="selectTeamByLeague('MLB', selectMlb)"
        >
          <option :value="this.selectMlb" disabled>MLB</option>
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
          @change="selectTeamByLeague('SOCCER', selectSoccer)"
        >
          <option :value="this.selectSoccer" disabled>Soccer</option>
          <option
            v-for="teamSoccer in teamsSoccer.teams"
            :key="teamSoccer.id"
            :value="teamSoccer"
          >
            {{ teamSoccer }}
          </option>
        </select>
      </div>
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
            use.twitter.toLowerCase() != 'non' ||
            use.instagram.toLowerCase() != 'non'
          "
        >
          <div v-if="use.twitter.toLowerCase() != 'non'">
            <img src="../assets/img/twitter_logo.png" alt="" />
            <a :href="'https://twitter.com/' + use.twitter" target="_blank">
              <p>{{ use.twitter }}</p>
            </a>
          </div>
          <div v-if="use.instagram.toLowerCase() != 'non'">
            <img src="../assets/img/instagram_logo.png" alt="" />
            <a
              :href="'https://instagram.com/' + use.instagram.substr(1)"
              target="_blank"
            >
              <p>{{ use.instagram }}</p>
            </a>
          </div>
        </div>
      </article>
    </section>

    <section v-if="display == true" class="resultats">
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
      user: [],
      select: this.$route.params.team,
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
      selectSoccer: "SOCCER",
      display: false,
    };
  },
  computed: {},
  methods: {
    selectTeamByLeague(league, selectedTeam) {
      this.user = [];
      this.select = selectedTeam;

      this.users
        .filter((user) => user[league].includes(selectedTeam))
        .forEach((user) => this.user.push(user));
      if (this.user.length != 0) {
        this.display = false;
      } else if (this.user.length === 0) {
        this.display = true;
      }
      this.$router.replace({
        params: { sport: league, team: `${selectedTeam}` },
      });
    },
  },
  beforeCreate() {
    instanceSports
      .get("/")
      .then((data) => {
        let teams = data.data.result;
        for (const team of teams) {
          console.log(team.name);
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

    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;

        let sportQuery = this.$route.params.sport;
        let teamQuery = this.$route.params.team;

        if (sportQuery == "NBA") {
          for (const user of this.users) {
            if (user.NBA.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NFL") {
          for (const user of this.users) {
            if (user.NFL.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NHL") {
          for (const user of this.users) {
            if (user.NHL.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "MLB") {
          for (const user of this.users) {
            if (user.MLB.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "SOCCER") {
          for (const user of this.users) {
            if (user.SOCCER.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
        }
        if (this.user.length == 0) {
          this.display = true;
        }
      })
      .catch((error) => {
        error;
      });
  },
  mounted() {
    document.title =
      "Cartissimo | Collectionneur de " +
      this.$route.params.sport +
      " | " +
      this.$route.params.team;
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
