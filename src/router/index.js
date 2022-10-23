import { createRouter, createWebHistory } from "vue-router";
import Cartissimo from "../views/Cartissimo.vue";
import Resultats from "../views/Resultats.vue";
import Utilisateur from "../views/Utilisateur.vue";
import ResultatsTeam from "../views/ResultatsTeam.vue";
import Inscription from "../views/Inscription.vue";
import Profile from "../views/Profile.vue";
import Abonnement from "../views/Abonnement.vue";
import Contact from "../views/Contact.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cartissimo",
      component: Cartissimo,
    },
    {
      path: "/:sport/joueur/:player",
      name: "resultats",
      component: Resultats,
    },
    {
      path: "/utilisateur",
      name: "utilisateur",
      component: Utilisateur,
    },
    {
      path: "/abonnement",
      name: "abonnement",
      component: Abonnement,
    },
    {
      path: "/:sport/equipe/:team",
      name: "resultatsteam",
      component: ResultatsTeam,
    },
    {
      path: "/inscription",
      name: "inscription",
      component: Inscription,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
  navigationFallback: {
    rewrite: "/index.html",
    exclude: ["/images/*.{png,jpg,gif}", "/css/*"],
  },
});

export default router;
