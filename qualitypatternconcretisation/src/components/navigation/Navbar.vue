<template>
    <el-menu :default-active="currentRouteName" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#33CCFF">
        <el-menu-item index="/menu" @click="navigateTo('/menu')">Menu</el-menu-item>
        <el-menu-item index="/abstractPatterns" @click="navigateTo('/abstractPatterns')">Abstract Patterns</el-menu-item>
        <el-menu-item index="/concretePatterns" @click="navigateTo('/concretePatterns')">Concrete Patterns</el-menu-item>
        <el-menu-item index="/finalizedPatterns" @click="navigateTo('/finalizedPatterns')">Finalized Patterns</el-menu-item>
        <el-menu-item index="/createNewPattern" @click="navigateTo('/createNewPattern')">Add Pattern</el-menu-item>
        <el-menu-item index="/databases" @click="navigateTo('/databases')"> Databases</el-menu-item>
        <el-menu-item index="/databases/add" @click="navigateTo('/databases/add')">Add Database</el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                currentRouteName: window.location.pathname
                    ? window.location.pathname
                    : "",
            };
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
    #router {
        text-align: center;
        margin-right: 40px;
    }
</style>
