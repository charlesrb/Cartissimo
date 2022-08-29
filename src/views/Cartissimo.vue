<template>
  <main>
    <nav class="menu">
      <div class="menu__button"><i class="fas fa-bars"></i></div>
      <div class="menu__title">Cartissimo.fr</div>
    </nav>
    <section class="header">
      <div class="header__text">
        <p>
          Trouvez d’autres collectionneurs et partagez ensemble votre passion
          pour le Hobby !
        </p>
      </div>
      <div class="header__form">
        <form action="./resultat.html" class="header__form--detail">
          <input
            type="text"
            placeholder="Joueur ou équipe collectionnée"
            class="header__form--input"
          />
          <button type="submit" class="header__form--button">CHERCHER</button>
        </form>
      </div>
    </section>
    <section class="collection">
      <h2 class="collection__title">Collectionneurs par équipe</h2>
      <form action="" class="collection__form">
        <select name="" id="" class="collection__form--select">
          <option value="NBA">NBA</option>
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
    <section class="video">
      <div class="video__title">
        <p>Découvrez nos vidéos sur YouTube</p>
      </div>
      <div class="video__img">
        <img src="../assets/img/thumbnails.png" alt="" />
        <legend>Conception de carte jersey | Épisode 011</legend>
      </div>
    </section>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </main>
</template>

<script>
export default {
  name: "Cartissimo",
  data: function () {
    return {
      keys: {},
      users: {},
    };
  },

  beforeCreate() {
    fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz/keys")
      .then((res) => res.json())
      .then((data) => {
        this.keys = data;
      })
      .catch((err) => console.log(err.message));

    fetch("https://sheetdb.io/api/v1/j8ef9j4vw6ecz")
      .then((res) => res.json())
      .then((data) => {
        this.users = data;
        console.log(Object.values(data[1][2]));
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
</style>


