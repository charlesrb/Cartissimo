<template>
  <main>
    <Navigation></Navigation>
    <!-- <Header
      :teamsNba="teamsNba"
      :teamsNfl="teamsNfl"
      :teamsNhl="teamsNhl"
      :teamsMlb="teamsMlb"
      :teamsSoccer="teamsSoccer"
      :users="users"
    ></Header> -->
    <section class="header">
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
            @input="searchTeamInput"
          />
          <div class="header__form--list" id="listeEquipes">
            <ul>
              <li
                v-for="resultat in resultatRecherche"
                :key="resultat.id"
                @click="updateSearch(resultat)"
              >
                {{ resultat }}
              </li>
            </ul>
          </div>
          <button @click="searchPlayer()" class="header__form--button">
            CHERCHER
          </button>
        </form>
      </div>
    </section>
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
      resultatRecherche: "",
    };
  },
  computed: {},
  methods: {
    updateSearch(resultat) {
      this.search = resultat;
      document.getElementById("listeEquipes").style.display = "none";
    },

    searchTeamInput() {
      let listeEquipe = [];

      document.getElementById("listeEquipes").style.display = "block";

      if (this.search.length > 2) {
        instanceSports
          .get(`/${this.search}`)
          .then((data) => {
            this.resultatRecherche = data.data;
          })
          .catch((error) => {
            error;
          });
      } else if (this.search.length < 2) {
        this.resultatRecherche = [];
      }
    },

    // searchPlayer() {
    //   this.user = [];

    //   for (const user of this.users) {
    //     if (user.joueur != null) {
    //       if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
    //         this.user.push(user);
    //       }
    //     } else if (!user.joueur) {
    //       this.display = !this.display;
    //     }
    //   }
    // },

    searchPlayer() {
      let usersSelected = [];

      for (const user of this.users) {
        if (user.joueur) {
          for (const player of user.joueur) {
            if (
              player
                .toLowerCase()
                .includes(this.search.substring(6).toLowerCase())
            ) {
              usersSelected.push(user);
              localStorage.setItem("users", JSON.stringify(usersSelected));
            }
          }
        }

        if (
          user.NBA.includes(this.search.substring(6)) ||
          user.NHL.includes(this.search.substring(6)) ||
          user.NFL.includes(this.search.substring(6)) ||
          user.MLB.includes(this.search.substring(6)) ||
          user.SOCCER.includes(this.search.substring(6))
        ) {
          usersSelected.push(user);
        }
      }

      this.$router.replace({
        params: {
          sport: `${this.search.substring(0, 3)}`,
          team: `${this.search.substring(6)}`,
        },
      });

      // e.preventDefault();
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