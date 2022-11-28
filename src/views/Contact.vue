<template>
  <Navigation></Navigation>
  <div v-if="mode == 'formulaire'" class="p-4 flex justify-center flex-col max-w-sm align-middle m-auto">
    <h2 class="font-bold text-2xl text-start">
      Une remarque ? <br />Contactez-nous !
    </h2>
    <form ref="form" @submit.prevent="sendEmail" class="flex flex-col mt-10">
      <label class="mt-4 mb-2" for="mail">Votre email</label>

      <input
        class="border border-tertiaryBis text-black h-10 rounded-3xl px-4"
        type="email"
        v-model="user.mail"
        name="email"
        id=""
      />
      <input
        type="hidden"
        v-model="user.pseudo"
        name="name"
        id=""
      />
      <label class="mt-4 mb-2" for="message">Votre message</label>

      <textarea
        class="border border-tertiaryBis text-black h-60 rounded-3xl p-4"
        type="text"
        
        placeholder="Votre message..."
        v-model="message"
        name="message"
        id=""
      ></textarea>
      <button
        class="bg-secondary rounded-3xl h-10 pt-1 pb-1 px-4 py-2 text-white justify-self-end mt-4" type="submit" value="Send"
      >
        Envoyer
      </button>
    </form>
  </div>
  <div v-if="mode == 'envoye'" class="p-4 flex justify-center flex-col max-w-sm align-middle m-auto">
    <h2 class="font-bold text-2xl text-start">Message envoyé</h2>
    <p class="text-primary font-bold"><router-link to="/">Retour à l'accueil</router-link></p>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";
import emailjs from "@emailjs/browser";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contact",
  data() {
    return {
      user: {},
      message: "",
      mode:"formulaire",
    };
  },
  methods: {
    sendEmail() {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          this.$refs.form,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          () => {
            this.mode = "envoye"
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    },
  },
  components: { Navigation },
  mounted() {
    const userId = localStorage.getItem("userId");
    instanceUser
      .get(`/${userId}`)
      .then((data) => (this.user = data.data.result))
      .catch((error) => {
        error;
      });
  },
  beforeCreate() {
    document.title = "Cartissimo - Collectionneurs de cartes";
  },
};
</script>

<style></style>
