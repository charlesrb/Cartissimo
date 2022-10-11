<template>
  <Navigation></Navigation>
  <div v-if="mode == 'login'">
    <p>Vous n'avez pas de compte ?</p>
    <span class="card__action" @click="SwitchToCreateAccount()"
      >Inscrivez-vous</span
    >
  </div>
  <div v-if="mode == 'create'">
    <p>Déjà inscrit ?</p>
    <span class="card__action" @click="SwitchToLogin()">Connectez-vous</span>
  </div>
  <div class="header__form" v-if="mode == 'create'">
    <div class="header__form--detail">
      <label for="pseudo">Votre pseudo</label>
      <input
        type="text"
        class="header__form--input"
        name="pseudo"
        v-model="user.pseudo"
      />
      <label for="email">Votre email</label>
      <input
        type="email"
        class="header__form--input"
        name="email"
        v-model="user.mail"
      />
      <label for="password">Votre mot de passe</label>
      <input
        type="password"
        class="header__form--input"
        name="password"
        v-model="user.password"
      />
      <button class="header__form--button" @click="createUser()">
        S'inscrire
      </button>
    </div>
  </div>

  <div class="header__form" v-if="mode == 'login'">
    <div class="header__form--detail">
      <label for="email">Votre email</label>
      <input
        type="email"
        class="header__form--input"
        name="email"
        v-model="user.mail"
      />
      <label for="password">Votre mot de passe</label>
      <input
        type="password"
        class="header__form--input"
        name="password"
        v-model="user.password"
      />
      <button class="header__form--button" @click="login()">
        Se connecter
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Navigation from "../components/Navigation.vue";
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  name: "Inscription",
  components: { Navigation },
  data: function () {
    return {
      mode: "login",
      user: {
        pseudo: "",
        mail: "",
        password: "",
      },
    };
  },

  methods: {
    SwitchToCreateAccount: function () {
      this.mode = "create";
      this.errMessage = "";
    },
    SwitchToLogin: function () {
      this.mode = "login";
      this.errMessage = "";
    },

    createUser() {
      const user = { ...this.user };

      instanceUser
        .post("/", user)
        .then((data) => {
          console.log(data);
          //   this.$router.push("/");

          // localStorage.setItem("token", data.data.token);
          localStorage.setItem("userId", data.data.result._id);
          // localStorage.setItem("isAdmin", data.data.isAdmin);
        })
        .catch((err) => console.log(err));
    },

    login: function () {
      const user = { ...this.user };
      instanceUser
        .post("/login", user)
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userId", data.data.userId);
          console.log(data.data);
          if (data.status === 200) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style>
span {
  cursor: pointer;
}
</style>