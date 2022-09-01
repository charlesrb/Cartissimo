<template>
  <main>
    <Navigation></Navigation>
    <section class="header">
      <div class="header__text">
        <span><i class="fas fa-circle-user"></i></span>
        <h1>{{ this.$route.query.user }}</h1>
      </div>
    </section>
    <section class="test" v-for="use in user" :key="use.id">
      {{ use.message }}
    </section>
    <div class="test2">
      <section v-for="use in user" :key="use.id">
        <div v-if="use.equipeNba != 0">
          <h4>Equipe NBA :</h4>
          <p v-for="team in use.equipeNba" :key="team.id">{{ team }}</p>
        </div>
        <div v-if="use.equipeNfl != 0">
          <h4>Equipe NFL :</h4>
          <p v-for="team in use.equipeNfl" :key="team.id">{{ team }}</p>
        </div>
        <div v-if="use.equipeNhl != 0">
          <h4>Equipe NHL :</h4>
          <p v-for="team in use.equipeNhl" :key="team.id">{{ team }}</p>
        </div>
        <div v-if="use.equipeMlb != 0">
          <h4>Equipe MLB :</h4>
          <p v-for="team in use.equipeMlb" :key="team.id">{{ team }}</p>
        </div>
        <div v-if="use.equipeSoccer != 0">
          <h4>Equipe Soccer :</h4>
          <p v-for="team in use.equipeSoccer" :key="team.id">{{ team }}</p>
        </div>
      </section>
      <section v-for="use in user" :key="use.id">
        <h4>Joueurs :</h4>
        <p>{{ use.joueur }}</p>
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
        console.log(data.data.result);
      })
      .catch((error) => {
        error;
      });
  },
  components: { Navigation },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}
.test {
  background-color: #505050;
  color: white;
  font-size: 13px;
  padding: 10px;
}

.test2 {
  padding: 10px;
}
</style>