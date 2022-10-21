import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store";
import vSelect from "vue-select";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.component("v-select", vSelect);

app
  .use(SetupCalendar, {})
  .component("Calendar", Calendar)
  .component("DatePicker", DatePicker)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount("#app");
