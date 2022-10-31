<template>
    <div class="createNewPattern">
        <div>
            <h3 ref="title">Main Menu</h3>
        </div>
    </div>

    <div class="textline">
        Abstract Patterns define the base structure of the patterns.
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/abstractPatterns" @click="navigateTo('/abstractPatterns')" disabled>Abstract Patterns</el-button>
    </div>

    <div class="textline">
        Concrete Patterns are the user generated instances of the abstract patterns.
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/concretePatterns" @click="navigateTo('/concretePatterns')">Concrete Patterns</el-button>
        <el-button class="buttonstyle" index="/createNewPattern" @click="navigateTo('/createNewPattern')" >Add Pattern</el-button>
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/concretePatterns" @click="navigateTo('/concretePatterns')" disabled>Concrete XML Patterns</el-button>
        <el-button class="buttonstyle" index="/concretePatterns" @click="navigateTo('/concretePatterns')" disabled>Concrete RDF Patterns</el-button>
    </div>

    <div class="textline">
        When a concrete Pattern is fully parameterized and can be applied to a database, it is a finalized pattern.
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/finalizedPatterns" @click="navigateTo('/finalizedPatterns')">Finalized Patterns</el-button>
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/finalizedPatterns" @click="navigateTo('/finalizedPatterns')" disabled>Finalized XML Patterns</el-button>
        <el-button class="buttonstyle" index="/finalizedPatterns" @click="navigateTo('/finalizedPatterns')" disabled>Finalized RDF Patterns</el-button>
    </div>

    <div class="textline">
        Text
    </div>
    <div class="buttonline">
        <el-button class="buttonstyle" index="/databases" @click="navigateTo('/databases')">XML Databases</el-button>
        <el-button class="buttonstyle" index="/databases/add" @click="navigateTo('/databases/add')">Add XML Database</el-button>
    </div>
    <!--<div class="buttonline">
        <el-button class="buttonstyle" index="/databases" @click="navigateTo('/databases')">RDF Databases</el-button>
        <el-button class="buttonstyle" index="/databases/add" @click="navigateTo('/databases/add')">Add RDF Database</el-button>
    </div>-->
</template>

<script>
    import Navbar from "../components/navigation/Navbar.vue";
    import { mapState, mapActions } from "vuex";

    export default {
        name: "Menu",
        components: {
            Navbar,
        },
        methods: {
            navigateTo(route) {

                this.currentRouteName = route;
                this.$router.push(route);
            },
        },
    };
</script>

<style>
    .title {
        padding-left: 3%;
        margin-top: 0px;
    }
    .textline {
        padding-block-start: 30pt;
        text-align: left;
        text-indent: 0pt;
        padding-left: 20pt;
    }
    .buttonline {
        text-align: left;
        text-indent: 7pt;
        padding-left: 40pt;
    }
    .buttonstyle {
        width: 250px;
        margin: 5px;
        left: 40pt;
    }
</style>