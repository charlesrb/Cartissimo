<template>
  <div class="fullpage">
    <main>
      <Navigation></Navigation>
      <iframe
        class="mj-w-res-iframe"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://app.mailjet.com/widget/iframe/1GLU/Oou"
        width="100%"
        height="100%"
      ></iframe>
    </main>
    <footer class="footer">
      <img src="../assets/img/logo-cartissimo-gris-sans-texte.png" alt="" />
    </footer>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Abonnement",
  components: { Navigation },
};
</script>

<style scoped>
.fullpage {
  height: 100vh;
}
main {
  height: 600px;
  background-color: #f1f1f1;
}
iframe {
  padding-top: 50px;
}
</style>
