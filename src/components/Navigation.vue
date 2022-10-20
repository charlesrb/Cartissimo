<template>
  <nav class="menu">
    <div class="menu__top">
      <div class="menu__button">
        <!-- <router-link to="/subscribe"> -->
        <i @click="openClose()" class="fas fa-bars"></i>
        <!-- </router-link> -->
        <!-- <button @click="openClose()">Coucou</button> -->
      </div>
      <div class="menu__title">
        <router-link to="/">Cartissimo.fr</router-link>
      </div>
    </div>
    <div v-if="isLogged != '-1' && isLogged != null" class="menu__icon">
      <router-link to="/profile"><i class="fa-solid fa-user"></i></router-link>
    </div>
    <div v-if="isLogged == '-1' || isLogged == null" class="menu__icon">
      <router-link to="/inscription"
        ><i class="fa-solid fa-power-off"></i
      ></router-link>
    </div>
  </nav>
  <div v-if="isOpen" class="dropdownMenu">
    <!-- <div class="menuArrow">
      <router-link to="/subscribe">S'inscrire</router-link>
    </div> -->
    <div class="menuArrow">
      <router-link to="/inscription" v-if="isLogged == '-1' || isLogged == null"
        >S'inscrire / Se connecter</router-link
      >
      <span @click="logout()" v-if="isLogged != '-1' && isLogged != null">Se déconnecter</span>
    </div>
    <div class="menuArrow">
      <router-link to="/abonnement">S'abonner à la newsletter</router-link>
    </div>
    <div class="menuArrow" v-if="isLogged != '-1' && isLogged != null">Nous contacter</div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  data() {
    return {
      isOpen: false,
      isLogged: localStorage.getItem("userId"),
    };
  },
  methods: {
    openClose() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.clear();
      this.isLogged = "-1";
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
