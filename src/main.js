import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

import "./assets/main.css";
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.css";

const app = createApp(App);

app.use(router).component("v-select", vSelect);

app.mount("#app");
