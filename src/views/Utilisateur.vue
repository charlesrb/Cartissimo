<template>
  <main>
    <Navigation></Navigation>
    <section class="user">
      <div class="user__header">
        <span><i class="fas fa-circle-user"></i></span>
        <h1>{{ this.$route.query.user }}</h1>
      </div>
    </section>
    <section class="p-3">
      <h2 class="font-bold text-2xl text-start">Je suis...</h2>
      <p
        class="flex flex-col mt-2"
        v-if="user[0].twitter.toLowerCase() != 'non'"
      >
        <span class="font-bold"
          >Twitter :
          <a
            :href="'https://twitter.com/' + user[0].twitter"
            target="_blank"
            class="font-small font-normal cursor-pointer"
            >{{ user[0].twitter }}</a
          ></span
        >
      </p>
      <p
        class="flex flex-col mt-2"
        v-if="user[0].instagram.toLowerCase() != 'non'"
      >
        <span class="font-bold"
          >Instagram :
          <a
            :href="'https://instagram.com/' + user[0].instagram.substr(1)"
            target="_blank"
            class="font-normal cursor-pointer"
            >{{ user[0].instagram }}</a
          ></span
        >
      </p>
      <p class="font-bold mt-2">A propos de moi</p>
      <p>{{ user[0].message }}</p>
    </section>

    <div class="test2">
      <h2 class="font-bold text-2xl text-start">Je collectionne...</h2>

      <section v-for="use in user" :key="use.id">
        <div class="my-4" v-if="use.NBA != 0">
          <h4 class="font-bold">Equipe NBA :</h4>
          <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
            <p
              v-for="team in use.NBA"
              :key="team.id"
              class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
            >
              <router-link
                :to="{
                  name: 'resultatsteam',
                  params: {
                    sport: 'NBA',
                    equipe: 'equipe',
                    team: `${team.replaceAll(' ', '-')}`,
                  },
                }"
                >{{ team }}</router-link
              >
            </p>
          </div>
        </div>
        <div class="my-6" v-if="use.NFL != 0">
          <h4 class="font-bold">Equipe NFL :</h4>
          <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
            <p
              v-for="team in use.NFL"
              :key="team.id"
              class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
            >
              <router-link
                :to="{
                  name: 'resultatsteam',
                  params: {
                    sport: 'NFL',
                    equipe: 'equipe',
                    team: `${team.replaceAll(' ', '-')}`,
                  },
                }"
                >{{ team }}</router-link
              >
            </p>
          </div>
        </div>
        <div class="my-6" v-if="use.NHL != 0">
          <h4 class="font-bold">Equipe NHL :</h4>
          <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
            <p
              v-for="team in use.NHL"
              :key="team.id"
              class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
            >
              <router-link
                :to="{
                  name: 'resultatsteam',
                  params: {
                    sport: 'NHL',
                    equipe: 'equipe',
                    team: `${team.replaceAll(' ', '-')}`,
                  },
                }"
                >{{ team }}</router-link
              >
            </p>
          </div>
        </div>
        <div class="my-6" v-if="use.MLB != 0">
          <h4 class="font-bold">Equipe MLB :</h4>
          <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
            <p
              v-for="team in use.MLB"
              :key="team.id"
              class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
            >
              <router-link
                :to="{
                  name: 'resultatsteam',
                  params: {
                    sport: 'MLB',
                    equipe: 'equipe',
                    team: `${team.replaceAll(' ', '-')}`,
                  },
                }"
                >{{ team }}</router-link
              >
            </p>
          </div>
        </div>
        <div class="my-6" v-if="use.SOCCER != 0">
          <h4 class="font-bold">Equipe Soccer :</h4>
          <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
            <p
              v-for="team in use.SOCCER"
              :key="team.id"
              class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
            >
              <router-link
                :to="{
                  name: 'resultatsteam',
                  params: {
                    sport: 'SOCCER',
                    equipe: 'equipe',
                    team: `${team.replaceAll(' ', '-')}`,
                  },
                }"
                >{{ team }}</router-link
              >
            </p>
          </div>
        </div>
      </section>
      <section class="my-6" v-for="use in user" :key="use.id">
        <h4 class="font-bold">Joueurs :</h4>
        <div class="flex flex-row flex-wrap gap-2 mb-3 mt-2">
          <p
            v-for="joueur in use.joueur"
            :key="joueur.id"
            class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
          >
            <router-link
              :to="{
                name: 'resultats',
                params: {
                  sport: `${joueur.substring(0, 3).toLowerCase()}`,
                  joueur: 'joueur',
                  player: `${joueur.substring(6).replaceAll(' ', '-')}`,
                },
              }"
              >{{ joueur }}
            </router-link>
          </p>
        </div>
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

.test2 {
  padding: 10px;
}
</style>
