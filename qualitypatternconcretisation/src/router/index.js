import { createRouter, createWebHistory } from "vue-router";
import CreateNewPattern from "../views/CreateNewPattern.vue";
import AbstractPatterns from "../views/listviews/AbstractPatterns.vue";
import ConcretePatterns from "../views/listviews/ConcretePatterns.vue";
import FinalizedPatterns from "../views/listviews/FinalizedPatterns.vue";
import EditConcretePatternText from "../views/EditConcretePatternText.vue";
import ApplyPattern from "../views/ApplyPattern.vue";
import Menu from "../views/Menu.vue";
import Databases from "../views/Databases.vue";
import RegisterDatabaseForm from "../components/forms/RegisterDatabaseForm.vue"
import ResultContainer from "../components/containers/ResultContainer.vue";

const routes = [
    {
        path: "/",
        redirect: "/menu",
        component: Menu,
    },
    {
        path: "/menu",
        name: "Menu",
        component: Menu,
    },
    {
        path: "/createNewPattern",
        name: "CreateNewPattern",
        component: CreateNewPattern,
    },
    {
        path: "/abstractPatterns",
        name: "AbstractPatterns",
        component: AbstractPatterns,
    },
    {
        path: "/concretePatterns",
        name: "ConcretePatterns",
        component: ConcretePatterns,
    },
    {
        path: "/finalizedPatterns",
        name: "FinalizedPatterns",
        component: FinalizedPatterns,
    },
    {
        path: "/concretePatterns/edit/:concretePatternName",
        name: "EditConcretePatternText",
        component: EditConcretePatternText,
    },
    {
        path: "/databases",
        name: "Databases",
        component: Databases,
    },
    {
        path: "/databases/add",
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

router.beforeEach((to, from, next) => {
    console.log(to)
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
    next()
});

export default router;