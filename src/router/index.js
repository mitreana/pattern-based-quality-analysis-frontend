import { createRouter, createWebHistory } from "vue-router";
import CreateNewPattern from "../views/CreateNewPattern.vue";
import ConcretePatterns from "../views/ConcretePatterns.vue";
import EditConcretePatternText from "../views/EditConcretePatternText.vue";
import RunTest from "../views/RunTest.vue"
import RegisterDatabaseForm from "../components/forms/RegisterDatabaseForm.vue"
import TestResultContainer from "../components/containers/TestResultContainer.vue";

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
  {
    path: "/databases",
    name: "RunTest",
    component: RunTest,
  },
  {
    path: "/databases/registerDatabase",
    name: "RegisterDatabaseForm",
    component: RegisterDatabaseForm,
  },
  {
    path: "/results",
    name: "TestResultContainer",
    component: TestResultContainer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
