<template>
  <Navigation></Navigation>
  <div class="p-4">
    <h2 class="font-bold text-2xl text-start">
      Une remarque ? <br />Contactez-nous !
    </h2>
    <form action="" class="flex flex-col mt-10">
        <label class="mt-4 mb-2" for="mail">Votre email</label>

      <input
        class="border border-tertiaryBis text-black h-10 rounded-3xl px-4"
        type="email"
        v-model="user.mail"
        name="mail"
        id=""
      />
      <label class="mt-4 mb-2" for="message">Votre message</label>

      <textarea
        class="border border-tertiaryBis text-black h-60 rounded-3xl p-4"
        type="text"
        name=""
        placeholder="Votre message..."
        id=""
      ></textarea>
      <button
        class="bg-secondary rounded-3xl h-10 pt-1 pb-1 px-4 py-2 text-white justify-self-end mt-4"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import axios from "axios";

const instanceUser = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/api/user",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contact",
  data() {
    return {
      user: {},
    };
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

  }
};
</script>

<style></style>
