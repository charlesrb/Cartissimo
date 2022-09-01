<template>
  <main>
    <nav class="menu">
      <div class="menu__button">
        <router-link to="/subscribe"><i class="fas fa-bars"></i></router-link>
      </div>
      <div class="menu__title">Cartissimo.fr</div>
    </nav>
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
          />
          <button @click="searchPlayer()" class="header__form--button">
            CHERCHER
          </button>
        </form>
      </div>
    </section>

    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>

      <form action="" class="collection__form">
        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="select"
          @change="selectTeam()"
        >
          <option value="NBA" disabled>NBA</option>

          <option
            v-for="teamNba in teamsNba"
            :key="teamNba.id"
            :value="teamNba.name"
          >
            {{ teamNba.name }}
          </option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="NFL">NFL</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="MLB">MLB</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="NHL">NHL</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="Soccer">Soccer</option>
        </select>
      </form>
    </section>
    <!-- <Subscribe></Subscribe> -->
    <section class="video">
      <div class="video__title">
        <p>Découvrez nos vidéos sur YouTube</p>
      </div>
      <div class="video__img">
        <img src="../assets/img/thumbnails.png" alt="" />
        <legend>Conception de carte jersey | Épisode 011</legend>
      </div>
    </section>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
// import Subscribe from "../components/Subscribe.vue";
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
      teamsNba: {},
      teamsNfl: {},
      search: "",
      select: "NBA",
    };
  },
  computed: {},

  methods: {
    searchPlayer() {
      let usersSelected = [];

      localStorage.clear();
      localStorage.setItem("search", this.search);
      for (const user of this.users) {
        if (user.joueur) {
          if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
            usersSelected.push(user);
            localStorage.setItem("users", JSON.stringify(usersSelected));
          }
        }
      }
      this.$router.push("/resultats");
      e.preventDefault();
    },

    selectTeam() {
      let testUser = [];
      localStorage.clear();
      localStorage.setItem("select", this.select);
      for (const user of this.users) {
        for (const use of user.equipeNba) {
          if (use) {
            if (use.includes(this.select)) {
              testUser.push(user);
              localStorage.setItem("users", JSON.stringify(testUser));
            }
          }
        }
      }
      console.log(testUser);
      this.$router.push("/resultatsteam");

      e.preventDefault();
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
        console.log(data.data);
        this.teamsNba = data.data.result[0].league.equipes;
      })
      .catch((error) => {
        error;
      });

    // fetch("https://www.balldontlie.io/api/v1/teams")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.teamsNba = data.data;
    //   })
    //   .catch((err) => console.log(err.message));

    // fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.sports[0].leagues[0].teams);
    //     this.teamsNfl = data.sports[0].leagues[0].teams;
    //   })
    //   .catch((err) => console.log(err.message));

    // fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.teamsNfl = data.sports;
    //     console.log(data.sports.leagues);
    //   })
    //   .catch((err) => console.log(err.message));
  },
};
</script>

<style>
.pseudo {
  font-weight: 700;
}
</style>


