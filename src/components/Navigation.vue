<template>
  <nav class="menu">
    <div class="menu__button">
      <!-- <router-link to="/subscribe"> -->
      <i @click="openClose()" class="fas fa-bars"></i>
      <!-- </router-link> -->
      <!-- <button @click="openClose()">Coucou</button> -->
    </div>
    <div class="menu__title">
      <router-link to="/">Cartissimo.fr</router-link>
    </div>
  </nav>
  <div v-if="isOpen" class="dropdownMenu">
    <!-- <div class="menuArrow">
      <router-link to="/subscribe">S'inscrire</router-link>
    </div> -->
    <div class="menuArrow">
      <router-link to="/inscription">S'inscrire</router-link>
    </div>
    <div class="menuArrow">Comment envoyer mes cartes ?</div>
    <div class="menuArrow">Les cartes Cartissimo</div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openClose() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
</style>