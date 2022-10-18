<template>
  <Navigation :isLogged="isLogged"></Navigation>
  
  <div class="header__form" v-if="mode == 'create'">
    <div class="header__form--detail">
      <h1 class="font-bold text-lg pt-4">S'inscrire</h1>

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
      <button class="bg-secondary text-white rounded-3xl py-2 px-4 my-2" type="submit" @click.stop.prevent="createUser()">
        S'inscrire
      </button>
    </div>
  </div>

  <div class="header__form" v-if="mode == 'login'">
    <div class="header__form--detail">
      <h1 class="font-bold text-lg pt-4">Se connecter</h1>
      <form class="header__form--detail">
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
        <button class="bg-secondary text-white rounded-3xl py-2 px-4 my-2" type="submit" @click.stop.prevent="login()">
          Se connecter
        </button>
      </form>
    </div>
  </div>
  <div class="flex justify-center align-middle mt-2 text-sm">
  <div v-if="mode == 'login'">
    <p class="text-center">Vous n'avez pas de compte ?</p>
    <p class="flex align-middle justify-center"><span class="card__action text-primary" @click="SwitchToCreateAccount()"
      >Inscrivez-vous</span
    ></p>
  </div>
</div>
<div class="flex justify-center align-middle mt-2 text-sm">
  <div v-if="mode == 'create'">
    <p class="text-center">Déjà inscrit ?</p>
    <p class="flex align-middle justify-center"><span class="card__action text-primary" @click="SwitchToLogin()">Connectez-vous</span></p>
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
      isLogged: "-1",
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
          this.$router.push("/profile");
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
          this.isLogged = data.data.userId;
          if (data.status === 200) {
            this.$router.push("/profile");
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