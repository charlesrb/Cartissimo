<template>
  <Navigation></Navigation>

  <section class="user">
    <div class="user__header">
      <span><i class="fas fa-circle-user"></i></span>
      <h1>{{ user.pseudo }}</h1>
      <p>Email : {{ user.mail }}</p>
    </div>
  </section>
  <section class="test">
    {{ user.message }}
  </section>
  <div class="test2">
    <section>
      <div>
        <h4>Equipe NBA :</h4>
        <p v-for="team in user.NBA" :key="team.id" class="box">
          <router-link :to="{ path: `/NBA/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div>
        <h4>Equipe NFL :</h4>
        <p v-for="team in user.NFL" :key="team.id" class="box">
          <router-link :to="{ path: `/NFL/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div>
        <h4>Equipe NHL :</h4>
        <p v-for="team in user.NHL" :key="team.id" class="box">
          <router-link :to="{ path: `/NHL/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div>
        <h4>Equipe MLB :</h4>
        <p v-for="team in user.MLB" :key="team.id" class="box">
          <router-link :to="{ path: `/MLB/${team}` }">{{ team }}</router-link>
        </p>
      </div>
      <div>
        <h4>Equipe Soccer :</h4>
        <p v-for="team in user.SOCCER" :key="team.id" class="box">
          <router-link :to="{ path: `/SOCCER/${team}` }">{{
            team
          }}</router-link>
        </p>
      </div>
    </section>
    <section>
      <h4>Joueurs :</h4>
      <p v-for="joueur in user.joueur" :key="joueur.id" class="box">
        {{ joueur }}
      </p>
    </section>
    <section>
      <h4>Collection :</h4>
      <p>{{ user.collec }}</p>
    </section>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});
export default {
  name: "profile",
  components: { Navigation },
  data() {
    return {
      user: {},
    };
  },

  beforeCreate() {
    // Si l'état "isLogged" est false dans le store, on renvoie vers la page d'inscription / login

    const userId = localStorage.getItem("userId");
    instanceUser
      .get(`/${userId}`)
      .then((data) => (this.user = data.data.result))
      .catch((error) => {
        error;
      });
  },
};
</script>

<style>
</style>