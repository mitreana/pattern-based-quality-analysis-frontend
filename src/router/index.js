import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateNewPattern from "../views/CreateNewPattern.vue";
import ConcretePatterns from "../views/ConcretePatterns.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createNewPattern",
    name: "CreateNewPattern",
    component: CreateNewPattern,
  },
  {
    path: "/concretePatterns",
    name: "ConcretePatterns",
    component: ConcretePatterns,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
