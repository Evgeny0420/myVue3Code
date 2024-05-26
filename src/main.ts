import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import Modals from "./plugins/modals";

createApp(App)
  .use(router)
  .use(Modals)
  .mount("#app");
