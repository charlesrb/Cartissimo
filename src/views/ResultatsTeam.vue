<template>
  <main>
    <Navigation></Navigation>
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>

      <form action="" class="collection__form">
        <select
          name="NBA"
          id="NBA"
          class="collection__form--select"
          v-model="select"
          @change="selectTeam()"
        >
          <option value="" disabled>NBA</option>

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
          v-model="select"
          @change.prevent="selectTeam()"
        >
          <option value="" disabled>NFL</option>
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
          v-model="select"
          @change="selectTeam()"
        >
          <option value="" disabled>NHL</option>
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
          v-model="select"
          @change="selectTeam()"
        >
          <option value="" disabled>MLB</option>
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
          v-model="select"
          @change="selectTeam()"
        >
          <option value="" disabled>Soccer</option>
          <option
            v-for="teamSoccer in teamsSoccer"
            :key="teamSoccer.id"
            :value="teamSoccer"
          >
            {{ teamSoccer }}
          </option>
        </select>
      </form>
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
        <div>
          <p class="collection-detail">Collection : {{ use.collection }}</p>
        </div>
        <div
          class="resultats__detail--socialmedia"
          v-if="(use.twitter && use.instagram) || use.twitter || use.instagram"
        >
          <div v-if="use.twitter && use.twitter != 'Non'">
            <img src="../assets/img/twitter_logo.png" alt="" />
            <p>{{ use.twitter }}</p>
          </div>
          <div v-if="use.instagram && use.instagram != 'Non'">
            <img src="../assets/img/instagram_logo.png" alt="" />
            <p>{{ use.instagram }}</p>
          </div>
        </div>
      </article>
    </section>

    <section v-else-if="user == null || !user.length" class="resultats">
      <article class="resultats__detail">
        <h3>Pas encore de collectionneurs !</h3>
        <p>
          Vous collectionnez cette équipe ?
          <router-link :to="{ path: '/subscribe' }">Inscrivez-vous</router-link>
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
      selectNba: "",
      selectNfl: "",
      selectNhl: "",
      selectMlb: "",
      selectSoccer: "",
      robert: [{ name: "NBA" }, { name: "NFL" }],
    };
  },
  computed: {
    selectTeam() {
      this.user = [];

      for (const user of this.users) {
        if (user.equipeNba.includes(this.select)) {
          for (const use of user.equipeNba) {
            if (use) {
              if (use.includes(this.select)) {
                this.user.push(user);
              }
            }
          }
        } else if (user.equipeNfl.includes(this.select)) {
          for (const use of user.equipeNfl) {
            if (use) {
              if (use.includes(this.select)) {
                this.user.push(user);
              }
            }
          }
        } else if (user.equipeNhl.includes(this.select)) {
          for (const use of user.equipeNhl) {
            if (use) {
              if (use.includes(this.select)) {
                this.user.push(user);
              }
            }
          }
        } else if (user.equipeMlb.includes(this.select)) {
          for (const use of user.equipeMlb) {
            if (use) {
              if (use.includes(this.select)) {
                this.user.push(user);
              }
            }
          }
        } else if (user.equipeSoccer.includes(this.select)) {
          for (const use of user.equipeSoccer) {
            if (use) {
              if (use.includes(this.select)) {
                this.user.push(user);
              }
            }
          }
        }
      }
      // e.preventDefault();
    },
  },
  methods: {},
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

    // fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;

    //     // for (const user of this.users) {
    //     //   if (user.equipe.toLowerCase().includes(this.select.toLowerCase())) {
    //     //     testUser.push(user);
    //     //   }
    //     // }
    //   })
    //   .catch((err) => console.log(err.message));

    // fetch("https://api.steinhq.com/v1/storages/630f2aebbc148508ba8ab7e3/sheet")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;
    //     console.log(this.users);
    //   })
    //   .catch((err) => console.log(err.message));

    // fetch("https://www.balldontlie.io/api/v1/teams")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.teamsNba = data.data;
    //   })
    //   .catch((err) => console.log(err.message));

    // fetch("https://api.steinhq.com/v1/storages/630f2aebbc148508ba8ab7e3/sheet")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;
    //   })
    //   .catch((err) => console.log(err.message));
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
</style>