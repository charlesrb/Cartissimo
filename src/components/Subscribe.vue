<template>
  <section class="form">
    <div>
      <p>Référencez-vous !</p>
    </div>
    <div>
      <form action="" @submit.prevent="onSubmit">
        <div v-for="(value, key, index) in teamsNba" :key="index">
          <input type="checkbox" :id="key" v-model="equipe[key]" />
          <label :for="key">{{ value.full_name }}</label>
        </div>
        <p>
          Collectionnez-vous un ou des joueurs en particulier ? (Indiquez le
          Prénom et le Nom, et séparez les joueurs par une virgule : Michael
          Jordan, Scottie Pippen)
        </p>
        <input type="text" v-model="joueur" />

        <p>Avez-vous une collection plus spécifique de joueurs ou équipe ?</p>
        <input type="text" />
        <p>En quelle année avez-vous acheté vos premières cartes NBA ?</p>

        <input type="number" min="1950" max="2099" step="1" value="2016" />
        <p>
          Depuis quand êtes vous actif sur votre collection actuelle ? (si vous
          avez collectionné en 1995, puis arrêté, puis repris en 2020...
          indiquez 2020 !)
        </p>

        <input type="number" min="1950" max="2099" step="1" value="2016" />
        <p>
          Quel est le code postal de la ville dans laquelle vous habitez ? (Si
          vous n'habitez pas en France, préciser votre pays de résidence)
        </p>
        <input type="text" />
        <p>
          Sous quel Nom ou Pseudonyme souhaitez-vous apparaître dans l'annuaire
          ?
        </p>
        <input type="text" />
        <p>
          Laissez un message court décrivant votre passion pour les cartes, vos
          recherches, etc...
        </p>
        <input type="textarea" />
        <p>
          Peut-on vous contacter via Twitter ? Si oui, précisez votre alias !
          (exemple : @panini)
        </p>
        <input type="text" />
        <p>
          Peut-on vous contacter via Instagram ? Si oui, précisez votre alias !
          (exemple : @panini)
        </p>
        <input type="text" />
        <p>
          Souhaitez-vous indiquer une autre façon de vous contacter ? (Ne
          laissez ni email, ni numéro de téléphone)
        </p>
        <input type="text" />
        <p>
          Quel est votre email ? (Il ne sera pas diffusé : il ne servira que
          pour vous envoyer le lien d'accès à l'annuaire)
        </p>
        <input type="email" />
        <button>CHERCHER</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Subscribe",
  data: function () {
    return {
      teamsNba: {},
      equipe: {},
      joueur: {},
    };
  },
  beforeCreate() {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((res) => res.json())
      .then((data) => {
        this.teamsNba = data.data;
      });
  },
};
</script>

<style>
</style>