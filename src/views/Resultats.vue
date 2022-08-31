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
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});
export default {
  name: "Resultats",
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("users")),
      search: localStorage.getItem("search"),
      users: {},
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
      console.log(testUser);

      location.reload();
    },
  },
  beforeCreate() {
    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;
        console.log(data.data);
      })
      .catch((error) => {
        error;
      });

    // fetch("https://api.steinhq.com/v1/storages/630f2aebbc148508ba8ab7e3/sheet")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;
    //   })
    //   .catch((err) => console.log(err.message));
  },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}
</style>