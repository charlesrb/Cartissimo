<template>
  <main>
    <Navigation></Navigation>
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>

      <div class="collection__form">
        <select
          name="NBA"
          id="NBA"
          class="collection__form--select"
          @change="selectTeamByLeague('NBA', selectNba)"
          v-model="selectNba"
        >
          <option :value="this.selectNba" disabled>NBA</option>

          <option
            v-for="teamNba in teamsNba"
            :key="teamNba.id"
            :value="teamNba"
          >
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
          <option :value="this.selectNfl" disabled>NFL</option>
          <option
            v-for="teamNfl in teamsNfl"
            :key="teamNfl.id"
            :value="teamNfl"
          >
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
          <option :value="this.selectNhl" disabled>NHL</option>
          <option
            v-for="teamNhl in teamsNhl"
            :key="teamNhl.id"
            :value="teamNhl"
          >
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
          <option :value="this.selectMlb" disabled>MLB</option>
          <option
            v-for="teamMlb in teamsMlb"
            :key="teamMlb.id"
            :value="teamMlb"
          >
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
          <option :value="this.selectSoccer" disabled>Soccer</option>
          <option
            v-for="teamSoccer in teamsSoccer"
            :key="teamSoccer.id"
            :value="teamSoccer"
          >
            {{ teamSoccer }}
          </option>
        </select>
      </div>
    </section>
    <section class="title-2">
      <p>Resultats pour</p>
      <p>"{{ select }}"</p>
    </section>
    <section v-if="user != null && user.length >= 1" class="resultats">
      <article v-for="use in user" :key="use.id" class="resultats__detail">
        <div class="resultats__detail--user">
          <span><i class="fas fa-circle-user"></i></span>
          <h3>
            <router-link
              :to="{ path: '/utilisateur', query: { user: use.pseudo } }"
              >{{ use.pseudo }}</router-link
            >
          </h3>
        </div>
        <div v-if="use.contact">
          <p class="collection-detail">Contact :</p>
          <p class="collection-detail">{{ use.contact }}</p>
        </div>
        <div
          class="resultats__detail--socialmedia"
          v-if="
            use.twitter.toLowerCase() != 'non' ||
            use.instagram.toLowerCase() != 'non'
          "
        >
          <div v-if="use.twitter.toLowerCase() != 'non'">
            <img src="../assets/img/twitter_logo.png" alt="" />
            <a :href="'https://twitter.com/' + use.twitter" target="_blank">
              <p>{{ use.twitter }}</p>
            </a>
          </div>
          <div v-if="use.instagram.toLowerCase() != 'non'">
            <img src="../assets/img/instagram_logo.png" alt="" />
            <a
              :href="'https://instagram.com/' + use.instagram.substr(1)"
              target="_blank"
            >
              <p>{{ use.instagram }}</p>
            </a>
          </div>
        </div>
      </article>
    </section>

    <section v-if="display == true" class="resultats">
      <article class="resultats__detail">
        <h3>Pas encore de collectionneurs !</h3>
        <p>
          Vous collectionnez cette équipe ?
          <router-link class="link__subscribe" :to="{ path: '/subscribe' }"
            >Inscrivez-vous</router-link
          >
          !
        </p>
      </article>
    </section>
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
  name: "ResultatsTeam",
  data: function () {
    return {
      user: [],
      select: this.$route.params.team.replaceAll("-", " "),
      users: {},
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
      selectNfl: "NFL",
      selectNhl: "NHL",
      selectMlb: "MLB",
      selectSoccer: "SOCCER",
      display: false,
    };
  },
  computed: {},
  methods: {
    selectTeamByLeague(league, selectedTeam) {
      this.user = [];
      this.select = selectedTeam;

      this.users
        .filter((user) => user[league].includes(selectedTeam))
        .forEach((user) => this.user.push(user));
      if (this.user.length != 0) {
        this.display = false;
      } else if (this.user.length === 0) {
        this.display = true;
      }
      this.$router.replace({
        params: {
          sport: league.toLowerCase(),
          team: `${selectedTeam.toLowerCase().replaceAll(" ", "-")}`,
        },
      });
    },
  },
  beforeCreate() {
    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;

        let sportQuery = this.$route.params.sport.toUpperCase();
        let teamQuery = this.$route.params.team.replaceAll("-", " ");

        if (sportQuery == "NBA") {
          for (const user of this.users) {
            if (user.NBA.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NFL") {
          for (const user of this.users) {
            if (user.NFL.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NHL") {
          for (const user of this.users) {
            if (user.NHL.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "MLB") {
          for (const user of this.users) {
            if (user.MLB.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "SOCCER") {
          for (const user of this.users) {
            if (user.SOCCER.includes(teamQuery)) {
              this.select = teamQuery;
              this.user.push(user);
            }
          }
        }
        if (this.user.length == 0) {
          this.display = true;
        }
      })
      .catch((error) => {
        error;
      });
  },
  mounted() {
    document.title =
      "Cartissimo | Collectionneur de " +
      this.$route.params.sport.toUpperCase() +
      " | " +
      this.$route.params.team;
  },
  components: { Navigation },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}

.title-2 {
  background-color: #c22c25;
  color: white;
  height: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
}

.link__subscribe {
  color: #c22c25;
  font-weight: 700;
}
</style>
