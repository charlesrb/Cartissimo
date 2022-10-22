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
            class="border border-tertiaryBis h-10 outline-none w-full mb-4 rounded-3xl px-4 mt-4"
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
            class="border border-tertiaryBis h-10 outline-none w-full mb-4 rounded-3xl px-4 mt-4"
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
            class="border border-tertiaryBis h-10 outline-none w-full mb-4 rounded-3xl px-4 mt-4"
            v-if="mode == 'social'"
            v-model="user.instagram"
            pattern="[@].*"
          />
        </p>
        <p id="err" class="text-primary my-2 text-sm"></p>
        <button
          v-if="mode == 'social'"
          @click="modifyAccount()"
          class="bg-tertiary rounded-3xl h-10 pt-1 pb-1 px-4 py-2 text-white justify-self-end"
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
        class="bg-tertiary rounded-3xl h-10 pt-1 pb-1 px-4 py-2 w-1/3 mt-4 text-white justify-self-end"
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
      teamsNba: [
        "Atlanta Hawks",
        "Boston Celtics",
        "Brooklyn Nets",
        "Charlotte Hornets",
        "Chicago Bulls",
        "Cleveland Cavaliers",
        "Dallas Mavericks",
        "Denver Nuggets",
        "Detroit Pistons",
        "Golden State Warriors",
        "Houston Rockets",
        "Indiana Pacers",
        "Los Angeles Clippers",
        "Los Angeles Lakers",
        "Memphis Grizzlies",
        "Miami Heat",
        "Milwaukee Bucks",
        "Minnesota Timberwolves",
        "New Orleans Pelicans",
        "New York Knicks",
        "Oklahoma City Thunder",
        "Orlando Magic",
        "Philadelphia 76ers",
        "Phoenix Suns",
        "Portland Trail Blazers",
        "Sacramento Kings",
        "San Antonio Spurs",
        "Seattle Supersonics",
        "Toronto Raptors",
        "Utah Jazz",
        "Washington Wizards",
      ],
      teamsNfl: [
        "Arizona Cardinals",
        "Atlanta Falcons",
        "Baltimore Ravens",
        "Buffalo Bills",
        "Carolina Panthers",
        "Chicago Bears",
        "Cincinnati Bengals",
        "Cleveland Browns",
        "Dallas Cowboys",
        "Denver Broncos",
        "Detroit Lions",
        "Green Bay Packers",
        "Houston Texans",
        "Indianapolis Colts",
        "Jacksonville Jaguars",
        "Kansas City Chiefs",
        "Las Vegas Raiders",
        "Los Angeles Chargers",
        "Los Angeles Rams",
        "Miami Dolphins",
        "Minnesota Vikings",
        "New England Patriots",
        "New Orleans Saints",
        "New York Giants",
        "New York Jets",
        "Philadelphia Eagles",
        "Pittsburgh Steelers",
        "San Francisco 49ers",
        "Seattle Seahawks",
        "Tampa Bay Buccaneers",
        "Tennessee Titans",
        "Washington Commanders",
      ],
      teamsNhl: [
        "Anaheim Ducks",
        "Arizona Coyotes",
        "Boston Bruins",
        "Buffalo Sabres",
        "Calgary Flames",
        "Carolina Hurricanes",
        "Chicago Blackhawks",
        "Colorado Avalanche",
        "Columbus Blue Jackets",
        "Dallas Stars",
        "Detroit Red Wings",
        "Edmonton Oilers",
        "Florida Panthers",
        "Los Angeles Kings",
        "Minnesota Wild",
        "Montreal Canadiens",
        "Nashville Predators",
        "New Jersey Devils",
        "New York Islanders",
        "New York Rangers",
        "Ottawa Senators",
        "Philadelphia Flyers",
        "Pittsburgh Penguins",
        "San Jose Sharks",
        "Seattle Kraken",
        "St. Louis Blues",
        "Tampa Bay Lightning",
        "Toronto Maple Leafs",
        "Vancouver Canucks",
        "Vegas Golden Knights",
        "Washington Capitals",
        "Winnipeg Jets",
      ],
      teamsMlb: [
        "Arizona Diamondbacks",
        "Atlanta Braves",
        "Baltimore Orioles",
        "Boston Red Sox",
        "Chicago Cubs",
        "Chicago White Sox",
        "Cincinnati Reds",
        "Cleveland Guardians",
        "Colorado Rockies",
        "Detroit Tigers",
        "Houston Astros",
        "Kansas City Royals",
        "Los Angeles Angels",
        "Los Angeles Dodgers",
        "Miami Marlins",
        "Milwaukee Brewers",
        "Minnesota Twins",
        "New York Mets",
        "New York Yankees",
        "Oakland Athletics",
        "Philadelphia Phillies",
        "Pittsburgh Pirates",
        "San Diego Padres",
        "San Francisco Giants",
        "Seattle Mariners",
        "St. Louis Cardinals",
        "Tampa Bay Rays",
        "Texas Rangers",
        "Toronto Blue Jays",
        "Washington Nationals",
      ],
      teamsSoccer: [
        "ACF Fiorentina",
        "AFC Ajax",
        "AFC Bournemouth",
        "Argentina",
        "Arsenal",
        "AS Roma",
        "Aston Villa",
        "Atalanta BC",
        "Athletic Club",
        "Atlético de Madrid",
        "Australia",
        "Austria",
        "Belgium",
        "Bologna FC",
        "Borussia Dortmund",
        "Bosnia-Herzegovina",
        "Brazil",
        "Brentford",
        "Brescia Calcio",
        "Brighton & Hove Albion",
        "Burnley",
        "CA Osasuna",
        "Cagliari Calcio",
        "CD Leganes",
        "Chelsea FC",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Croatia",
        "Crystal Palace",
        "Czech Republic",
        "Denmark",
        "Deportivo Alaves",
        "Egypt",
        "Empoli FC",
        "England",
        "Everton",
        "FC Barcelona",
        "FC Bayern München",
        "FC Internazionale Milano",
        "France",
        "Genoa CFC",
        "Germany",
        "Getafe CF",
        "Granada CF",
        "Hellas Verona FC",
        "Hungary",
        "Iceland",
        "Ireland",
        "Islamic Republic of Iran",
        "Italy",
        "Ivory Coast",
        "Japan",
        "Juventus",
        "Korea Republic",
        "Leeds United",
        "Leicester City",
        "Levante UD",
        "Liverpool FC",
        "Manchester City",
        "Manchester United",
        "Mexico",
        "Morocco",
        "Netherlands",
        "New Zealand",
        "Newcastle United",
        "Nigeria",
        "Northern Ireland",
        "Norway",
        "Norwich City",
        "Panama",
        "Paraguay",
        "Paris Saint-Germain",
        "Parma Calcio 1913",
        "Peru",
        "Poland",
        "Portugal",
        "PSV Eindhoven",
        "RC Celta de Vigo",
        "RCD Espanyol",
        "RCD Mallorca",
        "Real Betis Balompie",
        "Real Madrid CF",
        "Real Sociedad de Futbol",
        "Real Valladolid CF",
        "Russia",
        "Saudi Arabia",
        "SD Eibar",
        "Senegal",
        "Serbia",
        "Sevilla FC",
        "Sheffield United",
        "Southampton",
        "Spain",
        "SPAL",
        "Spezia Calcio",
        "SS Lazio",
        "SSC Napoli",
        "Sweden",
        "Switzerland",
        "Torino FC",
        "Tottenham Hotspur",
        "Tunisia",
        "Turkey",
        "UC Sampdoria",
        "Udinese Calcio",
        "United States",
        "Uruguay",
        "US Lecce",
        "US Salernitana",
        "US Sassuolo Calcio",
        "Valencia CF",
        "Venezia FC",
        "Villarreal CF",
        "Wales",
        "Watford",
        "West Ham United",
        "Wolverhampton Wanderers",
      ],
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
