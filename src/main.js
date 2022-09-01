import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

import "./assets/main.css";
import "vue-select/dist/vue-select.css";

const app = createApp(App);

app.use(router).component("v-select", vSelect);

app.mount("#app");
