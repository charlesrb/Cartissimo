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
    <section v-if="display == false || user == null" class="resultats">
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
      display: false,
    };
  },
  computed: {},
  methods: {
    searchPlayer() {
      this.user = [];

      for (const user of this.users) {
        if (user.joueur != null) {
          if (user.joueur.toLowerCase().includes(this.search.toLowerCase())) {
            console.log(user.joueur);

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
  components: { Navigation },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}
</style>