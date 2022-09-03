import { createRouter, createWebHistory } from "vue-router";
import Cartissimo from "../views/Cartissimo.vue";
import Resultats from "../views/Resultats.vue";
import Utilisateur from "../views/Utilisateur.vue";
import ResultatsTeam from "../views/ResultatsTeam.vue";
import Subscribe from "../views/Subscribe.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cartissimo",
      component: Cartissimo,
    },
    {
      path: "/resultats",
      name: "resultats",
      component: Resultats,
    },
    {
      path: "/utilisateur",
      name: "utilisateur",
      component: Utilisateur,
    },
    {
      path: "/resultatsteam/:sport/:team",
      name: "resultatsteam",
      component: ResultatsTeam,
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: Subscribe,
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
