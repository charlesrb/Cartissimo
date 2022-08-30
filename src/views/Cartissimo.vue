<template>
  <main>
    <nav class="menu">
      <div class="menu__button"><i class="fas fa-bars"></i></div>
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
    <!-- <section>
      <div v-for="user in users" :key="user.id">
        <p v-if="!search"></p>
        <p v-else-if="user.joueur.toLowerCase().includes(search.toLowerCase())">
          <span class="pseudo">{{ user.pseudo }}</span> -
          {{ user.joueur }}
        </p>
      </div>
    </section> -->
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>
      <form action="" class="collection__form">
        <select name="" id="" class="collection__form--select">
          <option v-for="teamNba in teamsNba" :key="teamNba.id" value="NBA">
            {{ teamNba.full_name }}
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
export default {
  name: "Cartissimo",
  data: function () {
    return {
      keys: {},
      users: {},
      teamsNba: {},
      teamsNfl: {},
      search: "",
    };
  },

  methods: {
    searchPlayer() {
      let testUser = [];
      localStorage.clear();

      localStorage.setItem("search", this.search);
      for (const user of this.users) {
        if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
          testUser.push(user);
          localStorage.setItem("users", JSON.stringify(testUser));
        }
      }
      this.$router.push("/resultats");

      // if ()
      // localStorage.setItem("users", this.userdata.data.token);
      // fetch(`https://sheetdb.io/api/v1/j8ef9j4vw6ecz/`)
      //   .then((res) => res.json())
      //   .then((response) => {
      //     console.log(response);

      //   })
      //   .catch((err) => console.log(err.message));
      e.preventDefault();
    },
  },
  beforeCreate() {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((res) => res.json())
      .then((data) => {
        this.teamsNba = data.data;
      })
      .catch((err) => console.log(err.message));

    fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")
      .then((res) => res.json())
      .then((data) => {
        this.teamsNfl = data.sports;
        console.log(data.sports.leagues);
      })
      .catch((err) => console.log(err.message));

    fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz")
      .then((res) => res.json())
      .then((data) => {
        this.users = data;
      })
      .catch((err) => console.log(err.message));

    // fetch("https://api.sheetson.com/v2/sheets/sheet", {
    //   headers: {
    //     Authorization:
    //       "Bearer nQiHh7iTzp303KDegk8UcYwLBsS-hWJrOkS3f9dKQN4P3M-KRbrOIcFAWhw",
    //     "X-Spreadsheet-Id": "1hdVHC9_ZiXENMNeZpieoDZtYNMbyt2KGGkpYO4EtFb0",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data.results;
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


