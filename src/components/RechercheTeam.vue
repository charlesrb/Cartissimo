<template>
  <section class="collection">
    <h2 class="collection__title">Collectionneurs par équipe</h2>

    <form action="" class="collection__form">
      <select
        name="NBA"
        id="NBA"
        class="collection__form--select"
        v-model="selectNba"
        @change="selectTeamByLeague('NBA', selectNba)"
      >
        <option value="NBA" disabled>NBA</option>

        <option v-for="teamNba in teamsNba" :key="teamNba.id" :value="teamNba">
          {{ teamNba }}
        </option>
      </select>
      <select
        name=""
        id=""
        class="collection__form--select"
        v-model="selectNfl"
        @change="selectTeamByLeague('NFL', selectNfl)"
      >
        <option value="NFL" disabled>NFL</option>
        <option v-for="teamNfl in teamsNfl" :key="teamNfl.id" :value="teamNfl">
          {{ teamNfl }}
        </option>
      </select>
      <select
        name=""
        id=""
        class="collection__form--select"
        v-model="selectNhl"
        @change="selectTeamByLeague('NHL', selectNhl)"
      >
        <option value="NHL" disabled>NHL</option>
        <option v-for="teamNhl in teamsNhl" :key="teamNhl.id" :value="teamNhl">
          {{ teamNhl }}
        </option>
      </select>

      <select
        name=""
        id=""
        class="collection__form--select"
        v-model="selectMlb"
        @change="selectTeamByLeague('MLB', selectMlb)"
      >
        <option value="MLB" disabled>MLB</option>
        <option v-for="teamMlb in teamsMlb" :key="teamMlb.id" :value="teamMlb">
          {{ teamMlb }}
        </option>
      </select>

      <select
        name=""
        id=""
        class="collection__form--select"
        v-model="selectSoccer"
        @change="selectTeamByLeague('SOCCER', selectSoccer)"
      >
        <option value="SOCCER" disabled>SOCCER</option>
        <option
          v-for="teamSoccer in teamsSoccer"
          :key="teamSoccer.id"
          :value="teamSoccer"
        >
          {{ teamSoccer }}
        </option>
      </select>
    </form>
  </section>
</template>

<script>
export default {
  name: "RechercheTeam",
  data: function () {
    return {
      keys: {},
      search: "",
      selectNba: "NBA",
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "SOCCER",
      resultatRecherche: "",
      resultatRechercheSport: "",
    };
  },
  props: [
    "teamsNba",
    "teamsNfl",
    "teamsNhl",
    "teamsMlb",
    "teamsSoccer",
    "users",
  ],
  methods: {
    selectTeamByLeague(league, selectedTeam) {
      let testUser = [];

      localStorage.setItem("select", selectedTeam);
      this.users
        .filter((user) => user[league].includes(selectedTeam))
        .forEach((user) => testUser.push(user));

      localStorage.setItem("users", JSON.stringify(testUser));
      this.$router.push({
        name: "resultatsteam",
        path: "/:sport/:team",
        params: { sport: league, team: `${selectedTeam}` },
      });
    },
  },
};
</script>

<style>
</style>