import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueMultiselect from "vue-multiselect";

import "./assets/main.css";
import "vue-multiselect/dist/vue-multiselect.css";

const app = createApp(App);

app.use(router).component("vuemultiselect", VueMultiselect);

app.mount("#app");
