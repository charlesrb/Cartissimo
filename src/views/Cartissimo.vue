<template>
  <main>
    <Navigation></Navigation>
    <RecherchePlayer
      :teamsNba="teamsNba"
      :teamsNfl="teamsNfl"
      :teamsNhl="teamsNhl"
      :teamsMlb="teamsMlb"
      :teamsSoccer="teamsSoccer"
      :users="users"
    ></RecherchePlayer>

    <RechercheTeam
      :teamsNba="teamsNba"
      :teamsNfl="teamsNfl"
      :teamsNhl="teamsNhl"
      :teamsMlb="teamsMlb"
      :teamsSoccer="teamsSoccer"
      :users="users"
    ></RechercheTeam>
    <!-- <p v-for="player in teamsNba.players" :key="player.id">
      {{ player.surname }} {{ player.name }}
    </p> -->
    <Videos></Videos>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import RecherchePlayer from "../components/RecherchePlayer.vue";
import RechercheTeam from "../components/RechercheTeam.vue";
import Videos from "../components/Videos.vue";
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cartissimo",
  data: function () {
    return {
      keys: {},
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
  components: {
    Navigation,
    RecherchePlayer,
    RechercheTeam,
    Videos,
  },
 
  beforeCreate() {
    document.title = "Cartissimo - Collectionneurs de cartes";

    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;
        console.log(data.data.result);
      })
      .catch((error) => {
        error;
      });

    // instanceSports
    //   .get("/")
    //   .then((data) => {
    //     let teams = data.data.result;
    //     for (const team of teams) {
    //       if (team.name == "NBA") {
    //         this.teamsNba = team.teams;
    //       } else if (team.name == "NFL") {
    //         this.teamsNfl = team.teams;
    //       } else if (team.name == "NHL") {
    //         this.teamsNhl = team.teams;
    //       } else if (team.name == "MLB") {
    //         this.teamsMlb = team.teams;
    //       } else if (team.name == "SOCCER") {
    //         this.teamsSoccer = team.teams;
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     error;
    //   });
  },
};
</script>

<style>
.pseudo {
  font-weight: 700;
}

.collection__form select {
  height: 36px;
  width: 300px;
  text-decoration: none;
  border-radius: 20px;
  border: 1px solid #707070;
  padding-left: 15px;
  padding-right: 15px;
}

.video__title--detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

legend {
  margin-top: 10px;
  text-align: center;
}

h2 {
  text-align: center;
}
</style>
