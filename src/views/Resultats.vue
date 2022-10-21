<template>
  <main>
    <Navigation></Navigation>
    <section class="header">
      <div class="header__text">
        <p>
          Trouvez d’autres collectionneurs et partagez ensemble votre passion
          pour le Hobby !
        </p>
      </div>
      <div class="header__form">
        <form action="" class="header__form--detail" @submit.prevent="onSubmit">
          <input
            type="text"
            placeholder="Joueur ou équipe collectionnée"
            class="header__form--input"
            v-model="search"
            @input="searchTeamInput(search)"
          />
          <div class="header__form--list" id="listeEquipes">
            <ul>
              <li
                v-for="resultat in resultatRecherche"
                :key="resultat.id"
                @click="searchPlayer(resultat)"
              >
                {{ resultat }}
              </li>
            </ul>
          </div>
          <!-- <button @click="searchPlayer()" class="header__form--button">
            CHERCHER
          </button> -->
        </form>
      </div>
    </section>
    <section class="title">
      <p>Resultats pour</p>
      <p>"{{ search }}"</p>
    </section>
    <section v-for="use in user" :key="use.id" class="resultats">
      <article class="resultats__detail">
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
    <section v-if="display == true || user == null" class="resultats">
      <article class="resultats__detail">
        <h3>Pas encore de collectionneurs !</h3>
        <p>
          Vous collectionnez ce joueur ?
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
import { debounce } from "lodash";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

const instanceSports = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/sports",
});
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Resultats",
  data: function () {
    return {
      user: [],
      search: this.$route.params.player.replaceAll("-", " "),
      users: {},
      display: false,
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
      resultatRecherche: "",
    };
  },
  computed: {},
  methods: {
    updateSearch(resultat) {
      this.search = resultat;
      document.getElementById("listeEquipes").style.display = "none";
    },

    searchTeamInput: debounce(function (search) {
      document.getElementById("listeEquipes").style.display = "block";
      const self = this;
      if (search.length > 2) {
        instanceSports
          .get(`/${search}`)
          .then((data) => {
            self.resultatRecherche = data.data;
          })
          .catch((error) => {
            error;
          });
      } else if (search.length < 2) {
        self.resultatRecherche = [];
      }
    }, 300),

    searchPlayer(resultat) {
      this.user = [];
      this.search = resultat;

      document.getElementById("listeEquipes").style.display = "none";

      for (const user of this.users) {
        if (user.joueur) {
          let res = user.joueur.findIndex((element) =>
            element.includes(this.search.substring(6))
          );
          if (res != -1) {
            this.user.push(user);
            this.display=false;
          }
        }
        if (
          user.NBA.includes(this.search.substring(6)) ||
          user.NHL.includes(this.search.substring(6)) ||
          user.NFL.includes(this.search.substring(6)) ||
          user.MLB.includes(this.search.substring(6)) ||
          user.SOCCER.includes(this.search.substring(6))
        ) {
          this.user.push(user);
        }
      }
      if (this.user.length == 0) {
        this.display = true;
      }
      this.$router.replace({
        params: {
          sport: `${this.search.substring(0, 3)}`,
          player: `${this.search.substring(6)}`,
        },
      });

      // e.preventDefault();
    },
  },
  beforeCreate() {
    document.title =
      "Cartissimo | Collectionneur de " +
      this.$route.params.sport.toUpperCase() +
      " | " +
      this.$route.params.player;

    instanceUser
      .get("/")
      .then((data) => {
        this.users = data.data.result;

        let sportQuery = this.$route.params.sport.toUpperCase();
        let playerQuery = this.$route.params.player.replaceAll("-", " ");

        if (sportQuery == "NBA") {
          for (const user of this.users) {
            let res = user.joueur.findIndex((element) =>
              element.includes(playerQuery)
            );
            if (res != -1) {
              console.log(user.joueur[res]);
              this.search = playerQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NFL") {
          for (const user of this.users) {
            let res = user.joueur.findIndex((element) =>
              element.includes(playerQuery)
            );
            if (res != -1) {
              console.log(user.joueur[res]);
              this.search = playerQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "NHL") {
          for (const user of this.users) {
            let res = user.joueur.findIndex((element) =>
              element.includes(playerQuery)
            );
            if (res != -1) {
              console.log(user.joueur[res]);
              this.search = playerQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "MLB") {
          for (const user of this.users) {
            let res = user.joueur.findIndex((element) =>
              element.includes(playerQuery)
            );
            if (res != -1) {
              console.log(user.joueur[res]);
              this.search = playerQuery;
              this.user.push(user);
            }
          }
          if (this.user.length == 0) {
            this.display = true;
          }
        } else if (sportQuery == "SOCCER") {
          for (const user of this.users) {
            let res = user.joueur.findIndex((element) =>
              element.includes(playerQuery)
            );
            if (res != -1) {
              console.log(user.joueur[res]);
              this.search = playerQuery;
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

  components: { Navigation },
};
</script>

<style>
.collection-detail {
  font-size: 13px;
}
</style>
