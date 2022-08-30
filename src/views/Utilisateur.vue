<template>
  <main>
    <nav class="menu">
      <div class="menu__button"><i class="fas fa-bars"></i></div>
      <div class="menu__title">Cartissimo.fr</div>
    </nav>
    <section class="header">
      <div class="header__text">
        <span><i class="fas fa-circle-user"></i></span>
        <h1>{{ this.$route.query.user }}</h1>
      </div>
    </section>
    <section class="test" v-for="use in user" :key="use.id">
      {{ use.message }}
    </section>
    <div class="test2">
      <section v-for="use in user" :key="use.id">
        <p>Equipe : {{ use.equipe }}</p>
      </section>
      <section v-for="use in user" :key="use.id">
        <p>Joueurs : {{ use.joueur }}</p>
      </section>
      <section v-for="use in user" :key="use.id">
        <p>Collection : {{ use.collection }}</p>
      </section>
    </div>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
export default {
  name: "Utilisateur",
  data: function () {
    return {
      user: {},
    };
  },
  beforeCreate() {
    fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.user = data.filter(
          (user) => user.pseudo == this.$route.query.user
        );
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
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