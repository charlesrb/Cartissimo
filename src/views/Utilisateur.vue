<template>
  <main>
    <Navigation></Navigation>
    <section class="user">
      <div class="user__header">
        <span><i class="fas fa-circle-user"></i></span>
        <h1>{{ this.$route.query.user }}</h1>
      </div>
    </section>
    <section class="test" v-for="use in user" :key="use.id">
      {{ use.message }}
    </section>
    <div class="test2">
      <section v-for="use in user" :key="use.id">
        <div v-if="use.NBA != 0">
          <h4>Equipe NBA :</h4>
          <p v-for="team in use.NBA" :key="team.id" class="box">
            <router-link
              :to="{
                name: 'resultatsteam',
                params: { sport: 'NBA', team: `${team}` },
              }"
              >{{ team }}</router-link
            >
          </p>
        </div>
        <div v-if="use.NFL != 0">
          <h4>Equipe NFL :</h4>
          <p v-for="team in use.NFL" :key="team.id" class="box">
            <router-link
              :to="{
                name: 'resultatsteam',
                params: { sport: 'NFL', team: `${team}` },
              }"
              >{{ team }}</router-link
            >
          </p>
        </div>
        <div v-if="use.NHL != 0">
          <h4>Equipe NHL :</h4>
          <p v-for="team in use.NHL" :key="team.id" class="box">
            <router-link
              :to="{
                name: 'resultatsteam',
                params: { sport: 'NHL', team: `${team}` },
              }"
              >{{ team }}</router-link
            >
          </p>
        </div>
        <div v-if="use.MLB != 0">
          <h4>Equipe MLB :</h4>
          <p v-for="team in use.MLB" :key="team.id" class="box">
            <router-link
              :to="{
                name: 'resultatsteam',
                params: { sport: 'MLB', team: `${team}` },
              }"
              >{{ team }}</router-link
            >
          </p>
        </div>
        <div v-if="use.SOCCER != 0">
          <h4>Equipe Soccer :</h4>
          <p v-for="team in use.SOCCER" :key="team.id" class="box">
            <router-link
              :to="{
                name: 'resultatsteam',
                params: { sport: 'SOCCER', team: `${team}` },
              }"
              >{{ team }}</router-link
            >
          </p>
        </div>
      </section>
      <section v-for="use in user" :key="use.id">
        <h4>Joueurs :</h4>
        <p v-for="joueur in use.joueur" :key="joueur.id" class="box">
          {{ joueur }}
        </p>
      </section>
      <section v-for="use in user" :key="use.id">
        <h4>Collection :</h4>
        <p>{{ use.collec }}</p>
      </section>
    </div>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Utilisateur",
  data: function () {
    return {
      user: {},
    };
  },
  beforeCreate() {
    instanceUser
      .get("/")
      .then((data) => {
        this.user = data.data.result.filter(
          (user) => user.pseudo == this.$route.query.user
        );
        console.log(this.user);
      })
      .catch((error) => {
        error;
      });
  },
  components: { Navigation },
};
</script>

<style scoped>
.collection-detail {
  font-size: 13px;
}
.test {
  background-color: #505050;
  color: white;
  font-size: 13px;
  padding: 10px;
}

a {
  color: white !important;
}

.test2 {
  padding: 10px;
}
</style>
