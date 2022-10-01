<template>
  <main>
    <Navigation></Navigation>
    <Header></Header>
    <!-- <section class="header">
      <div class="header__text">
        <p>
          Trouvez d’autres collectionneurs et partagez ensemble votre passion
          pour le Hobby !
        </p>
      </div>
      <div class="header__form">
        <form action="" class="header__form--detail" @submit.prevent="onSubmit">
          <input
            type="text"
            placeholder="Joueur ou équipe collectionnée"
            class="header__form--input"
            v-model="search"
          />
          <button @click="searchPlayer()" class="header__form--button">
            CHERCHER
          </button>
        </form>
      </div>
    </section> -->
    <section class="title">
      <p>Resultats pour</p>
      <p>"{{ search }}"</p>
    </section>
    <section v-for="use in user" :key="use.id" class="resultats">
      <article class="resultats__detail">
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
    <section v-if="display == true || user == null" class="resultats">
      <article class="resultats__detail">
        <h3>Pas encore de collectionneurs !</h3>
        <p>
          Vous collectionnez ce joueur ?
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
import Header from "../components/Header.vue";
const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});
export default {
  name: "Resultats",
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("users")),
      search: this.$route.params.team,
      users: {},
      display: false,
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
    };
  },
  computed: {},
  methods: {
    searchPlayer() {
      this.user = [];

      for (const user of this.users) {
        if (user.joueur != null) {
          if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
            this.user.push(user);
          }
        } else if (!user.joueur) {
          this.display = !this.display;
        }
      }
    },
  },
  beforeCreate() {
    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;
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

  components: { Navigation, Header },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}
</style>