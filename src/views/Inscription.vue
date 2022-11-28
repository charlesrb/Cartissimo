<template>
  <Navigation :isLogged="isLogged"></Navigation>

  <div class="header__form" v-if="mode == 'create'">
    <div class="header__form--detail">
      <h1 class="font-bold text-lg pt-4">S'inscrire</h1>
      <form class="header__form--detail">
        <label class="mt-4" for="pseudo">Votre pseudo</label>
        <input
          type="text"
          class="header__form--input"
          name="pseudo"
          v-model="user.pseudo"
          required
        />
        <label class="mt-4" for="email">Votre email</label>
        <input
          type="email"
          class="header__form--input"
          name="email"
          v-model="user.mail"
          required
        />
        <p id="mail" class="my text-xs px-4 text-center">Votre adresse email doit être de la forme exemple@mail.com</p>
        <label class="mt-4" for="password">Votre mot de passe</label>
        <input
          type="password"
          class="header__form--input"
          name="password"
          v-model="user.password"
          required
        />
        <div class="flex flex-col justify-center align-middle">
          <p id="password" class="my text-xs px-4 text-center">Votre mot de passe doit faire entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial</p>
        </div>
        <button
          class="bg-secondary text-white rounded-3xl py-2 px-4 my-2"
          type="submit"
          @click.stop.prevent="createUser()"
        >
          S'inscrire
        </button>
      </form>
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
          required
        />
        <label for="password">Votre mot de passe</label>
        <input
          type="password"
          class="header__form--input"
          name="password"
          v-model="user.password"
          required
        />
        <div class="flex flex-col justify-center align-middle">
          <p id="err" class="text-primary my-2 text-sm px-4 text-center"></p>
        </div>
        <button
          class="bg-secondary text-white rounded-3xl py-2 px-4 my-2"
          type="submit"
          @click.stop.prevent="login()"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
  <div class="flex justify-center align-middle mt-2 text-sm">
    <div v-if="mode == 'login'">
      <p class="text-center">Vous n'avez pas de compte ?</p>
      <p class="flex align-middle justify-center">
        <span class="card__action text-primary" @click="SwitchToCreateAccount()"
          >Inscrivez-vous</span
        >
      </p>
    </div>
  </div>
  <div class="flex justify-center align-middle mt-2 text-sm">
    <div v-if="mode == 'create'">
      <p class="text-center">Déjà inscrit ?</p>
      <p class="flex align-middle justify-center">
        <span class="card__action text-primary" @click="SwitchToLogin()"
          >Connectez-vous</span
        >
      </p>
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
      document.getElementById("err").innerHTML = "";

    },
    SwitchToLogin: function () {
      this.mode = "login";
      this.errMessage = "";
      document.getElementById("err").innerHTML = "";

    },

    createUser() {
      const user = { ...this.user };
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
      const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
      const errPass = document.getElementById("password");
      const errMail = document.getElementById("mail");
      errPass.classList.remove("text-primary", "font-bold")
      errMail.classList.remove("text-primary", "font-bold")

      if (!regexEmail.test(user.mail)) {
        errMail.classList.add("text-primary", "font-bold")
        return;
      }

      if (!regexPassword.test(user.password)) {
        errPass.classList.add("text-primary", "font-bold")
        return;
      }
      
      instanceUser
        .post("/", user)
        .then((data) => {
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
          document.getElementById("err").innerHTML = error.response.data.error;          
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