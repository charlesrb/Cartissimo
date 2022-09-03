<template>
  <main>
    <Navigation></Navigation>

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
          name="NBA"
          id="NBA"
          class="collection__form--select"
          v-model="selectNba"
          @change="selectTeam()"
        >
          <option value="NBA" disabled>NBA</option>

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
          @change="selectTeam()"
        >
          <option value="NFL" disabled>NFL</option>
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
          @change="selectTeam()"
        >
          <option value="NHL" disabled>NHL</option>
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
          @change="selectTeam()"
        >
          <option value="MLB" disabled>MLB</option>
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
          @change="selectTeam()"
        >
          <option value="SOCCER" disabled>SOCCER</option>
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
    <!-- <Subscribe></Subscribe> -->
    <section class="video">
      <div class="video__title">
        <h2>Découvrez nos vidéos sur YouTube</h2>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/Z7iNNc7rzhc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          showinfo="0"
          rel="0"
          controls="1"
        ></iframe>
        <legend>9 cartes qui résument mon parcours de collectionneur</legend>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/makTdonwPyA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <legend>Les premiers prototypes de cartes Cartissimo</legend>
      </div>
      <div class="video__title--detail">
        <iframe
          src="https://www.youtube.com/embed/SfTkkzHT0XA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <legend>Après les Bulls elle va bosser pour Cartissimo</legend>
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
import Navigation from "../components/Navigation.vue";

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
      teamsNhl: {},
      teamsMlb: {},
      teamsSoccer: {},
      search: "",
      selectNba: "NBA",
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "SOCCER",
    };
  },
  computed: {},

  methods: {
    showMenu() {
      console.log("coucou");
    },
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
      // for (const user of this.users) {
      //   for (const use of user.equipeNba) {
      //     if (use) {
      //       if (use.includes(this.selectNba)) {
      //         testUser.push(user);
      //         localStorage.setItem("users", JSON.stringify(testUser));
      //       } else if (use.includes(this.selectNfl)) {
      //         testUser.push(user);
      //         localStorage.setItem("users", JSON.stringify(testUser));
      //       }
      //     }
      //   }
      // }

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
  mounted() {
    document.title = "Cartissimo";
  },
  components: {
    Navigation,
  },
};
</script>

<style>
.pseudo {
  font-weight: 700;
}

.collection__form select {
  height: 36px;
  width: 300px;
  text-decoration: none;
  border-radius: 20px;
  border: 1px solid #707070;
  padding-left: 15px;
  padding-right: 15px;
}

.video__title--detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

legend {
  margin-top: 10px;
  text-align: center;
}

h2 {
  text-align: center;
}
</style>


