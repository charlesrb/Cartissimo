<template>
  <main>
    <nav class="menu">
      <div class="menu__button"><i class="fas fa-bars"></i></div>
      <div class="menu__title">Cartissimo.fr</div>
    </nav>
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>
      <form action="" class="collection__form">
        <select
          name=""
          id=""
          class="collection__form--select"
          v-model="select"
          @change="selectTeam()"
        >
          <option value="NBA" disabled>NBA</option>

          <option
            v-for="teamNba in teamsNba"
            :key="teamNba.id"
            :value="teamNba.full_name"
          >
            {{ teamNba.full_name }}
          </option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="NFL">NFL</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="MLB">MLB</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="NHL">NHL</option>
        </select>
        <select name="" id="" class="collection__form--select">
          <option value="Soccer">Soccer</option>
        </select>
      </form>
    </section>
    <section class="title-2">
      <p>Resultats pour</p>
      <p>"{{ select }}"</p>
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
        <div>
          <p class="collection-detail">Collection : {{ use.collection }}</p>
        </div>
        <div
          class="resultats__detail--socialmedia"
          v-if="(use.twitter && use.instagram) || use.twitter || use.instagram"
        >
          <div v-if="use.twitter && use.twitter != 'Non'">
            <img src="../assets/img/twitter_logo.png" alt="" />
            <p>{{ use.twitter }}</p>
          </div>
          <div v-if="use.instagram && use.instagram != 'Non'">
            <img src="../assets/img/instagram_logo.png" alt="" />
            <p>{{ use.instagram }}</p>
          </div>
        </div>
      </article>
    </section>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
export default {
  name: "ResultatsTeam",
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("users")),
      select: localStorage.getItem("select"),
      users: {},
      testUser: [],
      teamsNba: {},
    };
  },
  computed: {
    selectTeam() {
      let testUser = [];
      for (const user of this.users) {
        if (user.equipe.toLowerCase().includes(this.select.toLowerCase())) {
          testUser.push(user);
          localStorage.setItem("users", JSON.stringify(testUser));
        }
      }
      e.preventDefault();
    },
  },
  methods: {},
  beforeCreate() {
    // fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;

    //     // for (const user of this.users) {
    //     //   if (user.equipe.toLowerCase().includes(this.select.toLowerCase())) {
    //     //     testUser.push(user);
    //     //   }
    //     // }
    //   })
    //   .catch((err) => console.log(err.message));

    fetch("https://api.steinhq.com/v1/storages/630f2aebbc148508ba8ab7e3/sheet")
      .then((res) => res.json())
      .then((data) => {
        this.users = data;
        console.log(this.users);
      })
      .catch((err) => console.log(err.message));

    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((res) => res.json())
      .then((data) => {
        this.teamsNba = data.data;
      })
      .catch((err) => console.log(err.message));

    // fetch("https://api.steinhq.com/v1/storages/630f2aebbc148508ba8ab7e3/sheet")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.users = data;
    //   })
    //   .catch((err) => console.log(err.message));
  },
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
</style>