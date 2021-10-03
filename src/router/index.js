import { createRouter, createWebHistory } from "vue-router";
import CreateNewPattern from "../views/CreateNewPattern.vue";
import ConcretePatterns from "../views/ConcretePatterns.vue";
import EditConcretePatternText from "../views/EditConcretePatternText.vue";

const routes = [
  {
    path: "/",
    redirect: "/createNewPattern",
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
  {
    path: "/concretePatterns/edit/:concretePatternName",
    name: "EditConcretePatternText",
    component: EditConcretePatternText,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
