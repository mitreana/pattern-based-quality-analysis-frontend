import { createRouter, createWebHistory } from "vue-router";
import CreateNewPattern from "../views/CreateNewPattern.vue";
import ConcretePatterns from "../views/ConcretePatterns.vue";
import EditConcretePatternText from "../views/EditConcretePatternText.vue";
import ApplyPattern from "../views/ApplyPattern.vue";
import RegisterDatabaseForm from "../components/forms/RegisterDatabaseForm.vue"
import ResultContainer from "../components/containers/ResultContainer.vue";

const routes = [
  {
    path: "/",
    redirect: "/createNewPattern",
    component: CreateNewPattern,
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
  {
    path: "/databases",
    name: "ApplyPattern",
    component: ApplyPattern,
  },
  {
    path: "/databases/registerDatabase",
    name: "RegisterDatabaseForm",
    component: RegisterDatabaseForm,
  },
  {
    path: "/results",
    name: "ResultContainer",
    component: ResultContainer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
