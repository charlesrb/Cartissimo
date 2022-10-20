<template>
  <Navigation></Navigation>

  <section class="user">
    <div class="user__header">
      <span><i class="fas fa-circle-user"></i></span>
      <h1>{{ user.pseudo }}</h1>
    </div>
  </section>
  <section class="p-4">
    <h2 class="font-bold text-2xl text-start">Je suis...</h2>
    <div
      class="p-3 my-6 rounded-lg shadow-lg border border-tertiaryBis border-opacity-10 flex justify-between"
    >
      <div class="flex-1 pr-2">
        <p class="flex flex-col">
          <span class="font-bold">Email :</span>
          <span v-if="mode == '' || mode == 'a-propos'">{{ user.mail }}</span>
          <input
            type="text"
            class="border border-primary w-full mb-4 rounded-lg px-2"
            v-if="mode == 'social'"
            v-model="user.mail"
          />
        </p>
        <p class="flex flex-col">
          <span class="font-bold">Twitter :</span>
          <span v-if="mode == '' || mode == 'a-propos'">{{
            user.twitter
          }}</span>
          <input
            type="text"
            class="border border-primary w-full mb-4 rounded-lg px-2"
            v-if="mode == 'social'"
            v-model="user.twitter"
            pattern="[@].*"
          />
        </p>
        <p class="flex flex-col">
          <span class="font-bold">Instagram : </span>
          <span v-if="mode == '' || mode == 'a-propos'">{{
            user.instagram
          }}</span>
          <input
            type="text"
            class="border border-primary w-full mb-4 rounded-lg px-2"
            v-if="mode == 'social'"
            v-model="user.instagram"
            pattern="[@].*"
          />
        </p>
        <p id="err" class="text-primary my-2 text-sm"></p>
        <button
          v-if="mode == 'social'"
          @click="modifyAccount()"
          class="bg-tertiary rounded-lg pt-1 pb-1 px-2 py-2 text-white justify-self-end"
        >
          Modifier
        </button>
      </div>
      <div>
        <span v-if="mode == '' || mode == 'a-propos'"
          ><i class="fa fa-pen text-primary" @click="changeMode('social')"></i
        ></span>
        <span v-if="mode == 'social'"
          ><i class="fa fa-xmark text-primary" @click="changeMode('close')"></i
        ></span>
      </div>
    </div>
    <div
      class="my-6 p-3 rounded-lg shadow-lg border border-tertiaryBis border-opacity-10 flex flex-col"
    >
      <div class="flex justify-between">
        <h3 class="font-bold text-start mb-2">A propos de moi</h3>
        <div>
          <span v-if="mode == '' || mode == 'social'"
            ><i
              class="fa fa-pen text-primary"
              @click="changeMode('a-propos')"
            ></i
          ></span>
          <span v-if="mode == 'a-propos'"
            ><i
              class="fa fa-xmark text-primary"
              @click="changeMode('close')"
            ></i
          ></span>
        </div>
      </div>
      <p v-if="mode == '' || mode == 'social'">
        {{ user.message }}
      </p>
      <div class="flex w-full" v-if="mode == 'a-propos'">
        <textarea
          class="border border-tertiaryBis border-opacity-50 rounded-lg w-full outline-none p-2"
          rows="5"
          v-model="user.message"
        ></textarea>
      </div>
      <button
        v-if="mode == 'a-propos'"
        @click="modifyAccount()"
        class="bg-tertiary rounded-lg mt-2 pt-1 pb-1 px-2 py-2 w-1/3 text-white justify-self-end"
      >
        Modifier
      </button>
    </div>

    <h2 class="font-bold text-2xl text-start">Je collectionne...</h2>

    <AffichageEquipe
      :user="user"
      :userTeam="user.NBA"
      select="NBA"
      league="NBA"
      :teams="teamsNba"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.NFL"
      league="NFL"
      select="NFL"
      :teams="teamsNfl"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.NHL"
      league="NHL"
      select="NHL"
      :teams="teamsNhl"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.MLB"
      league="MLB"
      select="MLB"
      :teams="teamsMlb"
    ></AffichageEquipe>
    <AffichageEquipe
      :user="user"
      :userTeam="user.SOCCER"
      league="SOCCER"
      select="SOCCER"
      :teams="teamsSoccer"
    ></AffichageEquipe>

    <Joueurs :user="user"></Joueurs>
  </section>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";
import AffichageEquipe from "../components/AffichageEquipe.vue";
import Joueurs from "../components/Joueurs.vue";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "profile",
  components: { Navigation, AffichageEquipe, Joueurs },
  data() {
    return {
      user: {},
      teamsNba: [],
      teamsNfl: [],
      teamsNhl: [],
      teamsMlb: [],
      teamsSoccer: [],
      selectNba: "NBA",
      mode: "",
    };
  },
  methods: {
    addTeam(league, selectedTeam) {
      if (this.user[league].includes(selectedTeam)) {
        document.getElementById("errEquipe").innerHTML =
          "Vous collectionnez déjà cette équipe !";
      } else {
        document.getElementById("errEquipe").innerHTML = "";
        this.user[league].push(selectedTeam);
        this.selectNba = "NBA";
      }
    },

    deleteTeam(league, selectedTeam) {
      const pos = this.user[league].indexOf(selectedTeam);
      this.user[league].splice(pos, 1);
    },

    changeMode(league) {
      if (league == "close") {
        this.mode = "";
      } else if (league == "a-propos") {
        this.mode = "a-propos";
      } else if (league == "social") {
        this.mode = "social";
      } else {
        this.mode = "edit";
      }
    },

    modifyAccount() {
      const userId = localStorage.getItem("userId");
      const user = { ...this.user };
      document.getElementById("err").innerHTML = "";
      const regexSocial = /[@].*/;
      const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
      // Test des Regex
      if (
        !regexSocial.test(user.twitter) &&
        user.twitter != "non" &&
        user.twitter != ""
      ) {
        document.getElementById("err").innerHTML =
          "Votre profil Twitter doit commencer par @";
        return;
      }
      if (
        !regexSocial.test(user.instagram) &&
        user.instagram != "non" &&
        user.instagram != ""
      ) {
        document.getElementById("err").innerHTML =
          "Votre profil Instagram doit commencer par @";
        return;
      }
      if (!regexEmail.test(user.mail)) {
        document.getElementById("err").innerHTML =
          "Votre adresse email doit être de la forme exemple@mail.com";
        return;
      }
      instanceUser
        .put(`/${userId}`, user)
        .then(() => (this.mode = ""))
        .catch((error) => error);
    },
  },

  beforeCreate() {
    const userId = localStorage.getItem("userId");
    instanceUser
      .get(`/${userId}`)
      .then((data) => (this.user = data.data.result))
      .catch((error) => {
        error;
      });

    instanceSports
      .get("/")
      .then((data) => {
        let teams = data.data.result;
        for (const team of teams) {
          if (team.name == "NBA") {
            this.teamsNba = team.teams;
          } else if (team.name == "NFL") {
            this.teamsNfl = team.teams;
          } else if (team.name == "NHL") {
            this.teamsNhl = team.teams;
          } else if (team.name == "MLB") {
            this.teamsMlb = team.teams;
          } else if (team.name == "SOCCER") {
            this.teamsSoccer = team.teams;
          }
        }
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style scoped>
a {
  color: white !important;
}

input:invalid {
  border: red solid 3px;
}
</style>
