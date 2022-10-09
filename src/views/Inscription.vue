<template>
  <Navigation></Navigation>

  <label for="pseudo">Votre pseudo</label>
  <input type="text" name="pseudo" v-model="user.pseudo" />
  <label for="email">Votre email</label>
  <input type="email" name="email" v-model="user.mail" />
  <label for="password">Votre mot de passe</label>
  <input type="password" name="password" v-model="user.password" />
  <button @click="createUser()">S'inscrire</button>
</template>

<script>
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
      user: {
        pseudo: "",
        mail: "",
        password: "",
      },
    };
  },

  methods: {
    createUser() {
      const user = { ...this.user };
      console.log(user);
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
  },
};
</script>

<style>
</style>