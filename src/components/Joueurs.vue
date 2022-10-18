<template>
  <div
    class="flex align-middle gap-2 justify-between border-solid border-b border-b-tertiaryBis mb-2 pb-2 mt-3"
  >
    <h4 class="font-bold">Joueurs :</h4>
    <span v-if="mode == ''"
      ><i class="fa fa-pen text-primary" @click="changeMode('Nba')"></i
    ></span>
    <span v-if="mode == 'edit'"
      ><i class="fa fa-xmark text-primary" @click="changeMode('close')"></i
    ></span>
  </div>
  <div class="flex flex-row flex-wrap gap-2 mb-3">
    <p
      v-for="joueur in user.joueur"
      :key="joueur.id"
      class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
    >
      <router-link
        :to="{
          name: 'resultats',
          params: {
            sport: `${joueur.substring(0, 3).toLowerCase()}`,
            player: `${joueur.substring(6).replaceAll(' ', '-')}`,
          },
        }"
        >{{ joueur }}</router-link
      ><span v-if="mode == 'edit'"
        ><i class="fa-solid fa-xmark" @click="deleteTeam(joueur)"></i
      ></span>
    </p>
  </div>
  <input
    type="text"
    class="border border-primary w-full mb-4 rounded-lg px-2"
    v-if="mode == 'edit'"
    v-model="select"
    @input="searchTeamInput"
  />
  <p id="err" class="font-bold text-primary"></p>
  <div id="listeJoueurs">
    <ul>
      <li
        v-for="resultat in resultatRecherche"
        :key="resultat.id"
        @click="updateSearch(resultat)"
      >
        {{ resultat }}
      </li>
    </ul>
  </div>
  <button
    v-if="mode == 'edit'"
    @click="modifyAccount()"
    class="bg-tertiary rounded-lg pt-1 pb-1 px-2 py-2 text-white"
  >
    Modifier
  </button>
</template>

<script>
import axios from "axios";

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  data() {
    return {
      mode: "",
      select: "",
      resultatRecherche: "",
    };
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Joueurs",
  methods: {
    changeMode(league) {
      if (league == "close") {
        this.mode = "";
      } else {
        this.mode = "edit";
      }
    },

    deleteTeam(selectedPlayer) {
      const pos = this.user.joueur.indexOf(selectedPlayer);
      this.user.joueur.splice(pos, 1);
    },

    updateSearch(resultat) {
      if (this.user.joueur.includes(resultat)) {
        document.getElementById("err").innerHTML =
          "Vous collectionnez déjà ce joueur !";
      } else {
        document.getElementById("err").innerHTML = "";
        this.user.joueur.push(resultat);
      }
      document.getElementById("listeJoueurs").style.display = "none";
    },

    searchTeamInput() {
      document.getElementById("listeJoueurs").style.display = "block";

      if (this.select.length > 2) {
        instanceSports
          .get(`/${this.select}`)
          .then((data) => {
            this.resultatRecherche = data.data;
          })
          .catch((error) => {
            error;
          });
      } else if (this.select.length < 2) {
        this.resultatRecherche = [];
      }
    },
    modifyAccount() {
      const userId = localStorage.getItem("userId");
      const user = { ...this.user };
      instanceUser
        .put(`/${userId}`, user)
        .then(() => (this.mode = ""))
        .catch((error) => error);
    },
  },
  props: {
    user: {},
  },
};
</script>

<style></style>
