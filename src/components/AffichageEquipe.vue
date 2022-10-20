<template>
  <div class="my-10">
    <div
      class="flex align-middle gap-2 justify-between border-solid border-b border-b-tertiaryBis mb-2 pb-2 mt-3"
    >
      <h4 class="font-bold">Equipes {{ league }} :</h4>
      <span v-if="mode == ''"
        ><i class="fa fa-pen text-primary" @click="changeMode('Nba')"></i
      ></span>
      <span v-if="mode == 'edit'"
        ><i class="fa fa-xmark text-primary" @click="changeMode('close')"></i
      ></span>
    </div>
    <div class="flex flex-row flex-wrap gap-2 mb-3">
      <p
        v-for="team in userTeam"
        :key="team.id"
        class="text-white bg-primary rounded-lg flex gap-2 pt-1 pb-1 px-2 py-2 align-middle font-small text-sm"
      >
        <router-link
          :to="{
            name: 'resultatsteam',
            params: { sport: league, team: `${team.replaceAll(' ', '-')}` },
          }"
          >{{ team }}</router-link
        ><span v-if="mode == 'edit'"
          ><i class="fa-solid fa-xmark" @click="deleteTeam(league, team)"></i
        ></span>
      </p>
    </div>
    <div v-if="mode == 'edit'">
      <select
        v-model="select"
        @change="addTeam(league, select)"
        class="block h-10 py-2 px-4 border border-gray-300 bg-white rounded-3xl shadow-sm text-sm my-6"
      >
        <option :value="league" disabled class="font-small">
          {{ league }}
        </option>
        <option
          v-for="teamNba in teams"
          :key="teamNba.id"
          :value="teamNba"
          class="font-small"
        >
          {{ teamNba }}
        </option>
      </select>
      <p class="text-primary font-bold" id="errEquipe"></p>
      <button
        @click="modifyAccount()"
        class="bg-tertiary rounded-3xl h-10 pt-1 pb-1 px-4 py-2 text-white justify-self-end"
      >
        Modifier
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});
export default {
  data() {
    return {
      mode: "",
    };
  },
  name: "AffichageEquipe",
  methods: {
    changeMode(league) {
      if (league == "close") {
        this.mode = "";
      } else {
        this.mode = "edit";
      }
    },

    addTeam(league, selectedTeam) {
      if (this.user[league].includes(selectedTeam)) {
        document.getElementById("errEquipe").innerHTML =
          "Vous collectionnez déjà cette équipe !";
      } else {
        document.getElementById("errEquipe").innerHTML = "";
        this.user[league].push(selectedTeam);
        this.select = league;
      }
    },

    deleteTeam(league, selectedTeam) {
      const pos = this.user[league].indexOf(selectedTeam);
      this.user[league].splice(pos, 1);
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
    teams: {},
    userTeam: {},
    league: String,
    select: String,
  },
};
</script>

<style></style>
