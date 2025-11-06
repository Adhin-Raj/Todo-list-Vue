import "/src/assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { Toast, ToastService } from "primevue";

const app = createApp(App);
app.use(PrimeVue);

app.component("Toast", Toast);
app.use(ToastService);
app.mount("#app");
